"use client"
import Header from "@/components/Header";
import ArticleSection from "./components/ArticleSection";
import TableOfContents from "@/components/TableOfContents";

const items = [
    { label: "React.memo and Object Props", href: "#memo-objects" },
    { label: "React.memo and Function Props", href: "#memo-functions" },
    { label: "Custom Comparators in React.memo", href: "#memo-comparators" },
    // { label: "The mental model", href: "#mental-model" },
    { label: "React Strict Mode", href: "#strict-mode" },
    { label: "useEffect vs useLayoutEffect", href: "#effect-vs-layout" },
    { label: "await and State Update Batching", href: "#batching" },
    { label: "Derived State from Props", href: "#derived-state" },
    {
        label: "Abort Controllers and Race Conditions",
        href: "#abort-controllers",
    },
    // { label: "Controlled Components", href: "#controlled-components" },
    // { label: "Lesser-known facts about useReducer", href: "#use-reducer" },
    {
        label: "Lesser-known facts about useMemo and useCallback",
        href: "#memo-callback-facts",
    },
    { label: "useTransition", href: "#use-transition" },
    { label: "Suspense and lazy", href: "#suspense-lazy" },
    { label: "useFormState and useOptimistic", href: "#form-state-optimistic" },
];

function ReactPage() {
    return (
        <div className="bg-[#F9FAFE] text-neutral-700 flex min-h-screen">
            <main className="w-[82vw] bg-white  ml-auto pl-12 pt-28">
                <div className="min-h-screen">
                    <TableOfContents title="React's content" items={items} />
                </div>
                <ArticleSection />
            </main>
        </div>
    );
}

export default ReactPage;
