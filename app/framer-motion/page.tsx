import Header from "@/components/Header";
import Footer from "@/components/Footer";
// import ArticleSection from "@/components/ArticleSection";
import TableOfContents from "@/components/TableOfContents";
import FramerMotionArticleSection from "./components/FramerMotionArticleSection";

const items = [
    { label: "layoutId for shared elements", href: "#layout-id" },
    { label: "Transform performance", href: "#transform-performance" },
    { label: "AnimatePresence detects unmount", href: "#animate-presence" },
    { label: "Motion values avoid re-renders", href: "#motion-values" },
    { label: "whileHover optimized listeners", href: "#while-hover" },
    { label: "Dynamic variants", href: "#dynamic-variants" },
    { label: "layout=\"position\"", href: "#layout-position" },
    { label: "useMotionValueEvent", href: "#motion-value-event" },
    { label: "useTime for time-based values", href: "#use-time" },
    { label: "useCycle for state toggling", href: "#use-cycle" },
];

function FramerMotionPage() {
    return (
        <div className="bg-[#F9FAFE] text-neutral-700 flex min-h-screen">
            <main className="w-[82vw] bg-white  ml-auto pl-12 pt-28">
                <div className="min-h-screen">
                    <TableOfContents title="Framer Motion's content" items={items} />
                </div>
                <FramerMotionArticleSection />
            </main>
        </div>
    );
}

export default FramerMotionPage;
