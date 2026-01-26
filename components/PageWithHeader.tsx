import Header from "./Header";
import PageBuilderPage from "./PageBuilder";
import Footer from "./Footer";

type PageWithHeaderProps = {
  page: any;
  lang?: "es" | "en";
};

export default function PageWithHeader({ page, lang = "es" }: PageWithHeaderProps) {
  return (
    <div className="bg-muted">
      <Header headerTheme={page.headerTheme || "transparent"} lang={lang} />
      <PageBuilderPage page={page as any} lang={lang} />
      <Footer lang={lang} />
    </div>
  );
}
