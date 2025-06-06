"use client";

import { FC, useState } from "react";
import PageLayout from "./page-layout";
import TerminalPane from "@/components/ui/TerminalPane";
import AsciiArt from "@/components/assets/AsciiArt";
import TerminalHistoryPane from "@/components/ui/Terminal/TerminalHistoryPane";
import { usePathname } from "next/navigation";

const NotFound: FC = () => {
  const [showContent, setShowContent] = useState(true);
  const path = "~" + usePathname();
  const commandText = "cd not-found";
  return (
    <PageLayout
      title="Winxen's Portfolio Terminal - 404 Not Found"
      contentDescription="The page you are looking for does not exist."
    >
      {showContent && (
        <div className="flex flex-col items-center justify-center animate-fade-in-up min-w-full space-y-0 top-24 md:top-0 ">
          <div className="relative items-left justify-center lg:space-y-4 w-[70%] mx-auto ">
            <TerminalHistoryPane currentPath={path} text={commandText} />
          </div>
          <p className="relative text-error text-justify text-sm md:text-base mx-auto w-[70%]">
            404 Not Found - The page you are looking for does not exist.
          </p>
          <AsciiArt src="/ascii/404.txt" />
        </div>
      )}

      <TerminalPane setShowContent={setShowContent} />
    </PageLayout>
  );
};

export default NotFound;
