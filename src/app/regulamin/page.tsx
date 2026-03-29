import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Regulamin | Digitay",
  description: "Regulamin korzystania z serwisu Digitay.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#07101B] text-white pt-32 lg:pt-40 pb-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-12">Regulamin Serwisu Digitay<span className="text-primary">.</span></h1>
          
          <div className="prose prose-invert prose-lg text-white/70 max-w-none space-y-10">
            
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">§1. Postanowienia ogólne</h2>
              <div className="space-y-3">
                <p>Niniejszy Regulamin określa zasady korzystania z serwisu internetowego dostępnego pod adresem digitay.pl.</p>
                <p>Właścicielem Serwisu jest firma: Jakub Wolert, ul. Targowa 6/5, 72-010 Police, NIP: 8513315629, REGON: 52918637000000.</p>
                <p>Kontakt z Usługodawcą możliwy jest pod adresem e-mail: <a href="mailto:kontakt@digitay.pl" className="text-primary hover:underline">kontakt@digitay.pl</a>.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">§2. Definicje</h2>
              <div className="space-y-3">
                <p><strong>Serwis</strong> – platforma internetowa digitay.pl.</p>
                <p><strong>Użytkownik</strong> – każda osoba fizyczna lub prawna korzystająca z Serwisu.</p>
                <p><strong>Wizytówka</strong> – podstrona w Serwisie prezentująca dane firmy Użytkownika.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">§3. Zasady korzystania z Serwisu</h2>
              <div className="space-y-3">
                <p>Korzystanie z Serwisu jest dobrowolne. Dodanie podstawowej wizytówki firmy jest bezpłatne.</p>
                <p>Użytkownik zobowiązany jest do podawania danych zgodnych ze stanem faktycznym.</p>
                <p>Zabrania się dodawania treści bezprawnych, obraźliwych lub naruszających prawa osób trzecich.</p>
                <p>Administrator zastrzega sobie prawo do weryfikacji, edycji lub usunięcia wizytówek naruszających Regulamin.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">§4. Odpowiedzialność</h2>
              <div className="space-y-3">
                <p>Administrator dokłada wszelkich starań, aby dane w Serwisie były aktualne, jednak nie ponosi odpowiedzialności za treść wizytówek dodawanych przez Użytkowników.</p>
                <p>Administrator nie ponosi odpowiedzialności za przerwy w działaniu Serwisu wynikające z przyczyn technicznych lub niezależnych od niego.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">§5. Metody płatności i realizacja usług</h2>
              <div className="space-y-3">
                <p>Płatności w serwisie digitay.pl są obsługiwane przez system płatności Przelewy24.</p>
                <p>Dostępne metody płatności: przelewy bankowe online, płatności kartą kredytową/debetową (Visa, Mastercard), BLIK oraz inne metody oferowane przez Przelewy24.</p>
                <p>Płatność za usługi Premium jest wymagana przed aktywacją pakietu. Usługa jest aktywowana natychmiast po potwierdzeniu płatności przez system płatniczy.</p>
                <p>W przypadku płatności kartą kredytową/debetową, dostawcą usług płatniczych jest PayPro SA, Agent Rozliczeniowy, ul. Pastelowa 8, 60-198 Poznań, wpisany do rejestru przedsiębiorców Krajowego Rejestru Sądowego prowadzonego przez Sąd Rejonowy dla Poznania Nowe Miasto i Wilda w Poznaniu, VIII Wydział Gospodarczy Krajowego Rejestru Sądowego, pod numerem KRS 0000347935, NIP 7792369887, REGON 301345068.</p>
                <p>Termin płatności: płatność jest wymagana przed aktywacją usługi. W przypadku niepowodzenia płatności, usługa nie zostanie aktywowana.</p>
                <p>Usługi Premium są świadczone w formie cyfrowej (dostęp online do panelu zarządzania i funkcji Premium). Usługa jest aktywowana automatycznie po potwierdzeniu płatności.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">§6. Prawo odstąpienia od umowy</h2>
              <div className="space-y-3">
                <p>Zgodnie z art. 38 pkt 1 ustawy o prawach konsumenta, konsument nie może odstąpić od umowy o świadczenie usług, jeżeli usługodawca wykonał w pełni usługę za wyraźną zgodą konsumenta, który został poinformowany przed rozpoczęciem świadczenia, że po spełnieniu świadczenia przez usługodawcę utraci prawo odstąpienia od umowy.</p>
                <p>W przypadku usług Premium, które są aktywowane natychmiast po płatności, konsument traci prawo odstąpienia po wyrażeniu zgody na natychmiastową aktywację usługi.</p>
                <p>W przypadku, gdy konsument nie wyraził zgody na natychmiastową aktywację, przysługuje mu prawo odstąpienia od umowy w terminie 14 dni od dnia zawarcia umowy bez podania przyczyny.</p>
                <p>Aby skorzystać z prawa odstąpienia, konsument powinien poinformować nas o swojej decyzji za pomocą jednoznacznego oświadczenia (np. pismo wysłane pocztą, faksem lub e-mailem) na adres: kontakt@digitay.pl.</p>
                <p>Wzór formularza odstąpienia od umowy dostępny jest na żądanie.</p>
                <p>W przypadku odstąpienia od umowy, zwrotu dokonamy niezwłocznie, nie później niż w terminie 14 dni od dnia otrzymania informacji o odstąpieniu. Zwrotu dokonamy tym samym sposobem płatności, jakiego użył konsument, chyba że konsument wyraźnie zgodził się na inny sposób zwrotu.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">§7. Reklamacje</h2>
              <div className="space-y-3">
                <p>Reklamacje dotyczące działania Serwisu można zgłaszać drogą elektroniczną na adres e-mail Administratora.</p>
                <p>Reklamacja powinna zawierać dane zgłaszającego oraz opis problemu.</p>
                <p>Administrator rozpatruje reklamacje w terminie 14 dni.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">§8. Postanowienia końcowe</h2>
              <div className="space-y-3">
                <p>W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie mają przepisy Kodeksu Cywilnego oraz RODO.</p>
                <p>Polityka Prywatności oraz Polityka Cookies stanowią integralną część niniejszego Regulaminu.</p>
              </div>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
