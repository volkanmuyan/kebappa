'use client';
import { Category } from '@/data/menu';
import ProductCard from './ProductCard';

type Lang = 'fr' | 'nl' | 'en';

export default function MenuSection({ category, lang }: { category: Category; lang: Lang }) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-[#f5f5f5] border-b border-[#26282b] pb-2">
        {category.title[lang]}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {category.items.map((item) => (
          <ProductCard key={item.id} item={item} lang={lang} />
        ))}
      </div>
    </section>
  );
}
