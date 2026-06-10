import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getStripe } from '@/lib/stripe';
import { getServiceClient } from '@/lib/supabase-service';

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const sig = req.headers.get('stripe-signature');

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET not set');
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(rawBody, sig!, webhookSecret);
  } catch (err) {
    console.error('Stripe signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const db = getServiceClient();

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.order_id;
      if (!orderId) { console.error('No order_id in metadata'); return NextResponse.json({ ok: true }); }

      // Idempotency: skip if already paid
      const { data: existing } = await db
        .from('orders')
        .select('status')
        .eq('id', orderId)
        .single();

      if (existing && existing.status !== 'pending') {
        return NextResponse.json({ ok: true });
      }

      await db
        .from('orders')
        .update({
          status: 'paid',
          stripe_payment_intent: session.payment_intent as string | null,
        })
        .eq('id', orderId);

    } else if (event.type === 'checkout.session.expired') {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.order_id;
      if (!orderId) return NextResponse.json({ ok: true });

      const { data: existing } = await db
        .from('orders')
        .select('status')
        .eq('id', orderId)
        .single();

      // Only cancel if still pending
      if (existing?.status === 'pending') {
        await db
          .from('orders')
          .update({ status: 'cancelled' })
          .eq('id', orderId);
      }
    }
  } catch (err) {
    console.error(`Webhook handler error for ${event.type}:`, err);
    // Always 200 outside of signature errors
  }

  return NextResponse.json({ ok: true });
}
