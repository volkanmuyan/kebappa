# KEBAPPA — Real German Kebabs

Restaurant ordering app for KEBAPPA Bruxelles. Built with Next.js, TypeScript, Tailwind, Zustand, Stripe, next-intl.

## Setup

1. Copy `.env.example` to `.env.local` and fill in your Stripe keys:
   - `STRIPE_SECRET_KEY`: your Stripe secret key (sk_test_...)
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: your publishable key (pk_test_...)
   - `NEXT_PUBLIC_BASE_URL`: your app URL (e.g. http://localhost:3000)

2. Install deps: `npm install`
3. Run: `npm run dev`

## Stripe test card

Use card number `4242 4242 4242 4242`, any future expiry date, any 3-digit CVC.

## Language URLs

- French (default): http://localhost:3000/fr
- Dutch: http://localhost:3000/nl
- English: http://localhost:3000/en
