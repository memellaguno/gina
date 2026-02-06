"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");

    const revealNow = () => {
      const windowHeight = window.innerHeight;
      reveals.forEach((el) => {
        const elementTop = el.getBoundingClientRect().top;

        if (elementTop < windowHeight * 0.9) {
          el.classList.add("visible");
        }
      });
    }

    // 🔥 esperar a que el DOM de la página esté pintado
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        revealNow();
      });
    });

    window.addEventListener("scroll", revealNow);

    return () => {
      window.removeEventListener("scroll", revealNow);
    };
  }, [pathname]); // 👈 clave

  return null;
}
