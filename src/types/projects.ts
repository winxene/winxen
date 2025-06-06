import { ProjectCategory } from "@/constants/enums/ProjectCategory";

export type projects = {
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
