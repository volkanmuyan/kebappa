'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { MenuItem, OptionGroup } from '@/data/menu';
import { useCart } from '@/store/cart';

type Lang = 'fr' | 'nl' | 'en';

interface Props {
  item: MenuItem;
  lang: Lang;
  onClose: () => void;
}

export default function ProductModal({ item, lang, onClose }: Props) {
  const t = useTranslations();
  const { add } = useCart();
  const [selected, setSelected] = useState<Record<string, string[]>>({});

  const toggleOption = (group: OptionGroup, optionId: string) => {
    setSelected((prev) => {
      const current = prev[group.id] || [];
      if (group.multiple) {
        return {
          ...prev,
          [group.id]: current.includes(optionId)
            ? current.filter((id) => id !== optionId)
            : [...current, optionId],
        };
      } else {
        return { ...prev, [group.id]: current[0] === optionId ? [] : [optionId] };
      }
    });
  };

  const extraCents = (item.options || []).reduce((sum, group) => {
    const sel = selected[group.id] || [];
    return sum + group.items
      .filter((opt) => sel.includes(opt.id))
      .reduce((s, opt) => s + opt.priceCents, 0);
  }, 0);

  const totalCents = item.priceCents + extraCents;

  const handleAdd = () => {
    const selectedOptions = Object.entries(selected).flatMap(([groupId, optIds]) =>
      optIds.map((optionId) => ({ groupId, optionId }))
    );
    add(item.id, selectedOptions, extraCents);
    onClose();
  };

  const formatPrice = (cents: number) => `€${(cents / 100).toFixed(2).replace('.', ',')}`;

  return (
    <>
      <div className="fixed inset-0 bg-black/70 z-50" onClick={onClose} />
      <div className="fixed inset-0 z-[51] flex items-end md:items-center justify-center p-0 md:p-4 pointer-events-none">
        <div className="bg-[#141517] w-full max-w-lg rounded-t-2xl md:rounded-2xl max-h-[90vh] flex flex-col overflow-hidden border border-[#26282b] pointer-events-auto">
          {/* Image */}
          {item.image && (
            <div className="relative h-48 w-full flex-shrink-0">
              <Image src={item.image} alt={item.name[lang]} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141517] to-transparent" />
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            <div>
              <h2 className="text-xl font-bold text-[#f5f5f5]">{item.name[lang]}</h2>
              {item.description && <p className="text-gray-400 text-sm mt-1">{item.description[lang]}</p>}
              <p className="text-[#EC6603] font-bold text-lg mt-1">{formatPrice(item.priceCents)}</p>
            </div>

            {(item.options || []).map((group) => (
              <div key={group.id}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-[#f5f5f5]">{group.title[lang]}</h3>
                  {!group.required && <span className="text-xs text-gray-500">{t('optional')}</span>}
                </div>
                <div className="space-y-2">
                  {group.items.map((opt) => {
                    const isSelected = (selected[group.id] || []).includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        onClick={() => toggleOption(group, opt.id)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border transition-colors text-left ${
                          isSelected
                            ? 'border-[#EC6603] bg-[#EC6603]/10'
                            : 'border-[#26282b] hover:border-[#EC6603]/50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-${group.multiple ? 'sm' : 'full'} border-2 flex items-center justify-center flex-shrink-0 ${
                            isSelected ? 'border-[#EC6603] bg-[#EC6603]' : 'border-gray-600'
                          }`}>
                            {isSelected && <div className="w-2 h-2 bg-white rounded-sm" />}
                          </div>
                          <span className="text-sm text-[#f5f5f5]">{opt.name[lang]}</span>
                        </div>
                        {opt.priceCents > 0 && (
                          <span className="text-sm text-[#EC6603] font-medium">+{formatPrice(opt.priceCents)}</span>
                        )}
                        {opt.priceCents === 0 && (
                          <span className="text-xs text-gray-500">{t('free')}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-[#26282b] flex items-center gap-3">
            <button onClick={onClose} className="px-4 py-3 rounded-lg border border-[#26282b] text-gray-400 hover:text-white text-sm font-medium transition-colors">
              {t('cancel')}
            </button>
            <button onClick={handleAdd} className="flex-1 bg-[#EC6603] hover:bg-[#C9550A] text-white font-bold py-3 rounded-lg transition-colors text-sm flex items-center justify-center gap-2">
              <span>{t('addToCart')}</span>
              <span className="bg-[#C9550A] px-2 py-0.5 rounded text-xs">{formatPrice(totalCents)}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
