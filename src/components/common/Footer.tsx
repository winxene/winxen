"use client";

import { FC } from "react";

const Footer: FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bottom-0 w-full px-6 md:px-0 py-4 md:py-0 my-5 text-center text-xs md:text-sm text-primary">
      <a href="https://github.com/winxene/winxen">
        © {year} Winxen. All rights reserved.
      </a>
    </footer>
  );
};

export default Footer;
