"use server";

import { db } from "@/db";
import { blogPosts } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

function extractImagesFromPexels(data: any): string[] {
  if (!data || !data.photos || data.photos.length === 0) return [];
  return data.photos.map((photo: any) => photo.src.large);
}

// Funkcja pomocnicza do pobierania grafiki z Pexels na podstawie słowa kluczowego
async function fetchPexelsImage(query: string): Promise<string | null> {
  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) {
    console.error("PEXELS_API_KEY is missing!");
    return null;
  }
  try {
    const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`, {
      headers: {
        Authorization: apiKey
      }
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.photos?.[0]?.src?.large || null;
  } catch (e) {
    console.error("Failed to fetch image from Pexels", e);
    return null;
  }
}

export async function generateAndScheduleBlog(data: {
  topic: string;
  keywords: string;
  publishedAt: Date;
}) {
  try {
    const openApiKey = process.env.OPENAI_API_KEY;
    if (!openApiKey) {
      return { success: false, error: "Brak klucza OPENAI_API_KEY w zmiennych środowiskowych." };
    }

    const { topic, keywords, publishedAt } = data;

    // Losowy autor
    const authors = ["Jakub Wolert", "Maciej Tyra", "Kacper Wieraszka"];
    const randomAuthor = authors[Math.floor(Math.random() * authors.length)];

    // Fetch existing blogs for backlinking context
    const existingBlogs = await db.query.blogPosts.findMany({
      columns: { slug: true, title: true },
      limit: 5,
    });
    const blogLinksList = existingBlogs.map(b => `- /blog/${b.slug} (${b.title})`).join('\n');

    // 1. Zbudowanie zaawansowanego zapytania do AI
    const prompt = `Napisz ekspercki, w 100% naturalnie brzmiący artykuł na bloga na temat: "${topic}".
Słowa kluczowe (uwzględnij je naturalnie w tekście): ${keywords || "brak"}.

Wymagania dla artykułu:
- Długość: Przynajmniej 10 obszernych akapitów. Artykuł musi być długi (przynajmniej 1000 słów), wyczerpujący temat i bardzo bogaty w treść.
- Język: Polski, wysoce poprawny, ludzki, przystępny, unikający urzędowego tonu czy sztuczności AI.
- Formatowanie: Użyj CZYSTEGO HTML! Nie używaj Markdown. Używaj poprawnej struktury znaczników <h2>, <h3>, <p>, <strong>, <ul>, <li>.
- Backlinkowanie: Wpleć w tekst dokładnie 2 lub 3 naturalnie brzmiące linki HTML ze znacznikiem <a>. 
Masz do wyboru poniższą listę URl-i istniejących podstron oraz artykułów na naszym portalu:

### Podstrony usługowe (zawsze dostępne):
- /uslugi/tworzenie-stron (Tworzenie stron WWW / Web Dev)
- /uslugi/sklepy-internetowe (Sklepy internetowe e-commerce)
- /uslugi/pozycjonowanie-seo (Pozycjonowanie stron SEO)
- /uslugi/kampanie-google-ads (Kampanie linków sponsorowanych Google Ads)
- /uslugi/reklamy-facebook-ads (Reklamy w Social Media / Facebook Ads)

### Inne artykuły blogowe (do linkowania wewnętrznego):
${blogLinksList || "Brak (to pierwszy artykuł)"}

Używaj WYŁĄCZNIE tych linków (jako href="..." w znaczniku <a>) i zrób to tak, aby miały idealny sens w treści. Zawsze staraj się wrzucić chociaż 1 link do innej podstrony blogowej (jeśli istnieje) oraz 1 link do wybranej usługi. NIE zmyślaj linków!
- Miejsca na obrazy: W równych odstępach tekstu, zaraz po 3 różnych nagłówkach wstaw specjalne markery: [IMAGE_1], [IMAGE_2] oraz [IMAGE_3]. Ważne: markery obrazów [IMAGE_X] MUSZĄ być w nowej linii, jako osobne bloki, NIE MOGĄ znajdować się wewnątrz znaczników <p> ani żadnych innych.

Zwróć odpowiedź w formacie JSON zawierającym DOKŁADNIE 5 pól:
1. "title" - wciągający i klikalny nagłówek H1 (bez znaczników).
2. "slug" - przyjazny url np. "dlaczego-warto-zalozyc-bloga".
3. "excerpt" - krótkie, 2-3 zdaniowe zachęcające streszczenie do podglądu kafelka.
4. "content" - CAŁA treść wpisu w postaci surowego HTML gotowego do osadzenia (zawierająca markery [IMAGE_X] - pamiętaj, by nie wstawiać ich w tagi <p>).
5. "imageQueries" - tablica 3 BARDZO prostych, pojedynczych słów po ANGIELSKU dopasowanych do tematów obrazów (np. "business", "coding", "office", "design"). Unikaj rozbudowanych fraz, aby API zwracało ładne zdjęcia!`;

    // 2. Wysłanie zapytania do OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openApiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("OpenAI fail:", err);
      return { success: false, error: "Błąd komunikacji z OpenAI w trakcie generowania wpisu." };
    }

    const aiData = await response.json();
    const resultObj = JSON.parse(aiData.choices[0].message.content);

    let finalContent = resultObj.content;
    let coverImage = "";

    // 3. Pexels Images
    if (resultObj.imageQueries && Array.isArray(resultObj.imageQueries)) {
      for (let i = 0; i < resultObj.imageQueries.length; i++) {
        const query = resultObj.imageQueries[i];
        const imageUrl = await fetchPexelsImage(query);
        const imageId = `IMAGE_${i + 1}`;
        
        if (imageUrl) {
          // Zastąp markery obrazkami HTML (stylowane jako block)
          const imgMarkup = `
            <figure class="my-12 flex flex-col items-center">
              <img src="${imageUrl}" alt="${query}" class="w-full h-auto rounded-xl shadow-lg border border-white/10" />
            </figure>
          `;
          // Używamy RegEx by uwzględnić format [IMAGE_1: słowo] i [IMAGE_1],
          // a także otaczające opcjonalne <p> tagi, aby zapobiec hydration error z zagnieżdżonym <figure>
          const regex = new RegExp(`(?:<p>\\s*)?\\[${imageId}(:[^\\]]*)?\\](?:\\s*</p>)?`, "g");
          finalContent = finalContent.replace(regex, imgMarkup);
          
          if (i === 0) {
            coverImage = imageUrl; // Ustaw pierwsze zdjęcie jako okładkę posta
          }
        } else {
          // Remove marker if no image found
          const regex = new RegExp(`(?:<p>\\s*)?\\[${imageId}(:[^\\]]*)?\\](?:\\s*</p>)?`, "g");
          finalContent = finalContent.replace(regex, "");
        }
      }
    }

    // Dodatkowy fallback na zdjęcie profilowe z Pexels dla ogólnego zapytania z "topic" gdy zepsuje się API
    if (!coverImage) {
      coverImage = await fetchPexelsImage(topic.substring(0,20)) || "";
    }

    // 4. Zapis do bazy
    await db.insert(blogPosts).values({
      title: resultObj.title,
      slug: resultObj.slug || `post-${Date.now()}`,
      excerpt: resultObj.excerpt,
      content: finalContent,
      coverImage: coverImage,
      author: randomAuthor,
      publishedAt: publishedAt,
    });

    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Server Action AI Error:", error);
    return { success: false, error: "Wystąpił nieoczekiwany błąd. Sprawdź logi serwera." };
  }
}

export async function createManualBlog(data: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  publishedAt: Date;
}) {
  try {
    await db.insert(blogPosts).values({
      title: data.title,
      slug: data.slug || `post-${Date.now()}`,
      excerpt: data.excerpt,
      content: data.content,
      coverImage: data.coverImage,
      author: data.author,
      publishedAt: data.publishedAt,
    });

    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Manual Blog Create Error:", error);
    return { success: false, error: "Wystąpił nieoczekiwany błąd podczas zapisywania do bazy." };
  }
}
