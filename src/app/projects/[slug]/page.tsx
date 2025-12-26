"use client";

import { notFound, usePathname } from "next/navigation";
import { PROJECT_LISTS } from "@/constants/projects/projects";
import PageLayout from "@/app/page-layout";
import TerminalHistoryPane from "@/components/ui/Terminal/TerminalHistoryPane";
import { useMemo, useState } from "react";
import TerminalPane from "@/components/ui/TerminalPane";
import ReadmeCard from "@/components/ui/ReadmeCard";
import Carousel from "@/components/projects/carousel";
import { getPublicationLinkDisplay } from "@/utils/link/getPublicationLinkDisplay";
import ReactMarkdown from "react-markdown";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return PROJECT_LISTS.map((project) => ({
    slug: project.endpoint.replace("/", ""),
  }));
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const [showContent, setShowContent] = useState(true);
  const [showReadme, setShowReadme] = useState(false);
  const pathname = usePathname();

  const path = useMemo(() => "~" + pathname, [pathname]);
  const commandText = `cd ${params.slug}`;

  const project = PROJECT_LISTS.find(
    (project) => project.endpoint === `/${params.slug}`,
  );

  if (!project) {
    notFound();
  }

  if (!showContent) {
    return (
      <PageLayout>
        <TerminalPane setShowContent={setShowContent} />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="relative items-left justify-center lg:space-y-4 w-[70%] mx-auto mt-24 ">
        <TerminalHistoryPane currentPath={path} text={commandText} />
      </div>

      <div className="flex flex-col items-start justify-center animate-fade-in-up w-[70%] space-y-0">
        {project.imageLocation && project.imageLocation.length > 0 && (
          <Carousel images={project.imageLocation} current={0} />
        )}

        <p className="text-subtitle text-base md:text-lg">
          winxen@projects.{project.endpoint.replace("/", "")}
        </p>
        <p className="space-y-10">-----------------------------</p>
        <div className="text-primary text-sm lg:text-base space-y-5">
          <p>
            <span className="text-title font-bold">Role:</span> {project.role}
          </p>
          <p>
            <span className="text-title font-bold">Year:</span>{" "}
            {project.yearAccomplished}
          </p>
          <p>
            <span className="text-title font-bold">Category:</span>{" "}
            {project.projectCategory}
          </p>
          <p className="text-title font-bold">Job Description:</p>{" "}
          <p>{project.descriptions}</p>
          <p className="text-title font-bold">Tech Stacks:</p>
          <ul className="list-disc pl-5">
            {project.techStack?.map((tech, index) => (
              <li key={index}>{tech}</li>
            ))}
          </ul>
          {project.publicationLink && project.publicationLink.length > 0 && (
            <div className="text-primary text-sm lg:text-base">
              <p className="text-title font-bold">Project Link:</p>
              <ul className="list-disc pl-5">
                {project.publicationLink.map((link, index) => {
                  const display = getPublicationLinkDisplay(link);
                  if (!display) return null; // skip if undefined or null

                  return (
                    <li key={index}>
                      <a
                        href={display.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-link hover:text-linkAlt"
                      >
                        {display.text}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
      {project.jobDescriptions && (
        <button
          onClick={() => setShowReadme(!showReadme)}
          className="text-link hover:text-linkAlt text-sm lg:text-base transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded px-2 py-1 mx-auto my-10 items-center"
        >
          {showReadme ? "View Less" : "View More"}
        </button>
      )}
      {showReadme && (
        <ReadmeCard>
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown>{project.jobDescriptions}</ReactMarkdown>
          </div>
        </ReadmeCard>
      )}
      <TerminalPane setShowContent={setShowContent} />
    </PageLayout>
  );
}

//will be adding metadata in the future

// export async function generateMetadata({ params }: ProjectPageProps) {
//   const project = PROJECT_LISTS.find(
//     (project) => project.endpoint === `/${params.slug}`,
//   );
//
//   if (!project) {
//     return {
//       title: "Project Not Found",
//     };
//   }
//
//   return {
//     title: `${project.title} - Winxen's Portfolio Website`,
//     description: project.jobDescriptions,
//   };
// }
