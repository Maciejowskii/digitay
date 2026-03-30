import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { desc } from "drizzle-orm";
import { TestimonialsSlider } from "./TestimonialsSlider";

export default async function Testimonials() {
  let fetchedTestimonials: any[] = [];

  try {
    fetchedTestimonials = await db
      .select()
      .from(testimonials)
      .orderBy(desc(testimonials.createdAt));
  } catch (error) {
    console.error("Failed to fetch testimonials:", error);
  }

  const mockFallback = [
    {
      id: 991,
      authorName: "Katarzyna W.",
      authorRole: "CEO",
      company: "Lumiere Sp.",
      content:
        "Najlepsza agencja z jaką przyszło nam pracować. Zero owijania w bawełnę, same twarde dane i realne wzrosty. Nasz ruch organiczny wzrósł o 300% w 4 miesiące.",
      avatarUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop",
      rating: 5,
    },
    {
      id: 992,
      authorName: "Michał T.",
      authorRole: "Dyrektor Marketingu",
      company: "BuildTech",
      content:
        "Strona internetowa, którą nam dostarczyli to mistrzostwo świata. Klienci sami dzwonią żeby pochwalić wygląd, a konwersja wystrzeliła w kosmos. Polecam każdemu.",
      avatarUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&auto=format&fit=crop",
      rating: 5,
    },
    {
      id: 993,
      authorName: "Anna Z.",
      authorRole: "Właścicielka",
      company: "Klinika Piękna",
      content:
        "Kampanie Google Ads wreszcie zaczęły na siebie zarabiać. Świetny kontakt z zespołem Digitay, wszystkie zmiany wprowadzane są błyskawicznie.",
      avatarUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=256&auto=format&fit=crop",
      rating: 5,
    },
    {
      id: 994,
      authorName: "Tomasz K.",
      authorRole: "Founder",
      company: "NovaApp",
      content:
        "Nasza nowa aplikacja mobilna działa bezbłędnie. Zespół Digitay dostarczył produkt szybciej niż zakładaliśmy, zachowując najwyższe standardy kodu. Jesteśmy zachwyceni.",
      avatarUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&auto=format&fit=crop",
      rating: 5,
    },
  ];

  const dataToRender =
    fetchedTestimonials.length > 0 ? fetchedTestimonials : mockFallback;

  return (
    <section className="py-24 md:py-32 bg-background overflow-hidden relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <span className="text-primary font-heading font-bold text-sm tracking-widest block mb-4">
              [ Co mówią klienci ]
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white tracking-tight leading-[1.1]">
              Nie wierz nam na słowo
              <br />
              <span className="text-white/40 italic font-light">
                - sprawdź nasze opinie
              </span>
            </h2>
          </div>
          <p className="text-white/40 max-w-sm text-sm">
            Przesuń w bok, żeby zobaczyć opinie naszych partnerów.
            Dostarczamy wyniki, które bronią się same.
          </p>
        </div>
      </div>

      {/* Horizontal Slider Component */}
      <TestimonialsSlider testimonials={dataToRender} />
    </section>
  );
}
