import { Github } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface HeaderProps {
  showTitle?: boolean;
  showOnlyTitle?: boolean;
}

export default function Header({ showTitle, showOnlyTitle }: HeaderProps) {
  return (
    <header className="flex items-center justify-between">
      {showTitle && (
        <motion.a
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
            delay: 0.2,
          }}
          href="/"
        >
          <h1
            className="-tracking-widest text-neutral-700 text-lg font-mono font-semibold "
          >
            <span className="mr-px">A</span>D.
          </h1>
        </motion.a>
      )}

      {!showOnlyTitle && (
        <motion.ul
        initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
            delay: 0.2,
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
        </motion.ul>
      )}
    </header>
  );
}
