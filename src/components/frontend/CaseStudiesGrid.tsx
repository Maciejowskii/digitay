"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type CaseStudy = {
  id: number;
  slug: string;
  clientName: string;
  title: string;
  coverImage: string | null;
  tags: unknown;
};

const blurDataUrl =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAZdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjbQg61aAAAADUlEQVQyV2P4//8/AwAI/AL+X1oOigAAAABJRU5ErkJggg==";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 20 },
  },
};

export const CaseStudiesGrid = ({
  caseStudies,
}: {
  caseStudies: CaseStudy[];
}) => {
  const getTags = (tagsRaw: unknown): string[] => {
    if (Array.isArray(tagsRaw)) return tagsRaw as string[];
    if (typeof tagsRaw === "string") {
      try {
        return JSON.parse(tagsRaw);
      } catch {
        return [];
      }
    }
    return [];
  };

  if (caseStudies.length === 0) {
    return (
      <div className="py-20 text-center text-white/30 text-sm tracking-widest">
        Brak realizacji do pokazania
      </div>
    );
  }

  // Masonry layout: first card large, next two side by side
  const featured = caseStudies[0];
  const secondary = caseStudies.slice(1, 3);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="flex flex-col gap-6"
    >
      {/* Featured large card */}
      {featured && (
        <motion.div variants={itemVariants} className="group">
          <Link
            href={`/case-study/${featured.slug}`}
            className="block relative overflow-hidden rounded-2xl"
          >
            <div className="relative w-full aspect-[16/8] overflow-hidden rounded-2xl">
              <Image
                src={
                  featured.coverImage ||
                  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
                }
                alt={featured.title}
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                placeholder="blur"
                blurDataURL={blurDataUrl}
                priority
              />
            </div>

            <div className="mt-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-white tracking-tight leading-tight">
                  {featured.title}
                </h3>
                <div className="flex items-center gap-3 mt-3">
                  {getTags(featured.tags)
                    .slice(0, 3)
                    .map((tag, i) => (
                      <span
                        key={i}
                        className="text-xs text-white/40 tracking-wide"
                      >
                        {tag}
                        {i < Math.min(getTags(featured.tags).length, 3) - 1 &&
                          ","}
                      </span>
                    ))}
                </div>
              </div>
              <p className="text-white/50 text-sm max-w-sm">
                Klient: {featured.clientName}
              </p>
            </div>
          </Link>
        </motion.div>
      )}

      {/* Secondary cards - side by side */}
      {secondary.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {secondary.map((study) => (
            <motion.div
              key={study.id}
              variants={itemVariants}
              className="group"
            >
              <Link
                href={`/case-study/${study.slug}`}
                className="block relative overflow-hidden rounded-2xl"
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src={
                      study.coverImage ||
                      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2670&auto=format&fit=crop"
                    }
                    alt={study.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    placeholder="blur"
                    blurDataURL={blurDataUrl}
                    loading="lazy"
                  />
                </div>

                <div className="mt-5">
                  <h3 className="text-xl md:text-2xl font-heading font-bold text-white tracking-tight leading-tight">
                    {study.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-2">
                    {getTags(study.tags)
                      .slice(0, 2)
                      .map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs text-white/40 tracking-wide"
                        >
                          {tag}
                          {i < Math.min(getTags(study.tags).length, 2) - 1 &&
                            ","}
                        </span>
                      ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      {/* View all link */}
      <motion.div
        variants={itemVariants}
        className="flex justify-center mt-8"
      >
        <Link
          href="/case-study"
          className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all duration-300"
        >
          Zobacz wszystkie realizacje
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </motion.div>
  );
};
