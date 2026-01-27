"use client";

import { useEffect } from "react";

export default function RevealOnScroll() {
  useEffect(() => {
    const reveals = document.querySelectorAll<HTMLElement>(".reveal");

    const revealOnScroll = () => {
      const windowHeight = window.innerHeight;

      reveals.forEach((el) => {
        const elementTop = el.getBoundingClientRect().top;

        if (elementTop < windowHeight * 0.85) {
          el.classList.add("visible");
        }
      });
    };

    revealOnScroll();
    window.addEventListener("scroll", revealOnScroll);

    return () => window.removeEventListener("scroll", revealOnScroll);
  }, []);

  return null;
}