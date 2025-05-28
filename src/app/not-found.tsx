"use client";

import { FC, useState } from "react";
import PageLayout from "./page-layout";
import TerminalPane from "@/components/ui/TerminalPane";
import AsciiArt from "@/components/assets/AsciiArt";

const NotFound: FC = () => {
  const [showContent, setShowContent] = useState(true);
  return (
    <PageLayout
      title="Winxen's Portfolio Terminal - 404 Not Found"
      contentDescription="The page you are looking for does not exist."
    >
      {showContent && <AsciiArt src="/ascii/404.txt" />}
      <TerminalPane setShowContent={setShowContent} />
    </PageLayout>
  );
};

export default NotFound;
