import postgres from "postgres";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const client = postgres(connectionString, { prepare: false });

async function seed() {
  console.log("🌱 Seeding case studies...");

  // Clear existing case studies
  await client`DELETE FROM case_studies`;
  console.log("  ✓ Cleared existing case studies");

  // Insert Velvet Lublin case study
  await client`
    INSERT INTO case_studies (
      slug,
      client_name,
      client_logo,
      client_url,
      brand_color,
      title,
      description,
      category,
      challenge,
      solution,
      results,
      cover_image,
      tags,
      is_published,
      created_at,
      updated_at
    ) VALUES (
      'velvet-lublin-35-procent-wzrostu',
      'Velvet Lublin',
      '/images/case-studies/velvetlogo.png',
      'https://sprzatanielublin.pl/',
      '#FF6600',
      '+35% sprzedaży w 1 miesiąc dla firmy sprzątającej',
      'Jak lokalna firma sprzątająca z Lublina zwiększyła sprzedaż o 35% w ciągu 30 dni, porządkując SEO lokalne, uruchamiając reklamy Facebook i wdrażając pełną analitykę konwersji. Velvet Lublin to dziś nasz stały partner — współpracujemy nieprzerwanie nad rozwojem ich obecności online.',
      'Marketing',
      ${`<div class="case-challenge">
<h3>Wyjściowa sytuacja klienta</h3>
<p><strong>Velvet Lublin</strong> to firma sprzątająca z Lublina, obsługująca klientów indywidualnych (mieszkania, domy) oraz klientów B2B (biura, lokale usługowe, małe firmy).</p>
<p>Przed rozpoczęciem współpracy firma miała dobrą jakość usług, ale <strong>nie miała systemu pozyskiwania klientów</strong>.</p>

<h4>Kluczowe problemy przed wdrożeniem</h4>
<ul>
<li>Bardzo niska widoczność na frazy lokalne typu: <em>firma sprzątająca Lublin</em>, <em>sprzątanie biur Lublin</em></li>
<li>Strona internetowa generowała ruch, ale <strong>nie generowała sprzedaży</strong></li>
<li>Brak rozdzielenia komunikacji B2C i B2B</li>
<li>Brak analityki — nie było wiadomo, skąd biorą się klienci</li>
<li>Leady głównie z poleceń — brak skalowalności</li>
</ul>

<h4>Punkt startowy (benchmark rynkowy)</h4>
<ul>
<li>Ruch organiczny: niski i niestabilny</li>
<li>Konwersja strony: poniżej średniej rynkowej</li>
<li>Brak leadów z Google Maps</li>
<li>Brak spójnej oferty B2B</li>
</ul>

<h4>Cel biznesowy klienta</h4>
<p>Zwiększyć sprzedaż w krótkim czasie oraz zbudować <strong>stabilny kanał pozyskiwania klientów lokalnych</strong>.</p>
</div>`},
      ${`<div class="case-solution">
<h3>Działania wdrożone — szczegółowy plan operacyjny</h3>

<h4>1. SEO lokalne — fundament całej strategii</h4>
<p>Pierwszym krokiem było lokalne SEO oparte o <strong>intencję zakupu</strong>, a nie „ruch dla ruchu".</p>
<ul>
<li>Analiza fraz lokalnych (wysoka intencja): <em>firma sprzątająca Lublin</em>, <em>sprzątanie mieszkań Lublin</em>, <em>sprzątanie biur Lublin</em>, <em>sprzątanie po remoncie Lublin</em></li>
<li>Stworzenie dedykowanych podstron usługowych</li>
<li>Optymalizacja nagłówków H1–H3 pod zapytania użytkowników</li>
<li>Poprawa meta title i meta description pod CTR</li>
<li>Wdrożenie sekcji FAQ (pytania o ceny, dostępność, bezpieczeństwo)</li>
<li>Optymalizacja Google Business Profile: opisy usług, zdjęcia przed/po, regularne posty lokalne</li>
<li>Dane strukturalne: LocalBusiness, Service, Review</li>
</ul>

<h4>2. Reklamy Facebook / Meta Ads — szybkie przełożenie na sprzedaż</h4>
<p>SEO buduje długoterminową przewagę, ale sprzedaż trzeba było odpalić natychmiast.</p>
<ul>
<li>Osobne kampanie B2C (sprzątanie mieszkań) i B2B (sprzątanie biur)</li>
<li>Targetowanie: Lublin + firmy, właściciele firm, managerowie biur</li>
<li>Komunikaty: lokalna dostępność, szybkie terminy, bezpieczeństwo i zaufanie</li>
<li>Formaty: lead ads, landing page z formularzem</li>
</ul>
<p>Leadów zaczęło przybywać już w <strong>pierwszych 2 tygodniach</strong>, a kampanie były skalowalne bez spadku jakości zapytań.</p>

<h4>3. Analityka i pomiar efektów</h4>
<p>Bez analityki nie ma kontroli.</p>
<ul>
<li>Google Analytics 4 + Google Tag Manager</li>
<li>Śledzenie: wysłanych formularzy, kliknięć w numer telefonu, zapytań B2B</li>
<li>Analiza ścieżek użytkownika</li>
<li>Testy A/B nagłówków i CTA</li>
</ul>

<h4>4. Zmiany na stronie internetowej</h4>
<p>Strona została zoptymalizowana pod <strong>konwersję</strong>, nie „ładny design".</p>
<ul>
<li>Wyraźne CTA nad i pod foldem</li>
<li>Skrócone formularze kontaktowe</li>
<li>Osobna sekcja „Usługi dla firm"</li>
<li>Certyfikaty, ubezpieczenie, opinie klientów</li>
<li>Poprawa szybkości ładowania</li>
</ul>

<h4>5. Linkowanie wewnętrzne i zewnętrzne</h4>
<ul>
<li>Lokalne katalogi firm</li>
<li>Partnerzy biznesowi</li>
<li>Anchory lokalne: „firma sprzątająca Lublin", „sprzątanie biur Lublin"</li>
<li>Logiczne linkowanie między usługami</li>
</ul>
</div>`},
      ${JSON.stringify({
        "Wzrost sprzedaży": "+35%",
        "Czas realizacji": "1 miesiąc",
        "Kanały": "SEO + Meta Ads",
        "Jakość leadów": "Wyraźna poprawa"
      })},
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2532&auto=format&fit=crop',
      ${JSON.stringify(["SEO Lokalne", "Meta Ads", "Analityka", "Optymalizacja konwersji", "Google Business Profile"])},
      true,
      NOW(),
      NOW()
    )
  `;

  console.log("  ✓ Inserted: Velvet Lublin case study");

  // Insert VacuRoll case study
  await client`
    INSERT INTO case_studies (
      slug,
      client_name,
      client_logo,
      client_url,
      brand_color,
      title,
      description,
      category,
      challenge,
      solution,
      results,
      cover_image,
      tags,
      is_published,
      created_at,
      updated_at
    ) VALUES (
      'vacuroll-seo-uzytecznosc',
      'VacuRoll',
      '/images/case-studies/vaccu.png',
      'https://vacuroll.pl/',
      '#E9427D',
      'Kompleksowa optymalizacja SEO i poprawa użyteczności strony studia fitness',
      'Wdrożenie narzędzi analitycznych, poprawa linkowania i optymalizacja UX/UI dla warszawskiego studia fitness VacuRoll. Uporządkowanie struktury strony pod kątem lepszej widoczności w Google.',
      'Web Development',
      ${`<div class="case-challenge">
<h3>O marce</h3>
<p><strong>VacuRoll</strong> to nowe studio fitness w Warszawie, które specjalizuje się w modelowaniu sylwetki i wsparciu w redukcji cellulitu. Marka od początku miała mocną ofertę, jasno określoną grupę odbiorczyń i usługę z dużym potencjałem.</p>
<p>Sama strona internetowa wymagała jednak dopracowania pod kątem SEO, użyteczności i poprawnego działania narzędzi analitycznych.</p>

<h3>Cel współpracy</h3>
<p>Naszym celem było uporządkowanie witryny w taki sposób, aby była bardziej czytelna dla użytkowniczek i lepiej przygotowana do budowania widoczności w Google. Zależało nam nie tylko na poprawkach technicznych, ale również na lepszej prezentacji oferty, wygodzie poruszania się po stronie i jakości zbierania danych.</p>
</div>`},
      ${`<div class="case-solution">
<h3>Zakres prac technicznych</h3>
<p>Prace rozpoczęliśmy od uporządkowania podstaw technicznych serwisu. Przygotowaliśmy sitemapę, co ułatwiło wyszukiwarce odnajdywanie najważniejszych podstron. Następnie wdrożyliśmy Google Search Console, aby monitorować indeksację, ewentualne błędy oraz widoczność witryny na konkretne zapytania.</p>
<p>Kolejnym etapem było wdrożenie Google Tag Managera i uporządkowanie pomiaru zdarzeń. Dzięki temu strona zyskała solidniejsze zaplecze analityczne i została lepiej przygotowana do dalszych działań marketingowych. Równolegle wdrożyliśmy także Consent Mode, porządkując sposób zbierania danych i dostosowując witrynę do aktualnych wymagań związanych ze zgodami użytkowników.</p>

<h3>Uporządkowanie strony</h3>
<p>Dużą uwagę poświęciliśmy strukturze samego serwisu. Poprawiliśmy linkowanie wewnętrzne, aby użytkowniczki mogły szybciej przechodzić między kluczowymi sekcjami, a wyszukiwarka lepiej rozumiała układ strony. Uporządkowaliśmy również cennik, który wcześniej wymagał czytelniejszej prezentacji i lepszego układu informacji.</p>

<h3>Poprawa wyglądu</h3>
<p>Równolegle wprowadziliśmy poprawki wizualne, które wpłynęły na odbiór całej marki. Zadbaliśmy o bardziej spójny układ elementów, lepszą hierarchię treści i czytelniejsze przedstawienie najważniejszych informacji. Dzięki temu strona zaczęła wyglądać nowocześniej, a jednocześnie stała się prostsza i bardziej intuicyjna w użytkowaniu.</p>

<h3>Efekt końcowy</h3>
<p>Efektem prac była uporządkowana, estetyczna i lepiej przygotowana pod SEO strona internetowa. <strong>VacuRoll</strong> zyskało serwis, który lepiej prezentuje ofertę, wspiera dalsze pozycjonowanie i stanowi solidną bazę pod kolejne działania marketingowe w Warszawie.</p>
</div>`},
      ${JSON.stringify({
        "Zakres": "SEO + UX/UI",
        "Analityka": "GTM + GA4",
        "Wydajność": "Poprawiona",
        "Rozwiązanie": "Consent Mode"
      })},
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2540&auto=format&fit=crop',
      ${JSON.stringify(["SEO", "UX/UI", "Analityka", "Web Development", "Google Tag Manager"])},
      true,
      NOW(),
      NOW()
    )
  `;

  console.log("  ✓ Inserted: VacuRoll case study");

  // Insert Kosmetolog Rosanna case study
  await client`
    INSERT INTO case_studies (
      slug,
      client_name,
      client_logo,
      client_url,
      brand_color,
      title,
      description,
      category,
      challenge,
      solution,
      results,
      cover_image,
      tags,
      is_published,
      created_at,
      updated_at
    ) VALUES (
      'rosanna-kosmetolog-wizytowka-google',
      'Kosmetolog Rosanna',
      '/images/case-studies/rosannalogo.jpeg',
      'https://rosanna-kosmetolog.pl/',
      '#D4A373',
      'Profesjonalny profil Google i pozycjonowanie lokalne salonu kosmetologicznego',
      'Zbudowanie i optymalizacja wizytówki Google dla gabinetu kosmetologicznego Rosanna. Pełne wdrożenie wizytówki, spójność NAP oraz integracja z profilami społecznościowymi i stroną www.',
      'Marketing',
      ${`<div class="case-challenge">
<h3>Wyzwanie i cel</h3>
<p>W ramach współpracy z kosmetologiem Rosanna skupiono się na stworzeniu w pełni profesjonalnej obecności lokalnej w sieci.</p>
<p>Celem było zaistnienie w wynikach wyszukiwania lokalnego (Google Maps, Google Search) dla potencjalnych klientów szukających usług kosmetologicznych w okolicy, a także zbudowanie zaufania przez wiarygodny i estetyczny profil online.</p>
</div>`},
      ${`<div class="case-solution">
<h3>Rozwiązanie i zakres prac</h3>

<h4>1. Stworzenie i optymalizacja wizytówki Google (Profilu Firmy)</h4>
<p>Zainicjowano i zaprofesjonalizowano wizytówkę Google, co było kluczowym krokiem do budowy widoczności:</p>
<ul>
<li>Uzupełnienie pełnych danych kontaktowych i dokładnego adresu</li>
<li>Skonfigurowanie właściwych godzin otwarcia</li>
<li>Dodanie szczegółowego opisu profilu dopasowanego do profilu działalności</li>
<li>Ustawienie optymalnej kategorii działalności (kosmetologia / salon urody)</li>
</ul>

<h4>2. Treści wizualne i budowanie zaufania</h4>
<p>Wprowadzono spójne informacje o profilu salonu. Dodanie wysokiej jakości zdjęć usług, całego salonu oraz efektów <strong>przed i po zabiegach</strong> bezpośrednio do profilu, znacząco zwiększyło wiarygodność marki i zaufanie nowych klientów.</p>

<h4>3. Spójność danych (NAP)</h4>
<p>Wdrożono i zweryfikowano spójność danych NAP (Name, Address, Phone) pomiędzy wizytówką Google a główną stroną internetową oraz innymi kanałami pozyskiwania klientów (np. social media).</p>

<h4>4. Linkowanie i pozycjonowanie lokalne</h4>
<p>Dodatkowo zadbano o poprawne linkowanie – zarówno wewnętrzne (poprawna struktura nawigacji na stronie internetowej), jak i zewnętrzne.</p>
<ul>
<li>Umieszczenie odnośników do profilu Google na stronie głównej oraz podstronach.</li>
<li>Integracja linkowania z profilami w mediach społecznościowych.</li>
</ul>
<p>Dzięki temu profil Google został silnie zintegrowany z resztą obecności online, co bezpośrednio wpłynęło na pozycjonowanie lokalne oraz łatwiejsze odnalezienie salonu przez potencjalnych klientów.</p>
</div>`},
      ${JSON.stringify({
        "Profil Google": "Wdrożony",
        "Spójność (NAP)": "100%",
        "Zaufanie": "Zdjęcia przed/po",
        "Widoczność": "Lokalne SEO"
      })},
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80',
      ${JSON.stringify(["Google Business Profile", "Lokalne SEO", "Marketing", "Budowanie zaufania"])},
      true,
      NOW(),
      NOW()
    )
  `;

  console.log("  ✓ Inserted: Kosmetolog Rosanna case study");

  // Insert Bling & Bliss case study
  await client`
    INSERT INTO case_studies (
      slug,
      client_name,
      client_logo,
      client_url,
      brand_color,
      title,
      description,
      category,
      challenge,
      solution,
      results,
      cover_image,
      tags,
      is_published,
      created_at,
      updated_at
    ) VALUES (
      'blingbliss-pozycjonowanie-wizytowki-google',
      'Bling&Bliss',
      '/images/case-studies/blingblislogo.jpeg',
      'https://booksy.com/pl-pl/288944_bling-bliss-aleksandra-szawarejko-stargard-piercing-beauty-estetyka_medycyna-estetyczna_19389_stargard-szczecinski',
      '#D4AF37',
      'Optymalizacja wizytówki Google i pozycjonowanie lokalne salonu Bling&Bliss',
      'Szczegółowa optymalizacja wizytówki Google Business Profile dla gabinetu piercingu i zabiegów estetycznych z ukierunkowaniem na kluczowe frazy lokalne.',
      'Marketing',
      ${`<div class="case-challenge">
<h3>Wyzwanie i cel</h3>
<p>Wizytówka salonu <strong>Bling&amp;Bliss</strong> w Stargardzie wymagała lepszej widoczności w wyszukiwaniach lokalnych, w tym na frazy takie jak: <em>piercing Stargard</em>, <em>mezoterapia igłowa Stargard</em> czy <em>przedłużanie rzęs Stargard</em>.</p>
<p>Oryginalny opis był atrakcyjny wizualnie, ale <strong>brakowało w nim precyzyjnych słów kluczowych</strong>, odpowiedniej struktury pod pozycjonowanie oraz zwięzłości.</p>
<p>Nadrzędnym celem było zwiększenie zapytań o konkretne, zyskowne usługi: specjalistyczny piercing, mezoterapię igłową, oczyszczanie wodorowe oraz zabiegi na brwi i rzęsy.</p>
</div>`},
      ${`<div class="case-solution">
<h3>Wdrożona strategia</h3>

<h4>1. Analiza i przepisanie treści</h4>
<p>Przeprowadziliśmy szczegółową analizę historii zapytań klientów oraz screenów usług. Nowy opis wizytówki to w 100% naturalnie brzmiący, ludzki tekst, w który precyzyjnie wpleciono frazy kluczowe <strong>bez efektu sztucznego upychania (keyword stuffing)</strong>.</p>
<p>Zrezygnowaliśmy z nadmiernego, utrudniającego odbiór formatowania i dziesiątek emotikon – wprowadzając czysty, zwięzły opisy budujący wizerunek profesjonalnego salonu.</p>

<h4>2. Nowa struktura pod SEO</h4>
<p>Wprowadziliśmy czytelną architekturę informacji w opisie:</p>
<ul>
<li>Spersonalizowane i angażujące wprowadzenie</li>
<li>Dokładna lista świadczonych usług dla budowania autorytetu w Google</li>
<li>Wyeksponowane korzyści: sterylność, bezpieczeństwo, precyzja i naturalny <em>efekt glow</em></li>
<li>Jasne lokalne wezwanie do działania (CTA) promujące adres.</li>
</ul>

<h4>3. Błyskawiczne wdrożenie</h4>
<p>Po bardzo sprawnej, zaledwie 15-minutowej iteracji i akceptacji z klientem — zoptymalizowany opis o długości poniżej 650 znaków został natychmiast opublikowany w profilu firmy.</p>
</div>`},
      ${JSON.stringify({
        "Czas iteracji": "15 minut",
        "Szacowane zapytania": "+20-30%",
        "Zgodność SEO": "Wdrożona",
        "Emotki": "Wykluczone"
      })},
      'https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80',
      ${JSON.stringify(["Wizytówka Google", "Lokalne SEO", "Marketing", "Beauty", "Copywriting"])},
      true,
      NOW(),
      NOW()
    )
  `;

  console.log("  ✓ Inserted: Bling & Bliss case study");

  // Insert Similimum case study
  await client`
    INSERT INTO case_studies (
      slug,
      client_name,
      client_logo,
      client_url,
      brand_color,
      title,
      description,
      category,
      challenge,
      solution,
      results,
      cover_image,
      tags,
      is_published,
      created_at,
      updated_at
    ) VALUES (
      'similimum-spektakularny-wzrost-seo',
      'Similimum',
      '/images/case-studies/similimum.png',
      NULL,
      '#10B981',
      'Skokowy wzrost widoczności organicznej: Zwiększenie kliknięć z Google o 739%',
      'Podsumowanie działań SEO za jeden bardzo mocny miesiąc. Strona zanotowała kilkukrotny wzrost w liczbie kliknięć i wyświetleń, potwierdzając skuteczność wprowadzonych poprawek technicznych i treściowych.',
      'SEO',
      ${`<div class="case-challenge">
<h3>Punkt wyjścia i cele</h3>
<p>W poprzednim miesiącu strona osiągała niski poziom ruchu organicznego — zaliczała 23 kliknięcia oraz zaledwie 57 wyświetleń z poziomu bezpłatnych wyników organicznych wyszukiwarki.</p>
<p>Głównym wyzwaniem było uwolnienie potencjału strony, wyeliminowanie blokad technicznych w procesie indeksacji Google oraz budowa wyższego autorytetu po to, by strona stabilnie zdobywała szczyty fraz lokalnych i rynkowych.</p>
</div>`},
      ${`<div class="case-solution">
<h3>Rozwiązanie i wdrażane działania (marzec 2026)</h3>

<h4>1. Rozbudowa treści wspierających widoczność ograniczoną</h4>
<p>Kluczowym działaniem była optymalizacja dotychczasowych treści i rozbudowa strony o nowe, wyczerpujące tematy materiały, wspierające ekspozycję algorytmiczną. Dalsze działania SEO zostały mocno ukierunkowane na budowanie tematyczności wokół głównych słów kluczowych.</p>

<h4>2. Aspekty techniczne i GSC (Google Search Console)</h4>
<p>Opanowaliśmy dużą warstwę trudności technicznych zgłoszonych od klientki. Wdrożyliśmy precyzyjną sitemapę (mapę witryny) do Google Search Console. Zmiana ta była krytyczna i pozwoliła robotom Google w pełni <em>„zrozumieć”</em> strukturę domeny oraz przyspieszyć cykle indeksacji kluczowych podstron.</p>

<h4>3. Linkbuilding (Zewnętrzny Autorytet)</h4>
<p>Pozyskaliśmy na start 3 jakościowe linki zewnętrzne prowadzące do domeny. Te merytoryczne publikacje silnie wsparły zaufanie (<em>Trust Rank</em>) i ogólny autorytet strony z punktu widzenia pozycjonowania off-site.</p>

<h3>Wnioski z podjętych kroków</h3>
<p>Tak kompleksowa i sprawnie poprowadzona akcja skutkowała tym, że <strong>marzec okazał się wyjątkowo silnym miesiącem pod kątem SEO</strong>. Realnie wdrożone poprawki on-site (strona samej w sobie) i off-site (linki) przełożyły się na lawinowy wzrost widoczności – kliknięcia w zaledwie jednym cyklu miesięcznym wzrosły skokowo wielokrotnie. Taki wynik to fantastyczna odpowiedź algorytmów Google na nowe standardy witryny!</p>
</div>`},
      ${JSON.stringify({
        "Kliknięcia z Google": "+739,1% (193)",
        "Wyświetlenia z Google": "+593,0% (395)",
        "Współczynnik CTR": "48,9% (+8,5p.p)",
        "Średnia pozycja": "4,2 (Stabilna)"
      })},
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80',
      ${JSON.stringify(["SEO Optyamlizacja", "Analiza GSC", "Linkbuilding", "Techniczne SEO", "Content"] )},
      true,
      NOW(),
      NOW()
    )
  `;

  console.log("  ✓ Inserted: Similimum case study");
  console.log("\n✅ Seeding complete!");

  await client.end();
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seeding failed:", err);
  process.exit(1);
});
