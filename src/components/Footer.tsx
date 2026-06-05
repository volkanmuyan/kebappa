export default function Footer({ lang }: { lang: string }) {
  const labels: Record<string, Record<string, string>> = {
    address: { fr: 'Adresse', nl: 'Adres', en: 'Address' },
    hours: { fr: 'Horaires', nl: 'Openingstijden', en: 'Opening hours' },
    daily: { fr: 'Tous les jours', nl: 'Elke dag', en: 'Every day' },
    contact: { fr: 'Contact', nl: 'Contact', en: 'Contact' },
    followUs: { fr: 'Suivez-nous', nl: 'Volg ons', en: 'Follow us' },
    orderOnline: { fr: 'Commander en ligne', nl: 'Online bestellen', en: 'Order online' },
  };
  const l = (key: string) => labels[key]?.[lang] || labels[key]?.fr || key;

  return (
    <footer id="contact" className="bg-[#0a0b0d] border-t border-[#26282b] mt-20">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="text-2xl font-black text-[#f5f5f5] tracking-widest mb-1">KEBAPPA</div>
            <div className="text-[#EC6603] text-xs font-bold uppercase tracking-[0.25em] mb-4">REAL GERMAN KEBABS</div>
            <p className="text-gray-500 text-sm leading-relaxed">
              {lang === 'nl'
                ? 'De eerste echte Berlijnse döner kebab in Brussel. 92% puur vlees, huisgemaakt brood en sauzen.'
                : lang === 'en'
                ? 'The first authentic Berlin-style döner kebab in Brussels. 92% pure meat, homemade bread and sauces.'
                : 'Le premier döner kebab berlinois authentique à Bruxelles. 92% viande pure, pain et sauces maison.'}
            </p>
          </div>

          {/* Address & Hours */}
          <div className="space-y-6">
            <div>
              <h3 className="text-[#f5f5f5] font-bold mb-2 uppercase text-xs tracking-widest">{l('address')}</h3>
              <address className="not-italic text-gray-400 text-sm leading-relaxed">
                Rue de Brabant 232<br />
                1030 Schaerbeek<br />
                Bruxelles, Belgique
              </address>
              <a
                href="https://maps.google.com/?q=Rue+de+Brabant+232+1030+Schaerbeek+Brussels"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-[#EC6603] hover:text-[#C9550A] text-xs font-medium transition-colors"
              >
                → Google Maps
              </a>
            </div>
            <div>
              <h3 className="text-[#f5f5f5] font-bold mb-2 uppercase text-xs tracking-widest">{l('hours')}</h3>
              <div className="text-gray-400 text-sm">
                <div className="flex justify-between gap-4">
                  <span>{l('daily')}</span>
                  <span className="text-[#f5f5f5] font-medium">11:00 – 01:00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact & Socials */}
          <div>
            <h3 className="text-[#f5f5f5] font-bold mb-4 uppercase text-xs tracking-widest">{l('contact')}</h3>
            <div className="space-y-3">
              <a
                href="https://www.ubereats.com/be-en/store/kebappa-doner-kebab/7MXzS8vzX7KYbPlW-NLxNA"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-[#EC6603] text-sm transition-colors"
              >
                <span>🛵</span>
                <span>Uber Eats</span>
              </a>
              <a
                href="https://www.instagram.com/kebappa.brussels/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-[#EC6603] text-sm transition-colors"
              >
                <span>📸</span>
                <span>@kebappa.brussels</span>
              </a>
              <a
                href="https://www.tiktok.com/@kebappa.brussels"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-[#EC6603] text-sm transition-colors"
              >
                <span>🎵</span>
                <span>@kebappa.brussels</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#26282b] mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">© 2025 KEBAPPA. All rights reserved.</p>
          <p className="text-gray-700 text-xs">Rue de Brabant 232, 1030 Schaerbeek, Bruxelles</p>
        </div>
      </div>
    </footer>
  );
}
