# KEBAPPA — Real German Kebabs

Restaurant ordering app for KEBAPPA Bruxelles.
Stack: Next.js 16 · TypeScript · Tailwind v4 · next-intl (FR/NL/EN) · Zustand · Stripe Checkout · Supabase.

---

## Setup

### 1. Environment variables

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

| Variable | Description |
|---|---|
| `STRIPE_SECRET_KEY` | `sk_test_...` from Stripe Dashboard → Developers → API keys |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` (see Webhook section below) |
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL from Supabase → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (never expose to client) |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:3000` locally, `https://yourdomain.com` in prod |

### 2. Supabase — database migration

In the Supabase dashboard → SQL Editor, run the migration:

```sql
-- Copy & paste contents of: supabase/migrations/001_orders.sql
```

Or use the Supabase CLI:

```bash
supabase db push
```

### 3. Supabase — admin user

Create the admin user in Supabase Dashboard → Authentication → Users → Add user.
Use any email + password. That's the credential for `/admin/login`.

### 4. Enable Realtime on the orders table

In Supabase Dashboard → Database → Replication → Tables → enable `orders`.

### 5. Install & run

```bash
npm install
npm run dev
```

---

## Stripe Webhook

### Local testing

Install Stripe CLI, then:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the `whsec_...` secret printed by the CLI and set it as `STRIPE_WEBHOOK_SECRET` in `.env.local`.

### Production (Vercel)

1. Stripe Dashboard → Developers → Webhooks → Add endpoint
2. URL: `https://yourdomain.com/api/webhooks/stripe`
3. Events to listen: `checkout.session.completed`, `checkout.session.expired`
4. Copy the signing secret → set `STRIPE_WEBHOOK_SECRET` in Vercel environment variables

---

## Going live

Replace the TEST keys in your production environment variables with the restaurant's **live** Stripe keys (`sk_live_...` / `pk_live_...`). No code changes needed.

---

## Test card

`4242 4242 4242 4242` · any future expiry · any 3-digit CVC

---

## Language URLs

| Language | URL |
|---|---|
| French (default) | http://localhost:3000/fr |
| Dutch | http://localhost:3000/nl |
| English | http://localhost:3000/en |

---

## Admin panel

`http://localhost:3000/admin` → redirects to `/admin/orders`

- Login with the Supabase Auth user you created
- Orders with status `paid` and above are shown (pending/pre-payment orders are hidden)
- New paid orders trigger a beep notification and a 2-second highlight
- Status flow: **paid → preparing → ready → completed** (plus cancel at any step)
- Realtime via Supabase; falls back to 15s polling if connection drops
