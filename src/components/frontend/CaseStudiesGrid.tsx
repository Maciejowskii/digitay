"use client";

import { motion } from "framer-motion";
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

  return (
    <div className="flex flex-col gap-0">
      {caseStudies.map((study, i) => (
        <CaseStudyRow
          key={study.id}
          study={study}
          index={i}
          getTags={getTags}
        />
      ))}

      {/* View all link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex justify-center mt-12"
      >
        <Link
          href="/case-study"
          className="group inline-flex items-center gap-3 border border-white/15 text-white/70 px-8 py-4 rounded-full font-medium hover:border-primary/40 hover:text-white transition-all duration-300"
        >
          Zobacz wszystkie realizacje
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </motion.div>
    </div>
  );
};

function CaseStudyRow({
  study,
  index,
  getTags,
}: {
  study: CaseStudy;
  index: number;
  getTags: (tags: unknown) => string[];
}) {
  const tags = getTags(study.tags);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
    >
      <Link
        href={`/case-study/${study.slug}`}
        className="group block border-t border-white/5 py-8 md:py-10 transition-colors duration-500 hover:bg-white/[0.02]"
      >
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
          {/* Index number */}
          <span className="hidden md:block text-white/10 font-heading font-black text-5xl w-16 shrink-0 tabular-nums group-hover:text-primary/20 transition-colors duration-500">
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Thumbnail */}
          <div className="relative w-full md:w-48 lg:w-60 aspect-video md:aspect-[4/3] shrink-0 rounded-xl overflow-hidden">
            <Image
              src={
                study.coverImage ||
                "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
              }
              alt={study.title}
              fill
              sizes="(max-width: 768px) 100vw, 240px"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              placeholder="blur"
              blurDataURL={blurDataUrl}
              loading="lazy"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500 flex items-center justify-center">
              <ArrowUpRight className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0" />
            </div>
          </div>

          {/* Text content */}
          <div className="flex-1 min-w-0">
            <p className="text-primary text-xs tracking-widest mb-2 uppercase">
              {study.clientName}
            </p>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold text-white tracking-tight leading-tight group-hover:text-primary transition-colors duration-300">
              {study.title}
            </h3>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {tags.slice(0, 4).map((tag, i) => (
                  <span
                    key={i}
                    className="text-[11px] text-white/30 border border-white/10 px-3 py-1 rounded-full group-hover:border-primary/20 group-hover:text-white/50 transition-colors duration-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Arrow */}
          <div className="hidden md:flex items-center">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-all duration-300">
              <ArrowUpRight className="w-5 h-5 text-white/40 group-hover:text-white transition-colors duration-300" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
