'use client';
import { useTranslations } from 'next-intl';
import { useCart } from '@/store/cart';
import { allItems } from '@/data/menu';
import { useState } from 'react';

const DELIVERY_FEE = 250;
const MIN_ORDER = 1000;

type Lang = 'fr' | 'nl' | 'en';

export default function CartDrawer({ lang }: { lang: string }) {
  const t = useTranslations();
  const {
    items, mode, address, customer, isOpen,
    closeCart, setMode, setAddress, setCustomer,
    increment, decrement, remove,
  } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const langKey = lang as Lang;

  const subtotal = items.reduce((sum, ci) => {
    const item = allItems.find((i) => i.id === ci.id);
    return sum + ((item?.priceCents ?? 0) + (ci.extraCents ?? 0)) * ci.qty;
  }, 0);

  const total = subtotal + (mode === 'delivery' ? DELIVERY_FEE : 0);
  const belowMin = subtotal < MIN_ORDER;

  const deliveryIncomplete =
    mode === 'delivery' &&
    (!address.street.trim() || !address.number.trim() || !address.zip.trim() || !address.city.trim());

  const customerIncomplete =
    !customer.name.trim() || !customer.email.trim() || !customer.phone.trim();

  const canCheckout = !belowMin && !deliveryIncomplete && !customerIncomplete;

  const formatPrice = (cents: number) => `€${(cents / 100).toFixed(2).replace('.', ',')}`;

  const resolveOptionName = (itemId: string, groupId: string, optionId: string): string => {
    const menuItem = allItems.find((i) => i.id === itemId);
    if (!menuItem?.options) return optionId;
    const group = menuItem.options.find((g) => g.id === groupId);
    if (!group) return optionId;
    const opt = group.items.find((o) => o.id === optionId);
    return opt ? opt.name[langKey] : optionId;
  };

  const handleCheckout = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({ id: i.id, qty: i.qty, extraCents: i.extraCents })),
          mode,
          address: mode === 'delivery' ? address : undefined,
          customer,
          lang,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Error'); setLoading(false); return; }
      window.location.href = data.url;
    } catch {
      setError('Network error');
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-40" onClick={closeCart} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-[#141517] z-50 flex flex-col shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-[#26282b]">
          <h2 className="text-lg font-bold">{t('cart')}</h2>
          <button onClick={closeCart} className="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <p className="text-gray-500 text-center py-8">{t('emptyCart')}</p>
          ) : (
            items.map((ci, idx) => {
              const item = allItems.find((i) => i.id === ci.id);
              if (!item) return null;
              const unitPrice = item.priceCents + (ci.extraCents ?? 0);
              return (
                <div key={idx} className="flex items-start gap-3 bg-[#060709] rounded-lg p-3">
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{item.name[langKey]}</div>
                    {ci.selectedOptions && ci.selectedOptions.length > 0 && (
                      <div className="text-gray-500 text-xs mt-0.5 leading-relaxed">
                        {ci.selectedOptions.map((opt) =>
                          resolveOptionName(ci.id, opt.groupId, opt.optionId)
                        ).join(', ')}
                      </div>
                    )}
                    <div className="text-[#EC6603] text-sm font-bold mt-1">{formatPrice(unitPrice)}</div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button onClick={() => decrement(ci.id, idx)} className="w-7 h-7 rounded bg-[#26282b] flex items-center justify-center font-bold hover:bg-[#EC6603] transition-colors">−</button>
                    <span className="w-5 text-center font-bold">{ci.qty}</span>
                    <button onClick={() => increment(ci.id, idx)} className="w-7 h-7 rounded bg-[#26282b] flex items-center justify-center font-bold hover:bg-[#EC6603] transition-colors">+</button>
                    <button onClick={() => remove(ci.id, idx)} className="w-7 h-7 rounded bg-[#26282b] flex items-center justify-center text-gray-400 hover:text-red-400 transition-colors ml-1">&times;</button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t border-[#26282b] space-y-4">
            {/* Mode */}
            <div className="flex gap-3">
              {(['delivery', 'pickup'] as const).map((m) => (
                <label key={m} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" checked={mode === m} onChange={() => setMode(m)} className="accent-[#EC6603]" />
                  <span className="text-sm font-medium">{t(m)}</span>
                </label>
              ))}
            </div>

            {/* Delivery address */}
            {mode === 'delivery' && (
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-300">{t('deliveryAddress')}</div>
                <div className="grid grid-cols-3 gap-2">
                  <input placeholder={t('street')} value={address.street} onChange={(e) => setAddress({ street: e.target.value })}
                    className="col-span-2 bg-[#060709] border border-[#26282b] rounded px-2 py-1.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#EC6603]" />
                  <input placeholder={t('number')} value={address.number} onChange={(e) => setAddress({ number: e.target.value })}
                    className="bg-[#060709] border border-[#26282b] rounded px-2 py-1.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#EC6603]" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input placeholder={t('zip')} value={address.zip} onChange={(e) => setAddress({ zip: e.target.value })}
                    className="bg-[#060709] border border-[#26282b] rounded px-2 py-1.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#EC6603]" />
                  <input placeholder={t('city')} value={address.city} onChange={(e) => setAddress({ city: e.target.value })}
                    className="bg-[#060709] border border-[#26282b] rounded px-2 py-1.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#EC6603]" />
                </div>
              </div>
            )}

            {/* Customer info */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-300">{t('yourDetails')}</div>
              <input
                placeholder={t('customerName')}
                value={customer.name}
                onChange={(e) => setCustomer({ name: e.target.value })}
                className="w-full bg-[#060709] border border-[#26282b] rounded px-2 py-1.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#EC6603]"
              />
              <input
                type="email"
                placeholder={t('customerEmail')}
                value={customer.email}
                onChange={(e) => setCustomer({ email: e.target.value })}
                className="w-full bg-[#060709] border border-[#26282b] rounded px-2 py-1.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#EC6603]"
              />
              <input
                type="tel"
                placeholder={t('customerPhone')}
                value={customer.phone}
                onChange={(e) => setCustomer({ phone: e.target.value })}
                className="w-full bg-[#060709] border border-[#26282b] rounded px-2 py-1.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#EC6603]"
              />
            </div>

            {/* Totals */}
            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>{t('subtotal')}</span><span>{formatPrice(subtotal)}</span>
              </div>
              {mode === 'delivery' && (
                <div className="flex justify-between text-gray-400">
                  <span>{t('deliveryFee')}</span><span>{formatPrice(DELIVERY_FEE)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-[#f5f5f5] text-base pt-1 border-t border-[#26282b]">
                <span>{t('total')}</span><span className="text-[#EC6603]">{formatPrice(total)}</span>
              </div>
            </div>

            {belowMin && <p className="text-red-400 text-xs font-medium">{t('minOrderWarning')}</p>}
            {error && <p className="text-red-400 text-xs">{error}</p>}

            <button
              onClick={handleCheckout}
              disabled={!canCheckout || loading}
              className="w-full bg-[#EC6603] hover:bg-[#C9550A] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-colors"
            >
              {loading ? '...' : t('placeOrder')}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
