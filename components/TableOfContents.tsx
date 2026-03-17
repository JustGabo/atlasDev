"use client";

import { Item } from "@/types";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Header from "./Header";

interface TableOfContentsProps {
  items: Item[];
  title?: string;
  className?: string;
  line?: boolean;
  hideIndex?: boolean;
  hideTitle?: boolean;
  hideHeader?: boolean;
  link?: boolean;
  hoverUnderline?: boolean;
  homeStagger?: boolean
}

export default function TableOfContents(
  {
    items,
    title,
    className,
    line,
    hideIndex,
    hideTitle,
    hideHeader,
    homeStagger,
    hoverUnderline = true,
  }: TableOfContentsProps,
) {
  const [show, setShow] = useState(false);
  const [showDotIndex, setShowDotIndex] = useState<number | null>(null);
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    setShowTitle(true);
    const id = setTimeout(() => {
      setShow(true);
    }, homeStagger ? 75 : 300);

    return () => {
      clearTimeout(id);
    };
  }, []);

  return (
    <div className="flex flex-col gap-3">
      {!hideHeader && (
        <div className="w-[50%]">
          <Header showOnlyTitle={true} showTitle={showTitle} />
        </div>
      )}
      <nav
        className={`mb-16 borde border-neutral-300 w-[47%] py-6 text-neutral-500 ${className}`}
      >
        {!hideTitle && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
            className={`text-sm font-semibold w-full  ${
              hideIndex ? "hidden" : "block"
            } uppercase tracking-wider mb-4`}
          >
            {title ? title : "Content"}
          </motion.p>
        )}
        {show && (
          <ol className="flex flex-col gap-5 w-full">
            {items.map((item, i) => (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.08,
                  ease: "easeOut",
                }}
                className="flex items-center gap-2 w-full"
              >
                <span
                  className={`text-sm  tabular-nums pt-px ${
                    hideIndex ? "hidden" : "block"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Link
                  href={item.href}
                  onMouseEnter={() => {
                    setShowDotIndex(i);
                  }}
                  onMouseLeave={() => {
                    setShowDotIndex(null);
                  }}
                  onClick={(e) => {
                    {
                      !item.isLink && e.preventDefault();
                    }
                    const target = document.querySelector(item.href);
                    if (target) {
                      target.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className={`text-sm whitespace-nowrap  underline-offset-2  decoration-neutral-300 transition-all duration-300 ${
                    hoverUnderline && "hover:underline"
                  }`}
                >
                  {item.label}
                </Link>

                <div className="w-full flex items-center relative">
                  <div
                    className={`absolute w-1.5 h-1.5 rounded-full bg-neutral-500 transition-all duration-200 ${
                      hoverUnderline === false && showDotIndex === i
                        ? "opacity-100 delay-150"
                        : "opacity-0 "
                    }`}
                  />
                  <div
                    className={`${
                      showDotIndex === i ? "w-[93%]" : "w-full delay-150"
                    } transition-all duration-150 ml-auto h-px bg-neutral-300 ${
                      line ? "block" : "hidden"
                    }`}
                  />
                  <p className="text-sm tabular-nums w-[4%] text-right">
                    {item.length}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        )}
      </nav>
    </div>
  );
}
