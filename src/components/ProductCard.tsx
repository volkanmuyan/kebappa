'use client';
import { MenuItem } from '@/data/menu';
import { useCart } from '@/store/cart';
import { useTranslations } from 'next-intl';

type Lang = 'fr' | 'nl' | 'en';

export default function ProductCard({ item, lang }: { item: MenuItem; lang: Lang }) {
  const t = useTranslations();
  const { add } = useCart();

  const formatPrice = (cents: number) =>
    `€${(cents / 100).toFixed(2).replace('.', ',')}`;

  return (
    <div className="bg-[#141517] border border-[#26282b] rounded-xl p-4 flex flex-col gap-3">
      <div className="flex-1">
        <div className="font-bold text-[#f5f5f5] text-lg leading-tight">{item.name[lang]}</div>
        {item.description && (
          <div className="text-gray-400 text-sm mt-1">{item.description[lang]}</div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[#EC6603] font-bold text-lg">{formatPrice(item.priceCents)}</span>
        <button
          onClick={() => add(item.id)}
          className="bg-[#EC6603] hover:bg-[#C9550A] text-white font-bold px-4 py-2 rounded-lg text-sm transition-colors"
        >
          {t('addToCart')}
        </button>
      </div>
    </div>
  );
}
