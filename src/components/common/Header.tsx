"use client";

import { useTheme } from "@/contexts/ThemeProvider";
import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const Header: FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed min-w-full flex flex-row px-[20%] py-4 bg-bg space-x-5 md:space-x-auto justify-between items-center top-0 shadow-md z-50">
      <a
        href="/"
        className="text-xl md:text-3xl font-bold text-title hover:text-titleAlt"
      >
        Winxen
      </a>
      <nav>
        <ul className="flex space-x-4 text-sm md:text-xl md:space-x-12 font-normal text-primary items-center">
          <li>
            <a href="/about-me" className="hover:text-primaryAlt">
              About Me
            </a>
          </li>
          <li>
            <a href="/projects" className="hover:text-primaryAlt">
              Projects
            </a>
          </li>
          <li>
            <button
              onClick={toggleTheme}
              className="hover:text-primaryAlt flex items-center justify-center transition-colors duration-200"
              aria-label="Switch Theme"
            >
              <FontAwesomeIcon
                icon={theme === "dark" ? faMoon : faSun}
                className="w-5 h-5"
              />
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
