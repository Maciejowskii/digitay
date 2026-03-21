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
      rating: 4,
    },
  ];

  const dataToRender =
    fetchedTestimonials.length > 0 ? fetchedTestimonials : mockFallback;

  return (
    <section className="py-24 md:py-32 bg-background overflow-hidden border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Featured testimonial - large quote */}
        <div className="mb-16 md:mb-24 max-w-4xl mx-auto text-center">
          <span className="text-primary text-sm tracking-widest mb-12 block">
            [ Opinie klientów ]
          </span>

          {dataToRender[0] && (
            <blockquote className="text-2xl md:text-4xl lg:text-5xl font-heading font-bold text-white leading-[1.2] tracking-tight mb-10">
              &ldquo;{dataToRender[0].content}&rdquo;
            </blockquote>
          )}

          {dataToRender[0] && (
            <div className="flex items-center justify-center gap-4">
              {dataToRender[0].avatarUrl && (
                <img
                  src={dataToRender[0].avatarUrl}
                  alt={dataToRender[0].authorName}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div className="text-left">
                <p className="text-white font-medium">
                  {dataToRender[0].authorName}
                </p>
                <p className="text-white/40 text-sm">
                  {dataToRender[0].authorRole} @ {dataToRender[0].company}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* "Also trusted by" logos */}
        <div className="text-center">
          <p className="text-white/30 text-sm tracking-widest uppercase mb-8">
            Zaufali nam również
          </p>
          <div className="flex flex-wrap justify-center gap-12 opacity-30">
            {["PERN", "SHOPIFY", "PLAY", "PLUS+", "YONELLE"].map((logo) => (
              <span
                key={logo}
                className="text-lg font-heading font-bold text-white tracking-tight"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
