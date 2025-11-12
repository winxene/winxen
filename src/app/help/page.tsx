"use client";

import TerminalPane from "@/components/ui/TerminalPane";
import { FC, useState } from "react";
import PageLayout from "../page-layout";
import ReadmeCard from "@/components/ui/ReadmeCard";
import TerminalHistoryPane from "@/components/ui/Terminal/TerminalHistoryPane";
import { usePathname } from "next/navigation";

const Help: FC = () => {
  const [showContent, setShowContent] = useState(true);
  const path = "~" + usePathname();
  return (
    <PageLayout>
      {showContent && (
        <div className="flex flex-col items-center justify-center animate-fade-in-up min-w-full text-sm md:text-base">
          <div className="relative items-left justify-center space-y-0 top-24 md:top-0 lg:space-y-4 w-[70%] mx-auto ">
            <TerminalHistoryPane currentPath={path} text="cd help" />
          </div>
          <ReadmeCard>
            <div className="flex flex-col space-y-4 text-left justify-center">
              <p className="text-title">About "Interactive" Terminal</p>
              <p>
                This website navigates using bash script. Here are some of the
                supported bash scripts that you can use here.
              </p>
              <ul className="list-disc pl-6">
                <li>
                  <span className="text-link">cd</span>: changes directory. Use
                  this to navigate between pages.{" "}
                  <span className="font-bold">cd</span> followed up by the{" "}
                  <span className="font-bold">desired page name </span> to
                  navigate to the next page. cd followed up by{" "}
                  <span className="font-bold"> ..</span> to back and{" "}
                  <span className="font-bold">cd</span> (without other command)
                  will navigate back to the home page.
                </li>
                <li>
                  <span className="text-link">clear</span>: clears the terminal
                  output.
                </li>
                <li>
                  <span className="text-link">ls</span>: lists all available
                  pages.
                </li>
                <li>
                  <span className="text-link">help</span>: shows this README.md.
                </li>
              </ul>

              <p className="text-title mt-10">List of the pages:</p>
              <ul className="list-disc pl-6">
                <li>
                  <a href="/about-me" className="text-link">
                    /about-me
                  </a>
                  : Facts about me.
                </li>
                <li>
                  <a href="/projects" className="text-link">
                    /projects
                  </a>
                  : Things that I have done/ work with. Techstacks info
                  included.{" "}
                </li>
              </ul>
            </div>
          </ReadmeCard>
        </div>
      )}
      <TerminalPane setShowContent={setShowContent} />
    </PageLayout>
  );
};

export default Help;
