import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0A131F] text-white overflow-hidden border-t border-white/5">
      {/* Main footer content */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-20 md:pt-24 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="text-2xl font-heading font-bold tracking-tight text-white block mb-5"
            >
              digitay<span className="text-primary">.</span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Cyfrowa agencja i software house.
              <br />
              Analiza, design, development i wdrożenie.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white/30 text-xs tracking-widest uppercase mb-5 font-medium">
              Nawigacja
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { name: "O nas", href: "/o-nas" },
                { name: "Usługi", href: "/uslugi" },
                { name: "Realizacje", href: "/case-study" },
                { name: "Blog", href: "/blog" },
                { name: "Kontakt", href: "/kontakt" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Specializations */}
          <div>
            <h4 className="text-white/30 text-xs tracking-widest uppercase mb-5 font-medium">
              Specjalizacje
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { name: "Strony Internetowe", href: "/uslugi/tworzenie-stron" },
                { name: "Sklepy Internetowe", href: "/uslugi/sklepy-internetowe" },
                { name: "Pozycjonowanie SEO", href: "/uslugi/pozycjonowanie-seo" },
                { name: "Google Ads", href: "/uslugi/kampanie-google-ads" },
                { name: "Facebook Ads", href: "/uslugi/reklamy-facebook-ads" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/50 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white/30 text-xs tracking-widest uppercase mb-5 font-medium">
              Kontakt
            </h4>
            <div className="flex flex-col gap-3 text-sm">
              <a
                href="tel:+48733172145"
                className="text-white/50 hover:text-white transition-colors"
              >
                +48 733 172 145
              </a>
              <a
                href="tel:+48535645322"
                className="text-white/50 hover:text-white transition-colors"
              >
                +48 535 645 322
              </a>
              <a
                href="mailto:kontakt@digitay.pl"
                className="text-primary hover:text-primary/80 transition-colors mt-1 font-medium"
              >
                kontakt@digitay.pl
              </a>
            </div>
            <div className="mt-6 pt-4 border-t border-white/5 text-xs text-white/25">
              <p>Pon – Pt: 09:00 – 17:00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/25">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <p>
              © {new Date().getFullYear()} Digitay. Wszelkie prawa zastrzeżone.
            </p>
            <p className="text-white/15">
              digital partner // since 2025
            </p>
          </div>
          <div className="flex gap-6 text-white/30">
            <Link
              href="/polityka-prywatnosci"
              className="hover:text-white/60 transition-colors"
            >
              Polityka prywatności
            </Link>
            <Link
              href="/regulamin"
              className="hover:text-white/60 transition-colors"
            >
              Regulamin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
