"use client";

import TerminalPane from "@/components/ui/TerminalPane";
import { FC, useState } from "react";
import PageLayout from "../page-layout";
import ReadmeCard from "@/components/ui/ReadmeCard";
import TerminalHistoryPane from "@/components/ui/Terminal/TerminalHistoryPane";
import { usePathname } from "next/navigation";
import { PROGRAMMING_LANGUAGES } from "@/constants/projects/programmingLanguages";
import { TECH_STACKS } from "@/constants/projects/techstacks";
import FormattedText from "@/components/common/FormattedText";
import ProjectCard from "@/components/ui/Projects/ProjectCard";

const Projects: FC = () => {
  const [showContent, setShowContent] = useState(true);
  const path = "~" + usePathname();
  return (
    <PageLayout
      title="Projects - Winxen's Portfolio Terminal"
      contentDescription="Winxen personal website. Contains projects and information about me."
    >
      {showContent && (
        <div className="flex flex-col items-center justify-center animate-fade-in-up min-w-full text-sm md:text-base">
          <div className="relative items-left justify-center space-y-0 top-24 md:top-0 lg:space-y-4 w-[70%] mx-auto ">
            <TerminalHistoryPane currentPath={path} text="cd help" />
          </div>
          <ReadmeCard>
            <div className="flex flex-col space-y-4 text-left justify-center">
              <p>
                Featuring some of the renowned works done by Winxen, covering
                the sectors of Embedded & IoT, Full-stack, and Mobile apps.
              </p>

              {/* Will be revealed if this feature is implemented
              <p>
                Here are some of the commands that you can use for interacting
                in this page.
              </p>
              <ul className="list-disc pl-6">
                <li>
                  <span className="text-link">techstacks</span>: Shows the
                  techstacks
                </li>
                <li>
                  <span className="text-link">ls</span>: Lists all of the
                  projects categorised by folders.
                </li>
                <li>
                  <span className="text-link">tldr</span>: shows this README.md.
                </li>
              </ul>
              */}
              <p className="text-title font-bold">Highlights</p>
              <p className="text-title">Featured tech stacks</p>
              <ul className="list-disc pl-6">
                {TECH_STACKS.map((stack, index) => (
                  <li key={index} className="text-sm lg:text-base">
                    <FormattedText text={stack}></FormattedText>
                  </li>
                ))}
              </ul>
              <p className="text-title">Featured programming languages</p>
              <ul className="list-disc grid grid-cols-2 pl-6">
                {PROGRAMMING_LANGUAGES.map((lang, index) => (
                  <li key={index} className="text-sm lg:text-base">
                    <p className="text-primary hover:text-linkAlt">{lang}</p>
                  </li>
                ))}
              </ul>
            </div>
          </ReadmeCard>
          <div className="flex flex-col items-start justify-center w-[70%] mx-auto">
            <p>---------------</p>
            <p className="text-subtitle">Projects</p>
            <p>---------------</p>
          </div>
          <div className="flex flex-col items-start justify-center w-[70%] mx-auto">
            <p className="text-title font-bold mt-3">Works</p>
            <div className="grid grid-cols-1 md:grid-cols-2 w-full justify-between">
              {/* TODO: Use loop for handling this card */}
              <ProjectCard
                title="Winxen's Portfolio Terminal"
                description="A terminal-based portfolio showcasing my projects and skills."
                link="/1"
                image=""
              />
              <ProjectCard
                title="Winxen's Portfolio Terminal"
                description="A terminal-based portfolio showcasing my projects and skills."
                link="/1"
                image=""
              />
            </div>
            <p className="text-title font-bold mt-3">
              Apple Developer Academy @BINUS
            </p>
            {/* TODO: Use loop for handling this card & filter logic to show 2*/}
            {/* view more */}
            <p className="text-title font-bold mt-3">Personal Works</p>
            {/* TODO: Use loop for handling this card & filter logic to show 2*/}
            {/* view more */}
            <p className="text-title font-bold mt-3">University Projects</p>
            {/* TODO: Use loop for handling this card & filter logic to show 2*/}
            {/* view more */}
          </div>
        </div>
      )}
      <TerminalPane setShowContent={setShowContent} />
    </PageLayout>
  );
};

export default Projects;
