'use client';
import { useState } from 'react';
import Image from 'next/image';
import { MenuItem } from '@/data/menu';
import { useCart } from '@/store/cart';
import { useTranslations } from 'next-intl';
import ProductModal from './ProductModal';

type Lang = 'fr' | 'nl' | 'en';

export default function ProductCard({ item, lang }: { item: MenuItem; lang: Lang }) {
  const t = useTranslations();
  const { add } = useCart();
  const [showModal, setShowModal] = useState(false);

  const formatPrice = (cents: number) => `€${(cents / 100).toFixed(2).replace('.', ',')}`;

  const handleAdd = () => {
    if (item.options && item.options.length > 0) {
      setShowModal(true);
    } else {
      add(item.id);
    }
  };

  return (
    <>
      <div className="bg-[#141517] border border-[#26282b] rounded-xl overflow-hidden flex flex-col hover:border-[#EC6603]/30 transition-colors">
        {item.image && (
          <div className="relative h-44 w-full flex-shrink-0">
            <Image src={item.image} alt={item.name[lang]} fill className="object-cover" />
          </div>
        )}
        <div className="p-4 flex flex-col gap-3 flex-1">
          <div className="flex-1">
            <div className="font-bold text-[#f5f5f5] text-base leading-tight">{item.name[lang]}</div>
            {item.description && (
              <div className="text-gray-400 text-sm mt-1">{item.description[lang]}</div>
            )}
            {item.options && item.options.length > 0 && (
              <div className="text-xs text-[#EC6603]/70 mt-1">{t('customizable')}</div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#EC6603] font-bold text-lg">{formatPrice(item.priceCents)}</span>
            <button
              onClick={handleAdd}
              className="bg-[#EC6603] hover:bg-[#C9550A] text-white font-bold px-4 py-2 rounded-lg text-sm transition-colors"
            >
              {t('addToCart')}
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <ProductModal item={item} lang={lang} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
