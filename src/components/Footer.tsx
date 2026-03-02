import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-transparent pt-16 md:pt-24 uppercase overflow-hidden flex flex-col items-center">
      <div className="w-full max-w-7xl px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 mb-24">
        
        {/* Identity */}
        <div className="col-span-2 md:col-span-1 flex flex-col justify-between">
          <div>
            <span className="text-white font-heading font-black text-3xl tracking-tighter block mb-4">
              DIGITAY<span className="text-primary">.</span>
            </span>
            <p className="text-white/50 text-xs font-mono leading-relaxed mb-6">
              CYFROWA AGENCJA & SOFTWARE HOUSE.<br/>
              ANALIZA, DESIGN, KOD, WYNIKI.
            </p>
          </div>
          <div className="text-xs font-mono text-white/30 space-y-1">
            <p>NIP: 0000000000</p>
            <p>REGON: 000000000</p>
          </div>
        </div>

        {/* Links 1 - Nawigacja */}
        <div>
          <h4 className="text-white/40 font-mono text-xs mb-6 tracking-widest">// NAWIGACJA</h4>
          <ul className="flex flex-col gap-4 font-mono text-sm">
            <li><Link href="/o-nas" className="text-white/70 hover:text-white hover:pl-2 transition-all duration-300">O NAS</Link></li>
            <li><Link href="/uslugi" className="text-white/70 hover:text-white hover:pl-2 transition-all duration-300">USŁUGI</Link></li>
            <li><Link href="/case-study" className="text-white/70 hover:text-white hover:pl-2 transition-all duration-300">CASE STUDY</Link></li>
            <li><Link href="/blog" className="text-white/70 hover:text-white hover:pl-2 transition-all duration-300">BLOG</Link></li>
            <li><Link href="/kontakt" className="text-white/70 hover:text-white hover:pl-2 transition-all duration-300">KONTAKT</Link></li>
          </ul>
        </div>

        {/* Links 2 - Specjalizacje */}
        <div>
          <h4 className="text-white/40 font-mono text-xs mb-6 tracking-widest">// SPECJALIZACJE</h4>
          <ul className="flex flex-col gap-4 font-mono text-sm">
            <li><Link href="/uslugi/aplikacje-mobile" className="text-white/70 hover:text-white hover:pl-2 transition-all duration-300">APLIKACJE MOBILE</Link></li>
            <li><Link href="/uslugi/aplikacje-web" className="text-white/70 hover:text-white hover:pl-2 transition-all duration-300">APLIKACJE WEB</Link></li>
            <li><Link href="/uslugi/strony-www" className="text-white/70 hover:text-white hover:pl-2 transition-all duration-300">STRONY B2B / B2C</Link></li>
            <li><Link href="/uslugi/design-systemy" className="text-white/70 hover:text-white hover:pl-2 transition-all duration-300">DESIGN SYSTEMY</Link></li>
            <li><Link href="/uslugi/ui-ux-design" className="text-white/70 hover:text-white hover:pl-2 transition-all duration-300">UI/UX DESIGN</Link></li>
          </ul>
        </div>

        {/* Contact Details */}
        <div>
          <h4 className="text-white/40 font-mono text-xs mb-6 tracking-widest">// KONTAKT</h4>
          <div className="flex flex-col gap-4 font-mono text-sm">
            <a href="tel:+48733172145" className="text-white/70 hover:text-white transition-colors">
              +48 733 172 145
            </a>
            <a href="tel:+48535645322" className="text-white/70 hover:text-white transition-colors">
              +48 535 645 322
            </a>
            <a href="mailto:kontakt@digitay.pl" className="text-primary hover:text-white transition-colors mt-2">
              KONTAKT@DIGITAY.PL
            </a>
          </div>
          <div className="mt-8 pt-4 border-t border-white/10 font-mono text-xs text-white/30 space-y-2">
            <p>// GODZINY PRACY</p>
            <p className="text-white/50">PON - PT: 09:00 - 17:00</p>
          </div>
        </div>
      </div>

      {/* Bottom Footer Area */}
      <div className="w-full relative overflow-hidden flex flex-col items-center border-t border-white/10">
        
        <div className="w-full max-w-7xl px-6 md:px-12 py-8 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-[10px] sm:text-xs text-white/30">
          <div className="flex flex-col gap-1 text-left sm:text-center md:text-left">
            <p>
              © {new Date().getFullYear()} DIGITAY. ALL SYSTEMS NOMINAL.
            </p>
            <p className="text-white/20">
              [ <span className="text-white/40">Stworzone przez MACIEJ TYRA</span> ]
            </p>
          </div>
          <div className="flex gap-4 sm:gap-8 uppercase tracking-widest">
            <Link href="/polityka-prywatnosci" className="hover:text-white transition-colors">Polityka Prywatności</Link>
            <Link href="/regulamin" className="hover:text-white transition-colors">Regulamin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
