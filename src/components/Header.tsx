'use client';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useCart } from '@/store/cart';
import CartDrawer from './CartDrawer';

const LANGS = ['fr', 'nl', 'en'] as const;

export default function Header({ lang }: { lang: string }) {
  const t = useTranslations();
  const router = useRouter();
  const { items, openCart } = useCart();
  const totalQty = items.reduce((sum, i) => sum + i.qty, 0);

  const changeLocale = (newLang: string) => {
    router.push(`/${newLang}`);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#060709] border-b border-[#26282b] px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <div className="text-xl font-bold text-[#f5f5f5] tracking-widest">KEBAPPA</div>
            <div className="text-xs text-gray-500 uppercase tracking-[0.2em]">{t('slogan')}</div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-1">
              {LANGS.map((l) => (
                <button
                  key={l}
                  onClick={() => changeLocale(l)}
                  className={`px-2 py-1 text-xs font-bold rounded uppercase ${
                    lang === l
                      ? 'bg-[#EC6603] text-white'
                      : 'text-gray-400 hover:text-[#f5f5f5]'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            <button
              onClick={openCart}
              className="relative p-2 text-[#f5f5f5] hover:text-[#EC6603] transition-colors"
              aria-label={t('cart')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {totalQty > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#EC6603] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totalQty}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
      <CartDrawer lang={lang} />
    </>
  );
}
