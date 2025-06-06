import { ProjectCategory } from "@/constants/enums/ProjectCategory";

export type projects = {
  title: string;
  projectCategory: ProjectCategory;
  role: string;
  yearAccomplished: string;
  jobDescription: string;
  descriptions: string;
  techStack?: string[];
  imageLocation?: string[];
  publicationLink?: string[];
};
