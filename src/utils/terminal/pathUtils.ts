import { getAllProjects } from "@/constants/projects/projects";
import {
  TERMINAL_CONFIG,
  TERMINAL_HOME_PATH,
} from "@/constants/terminal/terminalConfig";

//normalizePath function to convert paths to a standard format
export const normalizePath = (path: string): string => {
  if (path === "~" || path === "/") return "/";
  if (path.startsWith("~/")) return path.replace(/^~\//, "/");
  return path;
};

export const getFullPath = (currentPath: string): string => {
  const normalized = normalizePath(currentPath);
  return normalized === "/" ? "~" : `~${normalized}`;
};

export const resolvePath = (
  currentPath: string,
  targetPath: string,
): string => {
  const normalizedCurrent = normalizePath(currentPath);
  const normalizedTarget = normalizePath(targetPath);

  if (normalizedTarget.startsWith("/")) {
    return normalizedTarget;
  }

  const segments = normalizedTarget.split("/").filter(Boolean);
  const currentSegments =
    normalizedCurrent === "/"
      ? []
      : normalizedCurrent.split("/").filter(Boolean);

  let resultSegments = [...currentSegments];

  for (const segment of segments) {
    if (segment === "..") {
      if (resultSegments.length > 0) {
        resultSegments.pop();
      }
    } else if (segment === ".") {
      continue;
    } else {
      resultSegments.push(segment);
    }
  }

  return resultSegments.length === 0 ? "/" : "/" + resultSegments.join("/");
};

export const isValidPath = (path: string): boolean => {
  const normalizedPath = normalizePath(path);
  const allProjects = getAllProjects();

  if (normalizedPath === "/" || normalizedPath === TERMINAL_HOME_PATH) {
    return true;
  }

  if (normalizedPath === "/projects") {
    return true;
  }

  if (normalizedPath.startsWith("/projects/")) {
    const projectName = normalizedPath.substring(10);
    return allProjects.includes(projectName);
  }

  if (
    TERMINAL_CONFIG.endpoints?.some(
      (endpoint) => normalizedPath === `/${endpoint}`,
    )
  ) {
    return true;
  }

  return false;
};

export const getAvailableDirectories = (currentPath: string): string[] => {
  const path = normalizePath(currentPath);
  const allProjects = getAllProjects();

  if (path === "/") {
    return TERMINAL_CONFIG.endpoints || [];
  }

  if (path === "/projects") {
    return allProjects;
  }

  if (TERMINAL_CONFIG.endpoints?.some((endpoint) => path === `/${endpoint}`)) {
    return [];
  }

  return [];
};
