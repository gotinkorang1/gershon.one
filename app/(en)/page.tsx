import { serialiseJsonLd } from "@/lib/json-ld";
import { profilePageJsonLd } from "@/lib/seo";
import { PortfolioHome } from "@/components/portfolio-home";

export default function Home() {
  return (
    <>
      <PortfolioHome />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: serialiseJsonLd(profilePageJsonLd("en")) }}
      />
    </>
  );
}
