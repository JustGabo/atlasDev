import { Github } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  showTitle?: boolean;
  showOnlyTitle?: boolean;
}

export default function Header({ showTitle, showOnlyTitle }: HeaderProps) {
  return (
    <header className="flex items-center justify-between">
      <a href="/">
        <h1
          style={{
            opacity: showTitle ? 1 : 0,
            transform: showTitle ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
            transitionDelay: `80ms`, // stagger
          }}
          className="-tracking-widest text-neutral-700 text-lg font-mono font-semibold "
        >
          <span className="mr-px">A</span>D.
        </h1>
      </a>

      {!showOnlyTitle && (
        <ul
          style={{
            opacity: showTitle ? 1 : 0,
            transform: showTitle ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
            transitionDelay: `80ms`, // stagger
          }}
          className="px-1.5 flex items-center gap-3 "
        >
          <li>
            <a href="https://github.com/JustGabo/atlasDev" target="_blank">
              <p className="hover:text-neutral-600 transition-colors duration-200 text-neutral-400 text-sm tracking-wider">
                Github
              </p>
            </a>
          </li>

          <li>
            <a href="https://x.com/KetchaoDev" target="_blank">
              <p className="hover:text-neutral-600 transition-colors duration-200 text-neutral-400 text-sm tracking-wider">
                Twitter
              </p>
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
