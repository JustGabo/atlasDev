"use client";
import Header from "@/components/Header";
import TableOfContents from "@/components/TableOfContents";
import { useEffect, useState } from "react";

const items = [
  { label: "React", href: "react", length: 12, isLink: true },
  { label: "JavaScript", href: "javascript", length: 6, isLink: true },
  { label: "Framer Motion", href: "framer-motion", length: 10, isLink: true },
  { label: "GSAP", href: "gsap", length: 10, isLink: true },
];

const data = [
  {
    id: 1,
    content:
      "This is a growing collection of discoveries gathered throughout my journey as a developer. Each entry represents a moment where a concept, behavior, or subtle detail suddenly made something click — turning what once felt like a rule to memorize into something I could actually understand.",
  },
  {
    id: 2,
    content:
      "Many of these insights come from debugging strange bugs, reading specifications, or noticing patterns that aren’t usually highlighted in tutorials. Over time, they formed a map of deeper understanding — small pieces of knowledge that reveal how things truly work beneath the surface of modern development.",
  },
];

export default function HomeContent() {
  const [showTitle, setShowTitle] = useState(false);
  const [show, setShow] = useState(false);
  const [showTableOfContent, setShowTableOfContent] = useState(false);

  useEffect(() => {
    setShowTitle(true);
    const showTimeOut = setTimeout(() => {
      setShow(true);
    }, 210);
    const TableTimeOut = setTimeout(() => {
      setShowTableOfContent(true);
    }, 400);

    return () => {
      clearTimeout(showTimeOut);
      clearTimeout(TableTimeOut);
    };
  }, []);

  return (
    <div className="bg-[#F9FAFE] text-neutral-700 flex min-h-screen">
      <main className="w-[55vw] bg-white  mx-auto pl-12 pt-32">
        <div className="flex flex-col gap-10 pr-14 mb-12">
          <Header showTitle={showTitle} />
          <div className="flex flex-col gap-4">
            {data.map((item, i) => (
              <p
                key={item.id}
                style={{
                  opacity: show ? 1 : 0,
                  transform: show ? "translateY(0)" : "translateY(10px)",
                  transition: "opacity 0.4s ease, transform 0.4s ease",
                  transitionDelay: `${i * 80}ms`, // stagger
                }}
                className="text-sm text-neutral-500 leading-relaxed"
              >
                {item.content}
              </p>
            ))}
          </div>
        </div>

        {showTableOfContent && (
          <TableOfContents
          hideHeader
          homeStagger
            items={items}
            className="w-full! pr-14"
            hideIndex
            hoverUnderline={false}
            hideTitle
            line
          />
        )}
      </main>
    </div>
  );
}



