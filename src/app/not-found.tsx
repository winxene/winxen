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
  return (
    <PageLayout
      title="Winxen's Portfolio Terminal - 404 Not Found"
      contentDescription="The page you are looking for does not exist."
    >
      {showContent && (
        <div className="flex flex-col items-center justify-center animate-fade-in-up min-w-full">
          <div className="relative items-left justify-center space-y-0 top-24 md:top-0 lg:space-y-4 w-[70%] mx-auto ">
            <TerminalHistoryPane currentPath={path} text="cd help" />
          </div>
          <AsciiArt src="/ascii/404.txt" />
        </div>
      )}

      <TerminalPane setShowContent={setShowContent} />
    </PageLayout>
  );
};

export default NotFound;
