import Header from "@/components/Header";
import Footer from "@/components/Footer";
// import ArticleSection from "@/components/ArticleSection";
import TableOfContents from "@/components/TableOfContents";
import GsapArticleSection from "./components/GsapArticleSection";

const items = [
    { label: "Lazy rendering", href: "#lazy-rendering" },
    { label: "Quicksetter", href: "#quicksetter" },
    { label: "Position parameter", href: "#position-parameter" },
    { label: "Autoalpha", href: "#autoalpha" },
    { label: "Overwrite", href: "#overwrite" },
    { label: "invalidate()", href: "#invalidate" },
    { label: "Animate arrays", href: "#animate-arrays" },
    { label: "revert()", href: "#revert" },
    { label: "matchMedia()", href: "#match-media" },
    { label: "Stagger position", href: "#stagger-position" },
];

function GsapPage() {
    return (
        <div className="bg-[#F9FAFE] text-neutral-700 flex min-h-screen">
            <main className="w-[82vw] bg-white  ml-auto pl-12 pt-28">
                <div className="min-h-screen">
                    <TableOfContents title="Gsap's content" items={items} />
                </div>
                <GsapArticleSection />
            </main>
        </div>
    );
}

export default GsapPage;
