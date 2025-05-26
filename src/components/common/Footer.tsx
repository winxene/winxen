"use client";

import { FC } from "react";

const Footer: FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="fixed bottom-0 w-3/5 p-4 text-center text-xs md:text-sm text-primary animate-fade-in-up">
      <a href="https://github.com/winxene/winxen">
        © {year} Winxen. All rights reserved.
      </a>
    </footer>
  );
};

export default Footer;
