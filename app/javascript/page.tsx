import Header from "@/components/Header";
import Footer from "@/components/Footer";
// import ArticleSection from "@/components/ArticleSection";
import TableOfContents from "@/components/TableOfContents";
import JsArticleSection from "./components/JsArticleSection";

const items = [
    { label: "Hoisting & Shadowing", href: "#hoisting-shadowing" },
    { label: "Temporal Dead Zone", href: "#tdz" },
    { label: "Spread copy is shallow", href: "#spread-shallow" },
    { label: "Object.assign is shallow", href: "#object-assign-shallow" },
    { label: "Functions are objects", href: "#functions-objects" },
    { label: "Promise.then() vs setTimeout", href: "#promise-microtask" },
];

function JavaScriptPage() {
    return (
        <div className="bg-[#F9FAFE] text-neutral-700 flex min-h-screen">
            <main className="w-[82vw] bg-white  ml-auto pl-12 pt-28">
                <div className="min-h-screen">
                    <TableOfContents title="JavaScript's Content" items={items} />
                </div>
                <JsArticleSection />
            </main>
        </div>
    );
}

export default JavaScriptPage;
