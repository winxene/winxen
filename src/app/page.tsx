"use client";

import PageLayout from "./page-layout";
import AsciiArt from "@/components/assets/AsciiArt";
import SpotifyEmbed from "@/components/assets/SpotifyEmbed";
import ReadmeCard from "@/components/ui/ReadmeCard";
import TerminalPane from "@/components/ui/TerminalPane";
import { useState } from "react";

const Home = () => {
  const [showContent, setShowContent] = useState(true);

  return (
    <PageLayout
      title="Winxen's Portfolio Terminal"
      contentDescription="Winxen personal website. Contains projects and information about me."
    >
      {showContent && (
        <ReadmeCard>
          <div className="flex flex-col-reverse xl:flex-row space-y-4 space-x-0 xl:space-x-10 justify-center">
            <div className="flex flex-col space-y-4 text-left">
              <p>
                A passionate{" "}
                <span className="text-link">computer engineer </span>
                driven by tech innovation. Loves{" "}
                <span className="text-title">
                  JRPG games, Computers, Mobile Apps, and IoT
                </span>
                . Currently learning mandarin and aiming to pass HSK 4.
              </p>
              <div className="flex flex-col pt-0 xl:pt-20 items-center space-y-0 xl:space-y-10 xl:items-start justify-center">
                <p> My This Week's top jams:</p>
                <SpotifyEmbed />
              </div>
            </div>
            <AsciiArt src="/ascii/nemu-miyao.txt" />
          </div>
          <p className="mb-4">
            This whole website is based on my terminal look which you can access
            from my{" "}
            <a
              href="https://github.com/winxene/ikura"
              className="text-link hover:text-linkAlt"
            >
              dotfiles
            </a>
            . You can use the “interactive” terminal to navigate. Type{" "}
            <a href="/help" className="text-link hover:text-linkAlt">
              help
            </a>{" "}
            to see accepted commands.
          </p>
        </ReadmeCard>
      )}
      <TerminalPane setShowContent={setShowContent} />
    </PageLayout>
  );
};

export default Home;
