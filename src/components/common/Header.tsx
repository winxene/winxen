"use client";

import { FC } from "react";

const Header: FC = () => {
  return (
    <header className="flex flex-row px-0 md:px-24 2xl:px-96 space-x-5 md:space-x-24 xl:space-x-32 justify-center items-center fixed top-0 min-w-full py-4 shadow-md animate-fade-in-up">
      <a
        href="/"
        className="text-xl md:text-3xl font-bold text-title hover:text-titleAlt"
      >
        Winxen
      </a>
      <nav>
        <ul className="flex space-x-4 text-sm md:text-xl md:space-x-12 font-normal text-primary">
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
        </ul>
      </nav>
    </header>
  );
};

export default Header;
