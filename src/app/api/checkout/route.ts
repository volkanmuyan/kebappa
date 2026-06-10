import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { getServiceClient } from '@/lib/supabase-service';
import { itemById, allItems } from '@/data/menu';

const DELIVERY_FEE = 250;
const MIN_ORDER = 1000;

type ReqBody = {
  items: { id: string; qty: number; extraCents?: number }[];
  mode: 'delivery' | 'pickup';
  address?: { street: string; number: string; zip: string; city: string };
  customer: { name: string; email: string; phone: string };
  lang?: string;
};

export async function POST(req: NextRequest) {
  const body: ReqBody = await req.json();
  const { items, mode, address, customer, lang } = body;

  if (!items || !Array.isArray(items) || items.length === 0)
    return NextResponse.json({ error: 'No items' }, { status: 400 });

  if (!customer?.name?.trim() || !customer?.email?.trim() || !customer?.phone?.trim())
    return NextResponse.json({ error: 'Customer info required' }, { status: 400 });

  if (mode === 'delivery' && (!address?.street || !address?.number || !address?.zip || !address?.city))
    return NextResponse.json({ error: 'Delivery address required' }, { status: 400 });

  // Validate items and compute totals server-side
  type LineItem = { price_data: { currency: string; unit_amount: number; product_data: { name: string } }; quantity: number };
  const lineItems: LineItem[] = [];
  let subtotal = 0;

  const orderItemsPayload: { menu_item_id: string; name: string; unit_price_cents: number; qty: number }[] = [];

  for (const { id, qty, extraCents } of items) {
    const item = itemById(id);
    if (!item || qty < 1)
      return NextResponse.json({ error: `Unknown item: ${id}` }, { status: 400 });
    const unitAmount = item.priceCents + (extraCents || 0);
    subtotal += unitAmount * qty;
    lineItems.push({
      price_data: {
        currency: 'eur',
        unit_amount: unitAmount,
        product_data: { name: item.name['fr'] },
      },
      quantity: qty,
    });
    orderItemsPayload.push({ menu_item_id: id, name: item.name['fr'], unit_price_cents: unitAmount, qty });
  }

  if (subtotal < MIN_ORDER)
    return NextResponse.json({ error: 'Minimum order is €10' }, { status: 400 });

  const deliveryFeeCents = mode === 'delivery' ? DELIVERY_FEE : 0;
  const totalCents = subtotal + deliveryFeeCents;

  if (mode === 'delivery') {
    lineItems.push({
      price_data: {
        currency: 'eur',
        unit_amount: DELIVERY_FEE,
        product_data: { name: 'Livraison / Delivery' },
      },
      quantity: 1,
    });
  }

  // Write pending order to DB
  const db = getServiceClient();
  const { data: order, error: orderErr } = await db
    .from('orders')
    .insert({
      status: 'pending',
      fulfillment: mode,
      customer_name: customer.name.trim(),
      customer_email: customer.email.trim(),
      customer_phone: customer.phone.trim(),
      address_json: mode === 'delivery' ? address : null,
      subtotal_cents: subtotal,
      delivery_fee_cents: deliveryFeeCents,
      total_cents: totalCents,
      currency: 'eur',
    })
    .select('id')
    .single();

  if (orderErr || !order) {
    console.error('DB order insert error:', orderErr);
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }

  // Write order items
  const { error: itemsErr } = await db
    .from('order_items')
    .insert(orderItemsPayload.map((i) => ({ ...i, order_id: order.id })));

  if (itemsErr) {
    console.error('DB order_items insert error:', itemsErr);
    // Don't block checkout for item insert failure — order is already created
  }

  const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const locale = lang || 'fr';

  const stripe = getStripe();
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: lineItems,
    locale: locale === 'nl' ? 'nl' : locale === 'en' ? 'en' : 'fr',
    customer_email: customer.email.trim(),
    success_url: `${base}/${locale}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${base}/${locale}/cancel`,
    metadata: {
      order_id: order.id,
      fulfillment: mode,
    },
  });

  // Store stripe session id on order
  await db
    .from('orders')
    .update({ stripe_session_id: session.id })
    .eq('id', order.id);

  return NextResponse.json({ url: session.url });
}
