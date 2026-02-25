import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#050A11] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6 inline-flex group">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold font-heading shadow-[0_0_15px_rgba(25,163,84,0.3)] group-hover:shadow-[0_0_20px_rgba(25,163,84,0.6)] transition-all duration-300">
                D
              </div>
              <span className="text-xl font-heading font-bold tracking-tight text-white">
                Digitay<span className="text-primary">.pl</span>
              </span>
            </Link>
            <p className="text-muted text-sm leading-relaxed mb-6">
              Nowoczesna agencja cyfrowa i software house. Tworzymy rozwiązania, które sprzedają i automatyzują procesy, kładąc nacisk na najwyższą jakość designu i kodu.
            </p>
            <div className="text-xs text-white/40">
              NIP: 0000000000 <br />
              REGON: 000000000
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-heading font-bold mb-6">Na skróty</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="#about" className="text-muted hover:text-primary transition-colors text-sm">O nas</Link></li>
              <li><Link href="#services" className="text-muted hover:text-primary transition-colors text-sm">Usługi</Link></li>
              <li><Link href="#cases" className="text-muted hover:text-primary transition-colors text-sm">Case Study</Link></li>
              <li><Link href="#blog" className="text-muted hover:text-primary transition-colors text-sm">Blog</Link></li>
              <li><Link href="#contact" className="text-muted hover:text-primary transition-colors text-sm">Kontakt</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-heading font-bold mb-6">Specjalizacje</h4>
            <ul className="flex flex-col gap-3">
              <li className="text-muted text-sm">Aplikacje Mobilne iOS/Android</li>
              <li className="text-muted text-sm">Aplikacje Webowe</li>
              <li className="text-muted text-sm">Sklepy B2B / B2C</li>
              <li className="text-muted text-sm">Skuteczne pozycjonowanie SEO</li>
              <li className="text-muted text-sm">UI/UX Design</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-heading font-bold mb-6">Szybki kontakt</h4>
            <div className="flex flex-col gap-4">
              <a href="tel:+48733172145" className="text-lg font-medium text-white hover:text-primary transition-colors">
                +48 733 172 145
              </a>
              <a href="tel:+48535645322" className="text-lg font-medium text-white hover:text-primary transition-colors">
                +48 535 645 322
              </a>
              <a href="mailto:kontakt@digitay.pl" className="text-muted hover:text-primary transition-colors mt-2 text-sm">
                kontakt@digitay.pl
              </a>
              <div className="mt-4 pt-4 border-t border-white/5">
                <p className="text-sm text-muted mb-1">Czynne:</p>
                <p className="text-white font-medium text-sm">Pon - Pt: 9:00 - 17:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} Digitay.pl. Wszelkie prawa zastrzeżone.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-white/40 hover:text-white transition-colors text-xs">Polityka Prywatności</Link>
            <Link href="#" className="text-white/40 hover:text-white transition-colors text-xs">Regulamin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
