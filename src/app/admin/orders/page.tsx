import { getServerClient } from '@/lib/supabase-server';
import OrdersClient from '@/components/admin/OrdersClient';

export const dynamic = 'force-dynamic';

export type Order = {
  id: string;
  status: 'paid' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  fulfillment: 'delivery' | 'pickup';
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  address_json: { street: string; number: string; zip: string; city: string } | null;
  subtotal_cents: number;
  delivery_fee_cents: number;
  total_cents: number;
  stripe_payment_intent: string | null;
  stripe_session_id: string | null;
  created_at: string;
  order_items: { id: string; menu_item_id: string; name: string; unit_price_cents: number; qty: number }[];
};

export default async function AdminOrdersPage() {
  const supabase = await getServerClient();

  const { data: orders } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .in('status', ['paid', 'preparing', 'ready', 'completed', 'cancelled'])
    .order('created_at', { ascending: false })
    .limit(100);

  return (
    <div className="min-h-screen bg-[#060709]">
      <header className="bg-[#141517] border-b border-[#26282b] px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div>
          <span className="text-xl font-black tracking-widest">KEBAPPA</span>
          <span className="ml-3 text-[#EC6603] text-sm font-bold uppercase tracking-widest">Admin</span>
        </div>
        <LogoutButton />
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Commandes</h1>
        <OrdersClient initialOrders={(orders as Order[]) || []} />
      </main>
    </div>
  );
}

function LogoutButton() {
  return <LogoutButtonClient />;
}

import LogoutButtonClient from '@/components/admin/LogoutButton';
