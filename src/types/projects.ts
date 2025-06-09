import { ProjectCategory } from "@/constants/enums/ProjectCategory";

export type Projects = {
  endpoint: string;
  title: string;
  projectCategory: ProjectCategory;
  role: string;
  yearAccomplished: string;
  jobDescriptions?: string;
  descriptions: string;
  techStack?: string[];
  imageLocation?: string[];
  publicationLink?: string[];
};
