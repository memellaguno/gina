import BlockContainer from "../BlockContainer";
import { IntroText as IntroTextType } from "@/sanity.types";
import { cn } from "@/lib/utils";

type Props = {
  block: IntroTextType;
  lang?: "es" | "en";
};

//HOME /BREAKING /SHAPING

export default function IntroText({ block, lang = "es" }: Props) {
  const eyebrow = lang === "en" && block.eyebrowEn ? block.eyebrowEn : block.eyebrow;
  const heading = lang === "en" && block.headingEn ? block.headingEn : block.heading;

  

  return (
    <section className="w-full bg-transparent">
      <div className="mx-auto flex w-full max-w-[1900px] flex-col items-center px-4 py-12 text-center md:px-8 md:py-20">
        {eyebrow && (
          <p className="mb-8 text-sm font-medium text-primary lg:text-base">
            {eyebrow}
          </p>
        )}
        {heading && (
          <h2 className={cn("max-w-[1200px] font-display text-4xl uppercase text-primary md:text-5xl lg:text-6xl",
            !eyebrow && "max-w-[1000px] mb-4")}>
            {heading}
          </h2>
        )}
        {block.eyebrowEn.length==0 && (
        <p className="mb-8 max-w-md text-sm small reveal md:text-1xl lg:text-2xl">She has built her legacy by bridging <b>business and creativity, education and opportunity, women and leadership</b>
        </p>)}
      </div>
    </section>
  );
}
