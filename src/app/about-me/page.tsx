"use client";

import { FC, useState, useMemo } from "react";
import PageLayout from "@/app/page-layout";
import TerminalPane from "@/components/ui/TerminalPane";
import TerminalHistoryPane from "@/components/ui/Terminal/TerminalHistoryPane";
import { usePathname } from "next/navigation";

import Image from "next/image";
import { SectionList } from "@/components/common/SectionList";
import {
  ACHIEVEMENTS_DATA,
  CERTIFICATIONS_DATA,
  EXPERIENCE_DATA,
} from "@/constants/about-me/aboutMe";
import { SocialLinks } from "@/components/ui/AboutMe/SocialLinks";
import ColourPalette from "@/components/ui/AboutMe/ColourPalette";

const ExperienceSection: FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`flex flex-col space-y-8 text-sm lg:text-base ${className}`}>
    <SectionList title="Experience" items={EXPERIENCE_DATA} />
    <SectionList title="Achievements" items={ACHIEVEMENTS_DATA} />
    <SectionList title="Certification" items={CERTIFICATIONS_DATA} />
  </div>
);

const AboutMe: FC = () => {
  const [showContent, setShowContent] = useState(true);
  const pathname = usePathname();

  const path = useMemo(() => "~" + pathname, [pathname]);
  const commandText = "cd about-me";

  if (!showContent) {
    return (
      <PageLayout>
        <TerminalPane setShowContent={setShowContent} />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="relative items-left justify-center lg:space-y-4 w-full mx-auto mt-24">
        <TerminalHistoryPane currentPath={path} text={commandText} />
      </div>
      <div className="flex flex-col items-center justify-center animate-fade-in-up min-w-full space-y-0">
        <div className="relative lg:hidden">
          <p className="text-subtitle text-base md:text-lg">
            winxen@about-me.highlights
          </p>
          <p className="space-y-10">-----------------------------</p>
        </div>

        <div className="flex flex-col lg:flex-row items-start justify-between mx-0 lg:mx-3 my-24 w-3/5 md:mt-20 md:mx-auto text-sm md:text-base space-x-4 lg:space-x-20 py-10 lg:py-20">
          <div className="flex flex-col space-y-20 text-left justify-center min-w-fit lg:w-1/3">
            <Image
              src="/winxen.jpg"
              alt="Winxen's picture"
              width={200}
              height={200}
              className="rounded-xl mb-4 md:mb-0 mx-auto min-w-full"
              priority
            />
            <ExperienceSection className="lg:hidden" />
            <ul className="list-none space-y-4 lg:space-y-24">
              <li className="space-y-5">
                <p className="text-title">Skills and Techstacks</p>
                <p>
                  See{" "}
                  <a href="/projects" className="text-link hover:text-linkAlt">
                    projects
                  </a>
                </p>
              </li>
              <li className="space-y-5">
                <p className="text-title">Access my Resume here:</p>
                <p>
                  <a
                    href="https://drive.google.com/file/d/1ULchGYDajId7shoZWAfRVXmO1gmTLBXb/view?usp=drive_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link hover:text-linkAlt"
                  >
                    Resume
                  </a>
                </p>
              </li>
              <li className="space-y-5">
                <p className="text-title">Social Media:</p>
                <SocialLinks />
              </li>
            </ul>
            <ColourPalette className="lg:hidden" />
          </div>

          <div className="flex flex-col space-y-4 text-left justify-center w-2/3">
            <p className="text-subtitle text-base md:text-lg hidden lg:block">
              winxen@about-me.highlights
            </p>
            <p className="space-y-10 hidden lg:block">
              -----------------------------
            </p>
            <ExperienceSection className="hidden lg:block" />
            <ColourPalette className="hidden lg:block" />
          </div>
        </div>
      </div>

      <TerminalPane setShowContent={setShowContent} />
    </PageLayout>
  );
};

export default AboutMe;
