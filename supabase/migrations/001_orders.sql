-- Enable UUID generation
create extension if not exists "pgcrypto";

-- Order status enum
create type order_status as enum (
  'pending',
  'paid',
  'preparing',
  'ready',
  'completed',
  'cancelled'
);

-- Fulfillment type enum
create type fulfillment_type as enum ('delivery', 'pickup');

-- Orders table
create table orders (
  id                   uuid primary key default gen_random_uuid(),
  stripe_session_id    text unique,
  stripe_payment_intent text,
  status               order_status not null default 'pending',
  fulfillment          fulfillment_type not null,
  customer_name        text not null,
  customer_email       text not null,
  customer_phone       text not null,
  address_json         jsonb,
  subtotal_cents       integer not null,
  delivery_fee_cents   integer not null default 0,
  total_cents          integer not null,
  currency             text not null default 'eur',
  created_at           timestamptz not null default now()
);

-- Order items table
create table order_items (
  id              uuid primary key default gen_random_uuid(),
  order_id        uuid not null references orders(id) on delete cascade,
  menu_item_id    text not null,
  name            text not null,
  unit_price_cents integer not null,
  qty             integer not null
);

-- Indexes
create index orders_status_idx on orders(status);
create index orders_created_at_idx on orders(created_at desc);
create index order_items_order_id_idx on order_items(order_id);

-- RLS: enabled, no public access
alter table orders enable row level security;
alter table order_items enable row level security;

-- Service role bypasses RLS automatically; no policies needed for public
