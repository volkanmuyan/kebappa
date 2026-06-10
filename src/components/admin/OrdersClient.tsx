'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { getBrowserClient } from '@/lib/supabase-browser';
import type { Order } from '@/app/admin/orders/page';

const STATUS_LABELS: Record<Order['status'], string> = {
  paid: 'Payé',
  preparing: 'En préparation',
  ready: 'Prêt',
  completed: 'Terminé',
  cancelled: 'Annulé',
};

const STATUS_COLORS: Record<Order['status'], string> = {
  paid: 'bg-[#EC6603] text-white',
  preparing: 'bg-yellow-500 text-black',
  ready: 'bg-green-500 text-black',
  completed: 'bg-gray-600 text-gray-200',
  cancelled: 'bg-red-600 text-white',
};

const NEXT_STATUS: Partial<Record<Order['status'], Order['status']>> = {
  paid: 'preparing',
  preparing: 'ready',
  ready: 'completed',
};

const NEXT_STATUS_LABELS: Partial<Record<Order['status'], string>> = {
  paid: '→ En préparation',
  preparing: '→ Prêt',
  ready: '→ Terminé',
};

function formatPrice(cents: number) {
  return `€${(cents / 100).toFixed(2).replace('.', ',')}`;
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleString('fr-BE', {
    day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit',
  });
}

function beep() {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.4);
  } catch {}
}

