"use client";

import TerminalPane from "@/components/ui/TerminalPane";
import { FC, useState, useMemo } from "react";
import PageLayout from "../page-layout";
import ReadmeCard from "@/components/ui/ReadmeCard";
import TerminalHistoryPane from "@/components/ui/Terminal/TerminalHistoryPane";
import { usePathname } from "next/navigation";
import { PROGRAMMING_LANGUAGES } from "@/constants/projects/programmingLanguages";
import { TECH_STACKS } from "@/constants/projects/techstacks";
import FormattedText from "@/components/common/FormattedText";
import ProjectCard from "@/components/ui/Projects/ProjectCard";
import { ProjectCategory } from "@/constants/enums/ProjectCategory";
import { Projects as ProjectType } from "@/types/projects";
import { PROJECT_LISTS } from "@/constants/projects/projects";

const Projects: FC = () => {
  const [showContent, setShowContent] = useState(true);
  const [showAllPersonal, setShowAllPersonal] = useState(false);
  const [showAllAcademy, setShowAllAcademy] = useState(false);
  const [showAllUniversity, setShowAllUniversity] = useState(false);
  const path = "~" + usePathname();

  const groupedProjects = useMemo(() => {
    return PROJECT_LISTS.reduce(
      (acc, project) => {
        const category = project.projectCategory;
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(project);
        return acc;
      },
      {} as Record<ProjectCategory, ProjectType[]>,
    );
  }, []);

  const renderProjectSection = (
    projects: ProjectType[],
    showAll: boolean,
    setShowAll: (show: boolean) => void,
    limit: number = 2,
  ) => {
    const displayedProjects = showAll ? projects : projects.slice(0, limit);
    const hasMore = projects.length > limit;

    return (
      <>
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full justify-between">
          {displayedProjects.map((project, index) => (
            <ProjectCard
              key={`${project.endpoint}-${index}`}
              title={project.title}
              description={project.descriptions}
              link={project.endpoint}
              publicationLink={project.publicationLink?.[0] || ""}
              techStack={project.techStack}
              yearAccomplished={project.yearAccomplished}
              role={project.role}
              image={project.imageLocation?.[0] || "/projects.png"}
            />
          ))}
        </div>
        {hasMore && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-link hover:text-linkAlt transition-colors duration-200 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded px-2 py-1"
          >
            {showAll
              ? "View Less"
              : `View More (${projects.length - limit} more)`}
          </button>
        )}
      </>
    );
  };

  return (
    <PageLayout
      title="Projects - Winxen's Portfolio Terminal"
      contentDescription="Winxen personal website. Contains projects and information about me."
    >
      {showContent && (
        <div className="flex flex-col items-center justify-center animate-fade-in-up min-w-full text-sm md:text-base mx-auto">
          <div className="relative items-left justify-center space-y-0 top-24 md:top-0 lg:space-y-4 w-[70%]">
            <TerminalHistoryPane currentPath={path} text="cd projects" />
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
            {/* Work Projects */}
            {groupedProjects[ProjectCategory.WORK] && (
              <>
                <p className="text-title font-bold mt-3">Work Projects</p>
                {renderProjectSection(
                  groupedProjects[ProjectCategory.WORK],
                  showAllUniversity,
                  setShowAllUniversity,
                )}
              </>
            )}
            {/* Personal Works */}
            {groupedProjects[ProjectCategory.PERSONAL] && (
              <>
                <p className="text-title font-bold mt-3">Personal Works</p>
                {renderProjectSection(
                  groupedProjects[ProjectCategory.PERSONAL],
                  showAllPersonal,
                  setShowAllPersonal,
                )}
              </>
            )}
            {/* Apple Developer Academy Projects */}
            {groupedProjects[ProjectCategory.INTERNSHIP] && (
              <>
                <p className="text-title font-bold mt-3">
                  Apple Developer Academy @BINUS
                </p>
                {renderProjectSection(
                  groupedProjects[ProjectCategory.INTERNSHIP],
                  showAllAcademy,
                  setShowAllAcademy,
                )}
              </>
            )}
            {/* University Projects */}
            {groupedProjects[ProjectCategory.UNIVERSITY] && (
              <>
                <p className="text-title font-bold mt-3">University Projects</p>
                {renderProjectSection(
                  groupedProjects[ProjectCategory.UNIVERSITY],
                  showAllUniversity,
                  setShowAllUniversity,
                )}
              </>
            )}
          </div>
        </div>
      )}
      <TerminalPane setShowContent={setShowContent} />
    </PageLayout>
  );
};

export default Projects;
