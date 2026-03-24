"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Wymuszenie braku płynnego scrollowania przy zmianie strony.
    // Timeout pozwala Next.js najpierw wyrenderować nową stronę.
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    }, 10);
  }, [pathname]);

  return null;
}
