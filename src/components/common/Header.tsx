"use client";

import { FC } from "react";

const Header: FC = () => {
  return (
    <header className="fixed min-w-full flex flex-row px-[20%] py-4 bg-bg space-x-5 md:space-x-auto justify-between items-center top-0 shadow-md z-50">
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
