import { categories } from '@/data/menu';
import MenuSection from '@/components/MenuSection';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

export default async function MenuPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return (
    <>
      <Hero lang={lang} />
      <div id="menu" className="max-w-6xl mx-auto px-4 py-8 space-y-12">
        {categories.map((cat) => (
          <MenuSection key={cat.id} category={cat} lang={lang as 'fr' | 'nl' | 'en'} />
        ))}
      </div>
      <Footer lang={lang} />
    </>
  );
}
