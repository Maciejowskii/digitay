import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { desc } from "drizzle-orm";
import { TestimonialsSlider } from "./TestimonialsSlider";

export default async function Testimonials() {
  let fetchedTestimonials: any[] = [];
  
  try {
    // Fetch data using Drizzle RSC
    fetchedTestimonials = await db
      .select()
      .from(testimonials)
      .orderBy(desc(testimonials.createdAt));
  } catch (error) {
    console.error("Failed to fetch testimonials:", error);
  }

  // Fallback mock data if DB is empty for presentational purposes
  const mockFallback = [
    {
      id: 991,
      authorName: "Katarzyna W.",
      authorRole: "CEO",
      company: "Lumiere Sp.",
      content: "Najlepsza agencja z jaką przyszło nam pracować. Zero owijania w bawełnę, same twarde dane i realne wzrosty. Nasz ruch organiczny wzrósł o 300% w 4 miesiące.",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop",
      rating: 5,
    },
    {
      id: 992,
      authorName: "Michał T.",
      authorRole: "Dyrektor Marketingu",
      company: "BuildTech",
      content: "Strona internetowa, którą nam dostarczyli to mistrzostwo świata. Klienci sami dzwonią żeby pochwalić wygląd, a konwersja wystrzeliła w kosmos. Polecam każdemu.",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&auto=format&fit=crop",
      rating: 5,
    },
    {
      id: 993,
      authorName: "Anna z.",
      authorRole: "Właścicielka",
      company: "Klinika Piękna",
      content: "Kampanie Google Ads wreszcie zaczęły na siebie zarabiać. Świetny kontakt z zespołem Digitay, wszystkie zmiany wprowadzane są błyskawicznie. ",
      avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=256&auto=format&fit=crop",
      rating: 4,
    }
  ];

  const dataToRender = fetchedTestimonials.length > 0 ? fetchedTestimonials : mockFallback;

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl mb-12">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-jakarta font-bold text-zinc-900 tracking-tight leading-tight mb-6">
             Nie wierzysz nam? <br />
             <span className="text-brand-green">Posłuchaj klientów.</span>
          </h2>
          <p className="text-zinc-500 text-lg">
            Słoleczność ludzi i firm, które powierzyły nam swój rozwój. Codziennie pracujemy na ich zaufanie dowożąc mierzalne wyniki.
          </p>
        </div>
      </div>
      
      {/* Full width slider */}
      <TestimonialsSlider testimonials={dataToRender as any} />
    </section>
  );
}