export default function OrdersClient({ initialOrders }: { initialOrders: Order[] }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [newIds, setNewIds] = useState<Set<string>>(new Set());
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const knownIds = useRef<Set<string>>(new Set(initialOrders.map((o) => o.id)));

  const fetchOrders = useCallback(async () => {
    const supabase = getBrowserClient();
    const { data } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .in('status', ['paid', 'preparing', 'ready', 'completed', 'cancelled'])
      .order('created_at', { ascending: false })
      .limit(100);
    if (data) {
      const fresh = data as Order[];
      const freshNew = fresh.filter((o) => !knownIds.current.has(o.id) && o.status === 'paid');
      if (freshNew.length > 0) {
        beep();
        const newSet = new Set(freshNew.map((o) => o.id));
        setNewIds((prev) => new Set([...prev, ...newSet]));
        freshNew.forEach((o) => knownIds.current.add(o.id));
        setTimeout(() => setNewIds((prev) => { const s = new Set(prev); newSet.forEach((id) => s.delete(id)); return s; }), 2000);
      }
      fresh.forEach((o) => knownIds.current.add(o.id));
      setOrders(fresh);
    }
  }, []);

  useEffect(() => {
    const supabase = getBrowserClient();
    let realtimeOk = false;

    const channel = supabase
      .channel('orders-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
        fetchOrders();
      })
      .subscribe((status) => {
        realtimeOk = status === 'SUBSCRIBED';
        if (realtimeOk && pollRef.current) {
          clearInterval(pollRef.current);
          pollRef.current = null;
        }
        if (!realtimeOk) {
          if (!pollRef.current) {
            pollRef.current = setInterval(fetchOrders, 15000);
          }
        }
      });

    // Start polling as fallback; realtime will cancel it once connected
    pollRef.current = setInterval(fetchOrders, 15000);

    return () => {
      supabase.removeChannel(channel);
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [fetchOrders]);

  const updateStatus = async (orderId: string, newStatus: Order['status']) => {
    setUpdatingId(orderId);
    const supabase = getBrowserClient();
    await supabase.from('orders').update({ status: newStatus }).eq('id', orderId);
    await fetchOrders();
    setUpdatingId(null);
  };

  const cancelOrder = async (orderId: string) => {
    if (!confirm('Annuler cette commande ?')) return;
    await updateStatus(orderId, 'cancelled');
  };

  const selected = orders.find((o) => o.id === selectedId) ?? null;

  return (
    <div className="flex gap-4 h-[calc(100vh-140px)]">
      {/* Order list */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {orders.length === 0 && (
          <p className="text-gray-500 text-center py-16">Aucune commande</p>
        )}
        {orders.map((order) => (
          <button
            key={order.id}
            onClick={() => setSelectedId(order.id === selectedId ? null : order.id)}
            className={`w-full text-left rounded-xl border p-4 transition-all ${
              newIds.has(order.id) ? 'animate-pulse border-[#EC6603] bg-[#EC6603]/10' :
              selectedId === order.id ? 'border-[#EC6603] bg-[#141517]' : 'border-[#26282b] bg-[#141517] hover:border-[#EC6603]/40'
            }`}
          >
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3 flex-wrap">
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${STATUS_COLORS[order.status]}`}>
                  {STATUS_LABELS[order.status]}
                </span>
                <span className="text-sm font-bold text-[#f5f5f5]">{order.customer_name}</span>
                <span className="text-xs text-gray-400">
                  {order.fulfillment === 'delivery' ? '🛵 Livraison' : '🏠 À emporter'}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="font-bold text-[#EC6603]">{formatPrice(order.total_cents)}</span>
                <span className="text-gray-500 text-xs">{formatTime(order.created_at)}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Detail panel */}
      {selected && (
        <div className="w-96 flex-shrink-0 bg-[#141517] border border-[#26282b] rounded-xl overflow-y-auto p-5 space-y-5">
          <div className="flex items-center justify-between">
            <span className={`px-3 py-1 rounded-full text-sm font-bold ${STATUS_COLORS[selected.status]}`}>
              {STATUS_LABELS[selected.status]}
            </span>
            <button onClick={() => setSelectedId(null)} className="text-gray-500 hover:text-white text-xl leading-none">&times;</button>
          </div>

          {/* Items */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Articles</h3>
            <div className="space-y-1">
              {selected.order_items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-[#f5f5f5]">{item.qty}× {item.name}</span>
                  <span className="text-gray-400">{formatPrice(item.unit_price_cents * item.qty)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#26282b] mt-3 pt-3 space-y-1 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Sous-total</span><span>{formatPrice(selected.subtotal_cents)}</span>
              </div>
              {selected.delivery_fee_cents > 0 && (
                <div className="flex justify-between text-gray-400">
                  <span>Livraison</span><span>{formatPrice(selected.delivery_fee_cents)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-[#f5f5f5]">
                <span>Total</span><span className="text-[#EC6603]">{formatPrice(selected.total_cents)}</span>
              </div>
            </div>
          </div>

          {/* Customer */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Client</h3>
            <div className="space-y-1 text-sm">
              <div className="text-[#f5f5f5]">{selected.customer_name}</div>
              <a href={`mailto:${selected.customer_email}`} className="text-[#EC6603] hover:underline block">{selected.customer_email}</a>
              <a href={`tel:${selected.customer_phone}`} className="text-[#EC6603] hover:underline block">{selected.customer_phone}</a>
            </div>
          </div>

          {/* Address */}
          {selected.address_json && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Adresse</h3>
              <div className="text-sm text-[#f5f5f5] space-y-0.5">
                <div>{selected.address_json.street} {selected.address_json.number}</div>
                <div>{selected.address_json.zip} {selected.address_json.city}</div>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(
                    `${selected.address_json.street} ${selected.address_json.number}, ${selected.address_json.zip} ${selected.address_json.city}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#EC6603] hover:underline text-xs"
                >
                  → Google Maps
                </a>
              </div>
            </div>
          )}

          {/* Stripe */}
          {selected.stripe_payment_intent && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Paiement</h3>
              <a
                href={`https://dashboard.stripe.com/test/payments/${selected.stripe_payment_intent}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#EC6603] hover:underline text-xs break-all"
              >
                {selected.stripe_payment_intent}
              </a>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-2 pt-2">
            {NEXT_STATUS[selected.status] && (
              <button
                onClick={() => updateStatus(selected.id, NEXT_STATUS[selected.status]!)}
                disabled={updatingId === selected.id}
                className="w-full bg-[#EC6603] hover:bg-[#C9550A] disabled:opacity-50 text-white font-bold py-4 rounded-xl text-base transition-colors"
              >
                {updatingId === selected.id ? '...' : NEXT_STATUS_LABELS[selected.status]}
              </button>
            )}
            {selected.status !== 'cancelled' && selected.status !== 'completed' && (
              <button
                onClick={() => cancelOrder(selected.id)}
                disabled={updatingId === selected.id}
                className="w-full border border-red-600 text-red-500 hover:bg-red-600 hover:text-white font-bold py-4 rounded-xl text-base transition-colors"
              >
                Annuler
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
