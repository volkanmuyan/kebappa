import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function SuccessPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = await getTranslations();
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center gap-6">
      <div className="text-6xl">🎉</div>
      <h1 className="text-3xl font-bold text-[#EC6603]">{t('orderSuccess')}</h1>
      <Link href={`/${lang}`} className="bg-[#EC6603] hover:bg-[#C9550A] text-white font-bold px-6 py-3 rounded-lg transition-colors">
        {t('backToMenu')}
      </Link>
    </div>
  );
}
