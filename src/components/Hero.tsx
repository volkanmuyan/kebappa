import Image from 'next/image';

interface Props {
  lang: string;
}

export default function Hero({ lang }: Props) {
  const sloganMap: Record<string, string> = {
    fr: 'Le premier vrai kebab allemand à Bruxelles',
    nl: 'De eerste echte Duitse kebab in Brussel',
    en: 'The first real German kebab in Brussels',
  };
  const ctaMap: Record<string, string> = {
    fr: 'Commander maintenant',
    nl: 'Nu bestellen',
    en: 'Order now',
  };
  const slogan = sloganMap[lang] || sloganMap.fr;
  const cta = ctaMap[lang] || ctaMap.fr;

  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: '480px' }}>
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/hero.jpeg"
          alt="KEBAPPA hero"
          fill
          priority
          className="object-cover object-right md:object-center"
        />
        {/* Mobile: full dark overlay so image text doesn't compete */}
        <div className="absolute inset-0 bg-[#060709]/80 md:hidden" />
        {/* Desktop: directional gradient */}
        <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-[#060709] via-[#060709]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060709] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 md:py-28 flex flex-col justify-center" style={{ minHeight: '480px' }}>
        <div className="max-w-xl">
          <div className="inline-block bg-[#EC6603] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
            Schaerbeek · Bruxelles
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-[#f5f5f5] tracking-tight leading-none mb-2">
            KEBAPPA
          </h1>
          <p className="text-[#EC6603] text-sm font-bold uppercase tracking-[0.3em] mb-4">
            REAL GERMAN KEBABS
          </p>
          <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed">
            {slogan}
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#menu"
              className="bg-[#EC6603] hover:bg-[#C9550A] text-white font-bold px-6 py-3 rounded-lg transition-colors text-sm"
            >
              {cta}
            </a>
            <a
              href="#contact"
              className="border border-[#26282b] hover:border-[#EC6603] text-[#f5f5f5] font-bold px-6 py-3 rounded-lg transition-colors text-sm"
            >
              {lang === 'nl' ? 'Adres' : lang === 'en' ? 'Find us' : 'Nous trouver'}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
