import Link from "next/link";

import BlockRenderer from "@/components/BlockRenderer";
import { Page } from "@/sanity.types";
import { studioUrl } from "@/sanity/lib/api";
import Onboarding from "./Onboarding";

type PageBuilderPageProps = {
  page: Page;
  lang?: "es" | "en";
};

export default function PageBuilder({ page, lang = "es" }: PageBuilderPageProps) {
  if (page?.pageBuilder && page.pageBuilder.length > 0) {
    return (
      <>
        {page.pageBuilder.map((block: any, index: number) => (
          <BlockRenderer key={block._key} index={index} block={block} lang={lang} />
        ))}
      </>
    );
  }

  // If there are no blocks in the page builder.
  return <Onboarding />;
}
