import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { BlogPostReader } from "@/components/frontend/BlogPostReader";
import { notFound } from "next/navigation";

// Generate dynamic metadata for SEO based on the post
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  const [post] = await db
    .select({ title: blogPosts.title, excerpt: blogPosts.excerpt })
    .from(blogPosts)
    .where(eq(blogPosts.slug, resolvedParams.slug))
    .limit(1);

  if (!post) {
    return { title: 'Post not found | Digitay' };
  }

  return {
    title: `${post.title} | Digitay Blog`,
    description: post.excerpt || `Czytaj najnowszy artykuł na blogu Digitay.`,
  };
}

export default async function SingleBlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  let [post] = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.slug, resolvedParams.slug))
    .limit(1);

  // Fallback for mocked cases from the list view before the DB is populated
  const mockedCases: Record<string, any> = {
    "brand-experience-2024": {
      id: 991,
      slug: "brand-experience-2024",
      title: "10 trendów w web designie na 2024 rok, które musisz znać by wyprzedzić konkurencję",
      excerpt: "Wraz z postępem SI, autentyczność i storytelling wracają do łask z podwójną siłą.",
      content: `
         <p>Stworzenie zapadającej w pamięć strony to dzisiaj konieczność. Poniżej omawiamy <strong>kluczowe zjawiska</strong>, na które warto zwrócić uwagę.</p>
         <h2>1. Powrót autentyczności</h2>
         <p>Zakończyła się era bezdusznych korporacyjnych stron opartych na tanich wektorach z Freepika. Ludzie szukają w internecie ludzi. Zdjęcia prawdziwych pracowników, biura i naturalnych sytuacji zyskują przewagę. <strong>Nadszedł czas brutalnej szczerości w projektowaniu.</strong></p>
         <blockquote>
           "Użytkownicy w 2024 roku posiadają wbudowany radar na 'bullshit'. Bezbłędne, sztuczne lica stockowych modeli obniżają konwersję o 12%." – Badania NN/g
         </blockquote>
         <p>Dlatego staramy się u naszych klientów zawsze stawiać na indywidualne i surowe wręcz podejście do mediów.</p>
         <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop" alt="Przykładowe biuro i szczery web design" />
         <h2>2. Duża Typografia jako element interfejsu</h2>
         <p>Zamiast polegać w 100% na obrazkach, wykorzystaj słowa, by namalować obraz. Dobrze dobrane zmienne fonty (Variable Fonts) pozwalają oddać emocje i charakter brandy znacznie taniej niż drogie sesje zdjęciowe.</p>
      `,
      coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2670&auto=format&fit=crop",
      author: "Maciej",
      publishedAt: new Date("2024-03-15T12:00:00Z"),
    },
    "dlaczego-potrzebujesz-audytu-ux": {
      id: 992,
      slug: "dlaczego-potrzebujesz-audytu-ux",
      title: "Dlaczego Twoja strona potrzebuje audytu UX?",
      excerpt: "Niski czas spędzony na stronie bywa czesto objawem źle przemyślanej ścieżki poznawczej lub przeładowania interfejsu.",
      content: "<p>Artykuł w przygotowaniu...</p>",
      coverImage: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop",
      author: "Anna",
      publishedAt: new Date("2024-03-10T12:00:00Z"),
    }
  };

  const postData = post || mockedCases[resolvedParams.slug];

  if (!postData) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <BlogPostReader post={postData as any} />
      <Footer />
    </>
  );
}
