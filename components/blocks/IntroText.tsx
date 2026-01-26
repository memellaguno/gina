import BlockContainer from "../BlockContainer";
import { IntroText as IntroTextType } from "@/sanity.types";
import { cn } from "@/lib/utils";

type Props = {
  block: IntroTextType;
  lang?: "es" | "en";
};

export default function IntroText({ block, lang = "es" }: Props) {
  const eyebrow = lang === "en" && block.eyebrowEn ? block.eyebrowEn : block.eyebrow;
  const heading = lang === "en" && block.headingEn ? block.headingEn : block.heading;

  return (
    <section className="w-full bg-transparent">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center px-4 py-12 text-center md:px-8 md:py-20">
        {eyebrow && (
          <p className="mb-8 text-sm font-medium text-secondary lg:text-base">
            {eyebrow}
          </p>
        )}
        {heading && (
          <h2 className="max-w-5xl font-display text-4xl uppercase text-secondary md:text-5xl lg:text-6xl">
            {heading}
          </h2>
        )}
      </div>
    </section>
  );
}
