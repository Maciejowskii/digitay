import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black pt-16 md:pt-24 uppercase overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 mb-24">
          
          {/* Identity */}
          <div className="col-span-2 md:col-span-1 flex flex-col justify-between">
            <div>
              <span className="text-white font-heading font-bold text-2xl tracking-tighter block mb-4">
                DIGITAY<span className="text-primary">.</span>
              </span>
              <p className="text-white/50 text-xs font-mono leading-relaxed mb-6">
                NOWOCZESNA AGENCJA CYFROWA.<br/>
                KOD, DESIGN, WYNIKI.
              </p>
            </div>
            <div className="text-xs font-mono text-white/30 space-y-1">
              <p>NIP: 0000000000</p>
              <p>REGON: 000000000</p>
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="text-white/30 font-mono text-xs mb-6 tracking-widest">[ NA SKRÓTY ]</h4>
            <ul className="flex flex-col gap-4 font-mono text-sm">
              <li><Link href="#about" className="text-white hover:text-primary transition-colors">O NAS</Link></li>
              <li><Link href="#services" className="text-white hover:text-primary transition-colors">USŁUGI</Link></li>
              <li><Link href="#cases" className="text-white hover:text-primary transition-colors">CASE STUDY</Link></li>
              <li><Link href="#blog" className="text-white hover:text-primary transition-colors">BLOG</Link></li>
              <li><Link href="#contact" className="text-white hover:text-primary transition-colors">KONTAKT</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="text-white/30 font-mono text-xs mb-6 tracking-widest">[ SPECJALIZACJE ]</h4>
            <ul className="flex flex-col gap-4 font-mono text-sm">
              <li className="text-white/70">APLIKACJE MOBILE</li>
              <li className="text-white/70">APLIKACJE WEB</li>
              <li className="text-white/70">STRONY B2B / B2C</li>
              <li className="text-white/70">ZRYWNE SEO</li>
              <li className="text-white/70">UI/UX DESIGN</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white/30 font-mono text-xs mb-6 tracking-widest">[ KONTAKT ]</h4>
            <div className="flex flex-col gap-4 font-mono text-sm">
              <a href="tel:+48733172145" className="text-white hover:text-primary transition-colors">
                +48 733 172 145
              </a>
              <a href="tel:+48535645322" className="text-white hover:text-primary transition-colors">
                +48 535 645 322
              </a>
              <a href="mailto:kontakt@digitay.pl" className="text-white hover:text-primary transition-colors mt-2">
                KONTAKT@DIGITAY.PL
              </a>
            </div>
            <div className="mt-8 pt-4 border-t border-white/10 font-mono text-xs text-white/50 space-y-2">
              <p>[ GODZINY PRACY ]</p>
              <p className="text-white">PON - PT: 09:00 - 17:00</p>
            </div>
          </div>
        </div>

        {/* Massive Logo Bottom */}
        <div className="border-t border-white/10 pt-16 pb-8 text-center md:text-left">
          <h1 className="text-[15vw] md:text-[180px] font-heading font-bold text-white leading-none tracking-tighter select-none opacity-90 pb-8 border-b border-white/10 mb-8">
            DIGITAY
          </h1>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-xs text-white/30">
            <p>
              © {new Date().getFullYear()} DIGITAY. ALL SYSTEMS NOMINAL.
            </p>
            <div className="flex gap-8">
              <Link href="#" className="hover:text-white transition-colors">POLITYKA PRYWATNOŚCI</Link>
              <Link href="#" className="hover:text-white transition-colors">REGULAMIN</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
