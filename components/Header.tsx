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
          D.
        </h1>
      </a>

      {!showOnlyTitle && (
        <ul className="px-1.5">
          <li>
            <Github className="w-5 h-5 text-neutral-400 hover:text-neutral-600 transition-colors duration-200" />
          </li>
        </ul>
      )}
    </header>
  );
}
