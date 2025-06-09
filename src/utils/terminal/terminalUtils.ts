import { getAllProjects } from "@/constants/projects/projects";
import { TERMINAL_CONFIG } from "@/constants/terminal/terminalConfig";

export const normalizePath = (path: string): string => {
  if (path === "~" || path === "/") return "/";
  if (path.startsWith("~/")) return path.replace(/^~\//, "/");
  return path;
};

export const getFullPath = (currentPath: string): string => {
  const normalized = normalizePath(currentPath);
  return normalized === "/" ? "~" : `~${normalized}`;
};

export const getAvailableDirectories = (currentPath: string): string[] => {
  const path = normalizePath(currentPath);
  const allProjects = getAllProjects();

  if (path === "/") {
    return TERMINAL_CONFIG.endpoints;
  } else if (path === "/projects") {
    return allProjects;
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

const resolvePath = (currentPath: string, inputPath: string): string => {
  const current = normalizePath(currentPath);

  if (inputPath.startsWith("/")) {
    return normalizePath(inputPath);
  }

  const segments = current === "/" ? [] : current.split("/").filter(Boolean);

  const inputSegments = inputPath.split("/").filter(Boolean);

  for (const segment of inputSegments) {
    if (segment === "..") {
      if (segments.length > 0) {
        segments.pop();
      }
    } else if (segment === ".") {
      continue;
    } else {
      segments.push(segment);
    }
  }

  return segments.length === 0 ? "/" : "/" + segments.join("/");
};

const getCdAutocompleteOptions = (
  input: string,
  currentPath: string,
): string[] => {
  const normalizedCurrent = normalizePath(currentPath);

  if (!input.trim()) {
    const suggestions = normalizedCurrent === "/" ? [] : [".."];
    suggestions.push(...getAvailableDirectories(normalizedCurrent));
    return suggestions;
  }

  const lastSlashIndex = input.lastIndexOf("/");
  let targetDir = normalizedCurrent;
  let partialName = input;

  if (lastSlashIndex !== -1) {
    const pathPart = input.substring(0, lastSlashIndex);
    partialName = input.substring(lastSlashIndex + 1);
    targetDir = resolvePath(normalizedCurrent, pathPart);
  }

  const availableDirs = getAvailableDirectories(targetDir);

  const matchingDirs = availableDirs.filter((dir) =>
    dir.toLowerCase().startsWith(partialName.toLowerCase()),
  );

  const suggestions = matchingDirs.map((dir) => {
    if (lastSlashIndex !== -1) {
      const pathPart = input.substring(0, lastSlashIndex + 1);
      return pathPart + dir;
    }
    return dir;
  });

  if (targetDir !== "/") {
    if ("..".startsWith(partialName.toLowerCase())) {
      const parentSuggestion =
        lastSlashIndex !== -1
          ? input.substring(0, lastSlashIndex + 1) + ".."
          : "..";
      suggestions.unshift(parentSuggestion);
    }

    const parentPattern = /^\.\.\/*/;
    if (parentPattern.test(partialName)) {
      const currentSegments =
        normalizedCurrent === "/"
          ? []
          : normalizedCurrent.split("/").filter(Boolean);
      const maxLevels = currentSegments.length;

      const existingLevels = (partialName.match(/\.\./g) || []).length;

      if (existingLevels < maxLevels) {
        const additionalParent = partialName.endsWith("/") ? ".." : "/../..";
        const fullSuggestion =
          lastSlashIndex !== -1
            ? input.substring(0, lastSlashIndex + 1) +
              partialName +
              additionalParent
            : partialName + additionalParent;
        suggestions.push(fullSuggestion);
      }
    }
  }

  return suggestions;
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
