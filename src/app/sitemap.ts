import type { MetadataRoute } from 'next';
import { db } from '@/db';
import { services, caseStudies, blogPosts } from '@/db/schema';
import { eq, isNotNull } from 'drizzle-orm';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://digitay.pl'; // Replace with final URL if no env

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Static Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/o-nas`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/kontakt`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/uslugi`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/case-study`, // Zbiorcza strona case-studies
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  try {
    // 2. Dynamic DB Queries
    const [publishedServices, publishedCases, publishedPosts] = await Promise.all([
      db.select({ slug: services.slug, updatedAt: services.updatedAt }).from(services).where(eq(services.isPublished, true)),
      db.select({ slug: caseStudies.slug, updatedAt: caseStudies.updatedAt }).from(caseStudies).where(eq(caseStudies.isPublished, true)),
      db.select({ slug: blogPosts.slug, updatedAt: blogPosts.updatedAt }).from(blogPosts).where(isNotNull(blogPosts.publishedAt)),
    ]);

    // Format for Sitemap
    const dynamicServices: MetadataRoute.Sitemap = publishedServices.map((service) => ({
      url: `${BASE_URL}/uslugi/${service.slug}`,
      lastModified: service.updatedAt,
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

    const dynamicCases: MetadataRoute.Sitemap = publishedCases.map((cs) => ({
      url: `${BASE_URL}/case-study/${cs.slug}`,
      lastModified: cs.updatedAt,
      changeFrequency: 'monthly',
      priority: 0.8,
    }));

    const dynamicPosts: MetadataRoute.Sitemap = publishedPosts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'daily',
      priority: 0.7,
    }));

    return [
      ...staticRoutes,
      ...dynamicServices,
      ...dynamicCases,
      ...dynamicPosts,
    ];

  } catch (error) {
    console.error("Sitemap Generation Error:", error);
    // Fallback to static if DB fails during build/runtime
    return staticRoutes;
  }
}
