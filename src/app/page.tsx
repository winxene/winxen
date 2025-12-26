"use client";

import { FC, useState } from "react";
import PageLayout from "./page-layout";
import AsciiArt from "@/components/assets/AsciiArt";
import SpotifyEmbed from "@/components/assets/SpotifyEmbed";
import ReadmeCard from "@/components/ui/ReadmeCard";
import TerminalPane from "@/components/ui/TerminalPane";
import { useTheme } from "@/contexts/ThemeProvider";

const Home: FC = () => {
  const [showContent, setShowContent] = useState(true);
  const { theme } = useTheme();

  const asciiSrc =
    theme === "light" ? "/ascii/nemu-miyao-light.txt" : "/ascii/nemu-miyao.txt";

  return (
    <PageLayout
      hideDuringLoad
    >
      {showContent && (
        <ReadmeCard>
          <div className="flex flex-col-reverse md:flex-row  space-x-0 justify-between items-center md:items-start min-w-0">
            <div className="flex flex-col space-y-4 text-center md:text-left w-full md:w-[35%] flex-shrink-0">
              <p className="text-sm md:text-base">
                A passionate{" "}
                <span className="text-link">computer engineer </span>
                driven by tech innovation. Loves{" "}
                <span className="text-title">
                  JRPG games, Computers, Mobile Apps, and IoT
                </span>
                . Currently learning mandarin and aiming to pass HSK 4.
              </p>
              <div className="flex flex-col pt-0 md:pt-20 items-center space-y-0 md:space-y-8 justify-center min-w-0">
                <p className="text-sm md:text-base"> My this week's top jam:</p>
                <SpotifyEmbed />
              </div>
            </div>
            <div className="flex justify-center md:justify-end w-[65%]">
              <AsciiArt src={asciiSrc} />
            </div>
          </div>
          <p className="my-4 text-sm md:text-base">
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
