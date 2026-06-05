import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { itemById } from '@/data/menu';

const DELIVERY_FEE = 250;
const MIN_ORDER = 1000;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { items, mode, address, lang } = body as {
    items: { id: string; qty: number; extraCents?: number }[];
    mode: 'delivery' | 'pickup';
    address?: { street: string; number: string; zip: string; city: string };
    lang?: string;
  };

  if (!items || !Array.isArray(items) || items.length === 0)
    return NextResponse.json({ error: 'No items' }, { status: 400 });

  const lineItems: {
    price_data: {
      currency: string;
      unit_amount: number;
      product_data: { name: string };
    };
    quantity: number;
  }[] = [];
  let subtotal = 0;

  for (const { id, qty, extraCents } of items) {
    const item = itemById(id);
    if (!item || qty < 1) return NextResponse.json({ error: `Unknown item: ${id}` }, { status: 400 });
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
  }

  if (subtotal < MIN_ORDER)
    return NextResponse.json({ error: 'Minimum order is €10' }, { status: 400 });

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

  const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const locale = lang || 'fr';

  const stripe = getStripe();
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: lineItems,
    locale: locale === 'nl' ? 'nl' : locale === 'en' ? 'en' : 'fr',
    success_url: `${base}/${locale}/success`,
    cancel_url: `${base}/${locale}/cancel`,
    metadata: {
      orderMode: mode,
      address: address ? JSON.stringify(address) : '',
    },
  });

  return NextResponse.json({ url: session.url });
}
