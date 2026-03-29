import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Polityka Prywatności | Digitay",
  description: "Polityka prywatności serwisu Digitay.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#07101B] text-white pt-32 lg:pt-40 pb-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-12">
            Polityka Prywatności<span className="text-primary">.</span>
          </h1>
          
          <div className="prose prose-invert prose-lg text-white/70 max-w-none space-y-10">
            <p>
              Uprzejmie informujemy o polityce prywatności zgodnie z art. 13 ust. 1 i ust. 2 rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679 z 27 kwietnia 2016 r. (RODO).
            </p>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Administrator Danych</h2>
              <div className="space-y-3">
                <p>Administratorem Pani/Pana danych osobowych jest firma Jakub Wolert z siedzibą pod adresem: ul. Targowa 6/5, 72-010 Police, NIP: 8513315629, REGON: 52918637000000.</p>
                <p>Kontakt e-mail: <a href="mailto:kontakt@digitay.pl" className="text-primary hover:underline">kontakt@digitay.pl</a>.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Cel i podstawa przetwarzania</h2>
              <div className="space-y-3">
                <p>Przetwarzanie Pani/Pana danych osobowych będzie się odbywać na podstawie art. 6 RODO. W celu marketingowym Administrator powołuje się na prawnie uzasadniony interes, którym jest zbieranie danych statystycznych i analizowanie ruchu na stronie internetowej digitay.pl.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Dobrowolność i Odbiorcy danych</h2>
              <div className="space-y-3">
                <p>Podanie danych osobowych na stronie internetowej digitay.pl jest dobrowolne. Podstawą przetwarzania danych jest moja zgoda. Mam wpływ na przeglądarkę internetową i jej ustawienia. Odbiorcami danych osobowych mogą być zaufani partnerzy (np. dostawcy hostingu, Google, Facebook).</p>
                <p>Mam prawo wycofania zgody w dowolnym momencie poprzez zmianę ustawień w przeglądarce. Dane osobowe będą przetwarzane i przechowywane w zależności od okresu używania technologii.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Prawa użytkownika</h2>
              <div className="space-y-3">
                <p>Posiada Pani/Pan prawo dostępu do treści swoich danych osobowych, prawo do ich sprostowania, usunięcia, jak i również prawo do ograniczenia ich przetwarzania, prawo do cofnięcia zgody, prawo do przenoszenia danych oraz prawo do wniesienia sprzeciwu wobec przetwarzania.</p>
                <p>Przysługuje Pani/Panu prawo wniesienia skargi do organu nadzorczego (Prezesa Urzędu Ochrony Danych Osobowych), jeśli Pani/Pana zdaniem, przetwarzanie danych osobowych narusza przepisy unijnego rozporządzenia RODO.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Profilowanie</h2>
              <div className="space-y-3">
                <p>Profilowanie używane jest w Google Analytics, Google Tag Manager. W sytuacji wniesienia sprzeciwu wobec profilowania, prosimy zoptymalizować odpowiednio przeglądarkę lub zmienić ustawienia zgody na pliki cookie.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Zarządzanie zgodą na pliki cookie (Consent Mode v2)</h2>
              <div className="space-y-3">
                <p>W celu zapewnienia zgodności z wymogami RODO oraz rozporządzeniem o prywatności i łączności elektronicznej, używamy Google Consent Mode v2 do zarządzania zgodą użytkowników na pliki cookie.</p>
                <p>Jak to działa:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Domyślnie wszystkie pliki cookie analityczne są wyłączone (ustawione na "denied")</li>
                  <li>Pliki cookie analityczne (Google Analytics) są aktywowane dopiero po wyrażeniu przez użytkownika wyraźnej zgody</li>
                  <li>Użytkownik może w każdej chwili zmienić swoje preferencje dotyczące plików cookie poprzez banner zgody lub panel ustawień</li>
                  <li>Zgoda jest dobrowolna - użytkownik może odrzucić wszystkie pliki cookie analityczne</li>
                </ul>
                <p>Więcej informacji o zarządzaniu plikami cookie znajdziesz w Polityce Cookies.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Czas przechowywania</h2>
              <div className="space-y-3">
                <p>Pani/Pana dane osobowe będą przechowywane przez okres niezbędny do realizacji celów, a w celach marketingowych od 30 dni do 5 lat lub do czasu wycofania zgody.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Kontakt</h2>
              <div className="space-y-3">
                <p>W przypadku pytań dotyczących przetwarzania danych osobowych prosimy o kontakt z Administratorem pod adresem e-mail: <a href="mailto:kontakt@digitay.pl" className="text-primary hover:underline">kontakt@digitay.pl</a> lub korespondencyjnie na adres siedziby firmy.</p>
              </div>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
