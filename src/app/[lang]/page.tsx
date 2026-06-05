import { categories } from '@/data/menu';
import MenuSection from '@/components/MenuSection';

export default async function MenuPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return (
    <div className="space-y-12">
      {categories.map((cat) => (
        <MenuSection key={cat.id} category={cat} lang={lang as 'fr' | 'nl' | 'en'} />
      ))}
    </div>
  );
}
