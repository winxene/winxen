import { getAllProjects } from "@/constants/projects/projects";
import { TERMINAL_CONFIG } from "@/constants/terminal/terminalConfig";

export const normalizePath = (path: string): string => {
  if (path === "~" || path === "/") return "/";
  return path.replace(/^~\//, "/");
};

export const getFullPath = (currentPath: string): string => {
  const normalized = normalizePath(currentPath);
  return normalized === "/" ? "~" : `~${normalized}`;
};

export const getAvailableDirectories = (currentPath: string) => {
  const path = normalizePath(currentPath);
  const allProjects = getAllProjects();

  if (path === "/") {
    return TERMINAL_CONFIG.endpoints;
  } else if (path === "/projects") {
    return allProjects;
  } else if (path.startsWith("/projects/")) {
    return [];
  } else if (
    TERMINAL_CONFIG.endpoints?.some((endpoint) => path === `/${endpoint}`)
  ) {
    return [];
  }

  return [];
};

export const getAutocompleteOptions = (
  input: string,
  currentPath?: string,
): string[] => {
  const [cmd, ...args] = input.trim().split(" ");

  if (!args.length) {
    return TERMINAL_CONFIG.commands.filter((command) =>
      command.startsWith(cmd.toLowerCase()),
    );
  }

  if (cmd.toLowerCase() === "cd") {
    const currentArg = args.join(" ");
    return getCdAutocompleteOptions(
      currentArg,
      normalizePath(currentPath || "/"),
    );
  }

  return [];
};

const getParentPath = (currentPath: string): string => {
  const path = normalizePath(currentPath);

  if (path === "/") return "/";

  if (path.startsWith("/projects/")) return "/projects";

  if (
    path === "/projects" ||
    TERMINAL_CONFIG.endpoints?.some((endpoint) => path === `/${endpoint}`)
  ) {
    return "/";
  }

  return "/";
};

const getCdAutocompleteOptions = (
  input: string,
  currentPath: string,
): string[] => {
  const path = normalizePath(currentPath);

  if (input.startsWith("../")) {
    const remainingPath = input.substring(3);
    const parentPath = getParentPath(path);
    const availableFromParent = getAvailableDirectories(parentPath);

    return availableFromParent
      .filter((option) =>
        option.toLowerCase().startsWith(remainingPath.toLowerCase()),
      )
      .map((option) => `../${option}`);
  }

  const availableInCurrent = getAvailableDirectories(path);
  const directOptions = availableInCurrent.filter((option) =>
    option.toLowerCase().startsWith(input.toLowerCase()),
  );

  const options = [".."];

  options.push(...directOptions);

  if (path !== "/") {
    const parentPath = getParentPath(path);
    const parentSiblings = getAvailableDirectories(parentPath);

    const relativeOptions = parentSiblings
      .filter((option) => option.toLowerCase().startsWith(input.toLowerCase()))
      .map((option) => `../${option}`);

    options.push(...relativeOptions);
  }

  return options.filter((option) =>
    option.toLowerCase().startsWith(input.toLowerCase()),
  );
};

type CurrentSuggestionProps = {
  input: string;
  showAutocomplete: boolean;
  autocompleteOptions: string[];
  autocompleteIndex: number;
};

export const getCurrentSuggestion = ({
  input,
  showAutocomplete,
  autocompleteOptions,
  autocompleteIndex,
}: CurrentSuggestionProps): string => {
  if (!showAutocomplete || autocompleteOptions.length === 0) return "";

  const [cmd, ...args] = input.trim().split(" ");
  const currentOption = autocompleteOptions[autocompleteIndex];

  if (!args.length) {
    return input + currentOption.slice(cmd.length);
  } else if (cmd.toLowerCase() === "cd") {
    const currentArg = args.join(" ");
    const beforeArg = input.substring(0, input.lastIndexOf(currentArg));
    return beforeArg + currentOption;
  }

  return input;
};
