import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Header from '@/components/Header';

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const messages = await getMessages();
  return (
    <NextIntlClientProvider locale={lang} messages={messages}>
      <div className="min-h-screen bg-[#060709] text-[#f5f5f5]">
        <Header lang={lang} />
        <main>{children}</main>
      </div>
    </NextIntlClientProvider>
  );
}
