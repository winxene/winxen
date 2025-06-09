import { TERMINAL_CONFIG } from "@/constants/terminal/terminalConfig";
import {
  normalizePath,
  resolvePath,
  getAvailableDirectories,
} from "./pathUtils";

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

  const { targetDir, partialName, pathPrefix } = parseInputPath(
    input,
    normalizedCurrent,
  );
  const suggestions = getMatchingSuggestions(
    targetDir,
    partialName,
    pathPrefix,
  );

  addParentDirectorySuggestions(
    suggestions,
    input,
    normalizedCurrent,
    pathPrefix,
    partialName,
  );

  return suggestions;
};

const parseInputPath = (input: string, currentPath: string) => {
  const lastSlashIndex = input.lastIndexOf("/");

  if (lastSlashIndex === -1) {
    return {
      targetDir: currentPath,
      partialName: input,
      pathPrefix: "",
    };
  }

  const pathPart = input.substring(0, lastSlashIndex);
  const partialName = input.substring(lastSlashIndex + 1);
  const targetDir = resolvePath(currentPath, pathPart);
  const pathPrefix = input.substring(0, lastSlashIndex + 1);

  return { targetDir, partialName, pathPrefix };
};

const getMatchingSuggestions = (
  targetDir: string,
  partialName: string,
  pathPrefix: string,
): string[] => {
  const availableDirs = getAvailableDirectories(targetDir);
  const matchingDirs = availableDirs.filter((dir) =>
    dir.toLowerCase().startsWith(partialName.toLowerCase()),
  );

  return matchingDirs.map((dir) => pathPrefix + dir);
};

const addParentDirectorySuggestions = (
  suggestions: string[],
  input: string,
  currentPath: string,
  pathPrefix: string,
  partialName: string,
): void => {
  const targetDir = pathPrefix
    ? resolvePath(currentPath, pathPrefix.slice(0, -1))
    : currentPath;

  if (targetDir === "/") return;

  if ("..".startsWith(partialName.toLowerCase())) {
    suggestions.unshift(pathPrefix + "..");
  }

  const parentPattern = /^\.\.\/*/;
  if (parentPattern.test(partialName)) {
    addMultiLevelParentSuggestion(suggestions, input, currentPath, pathPrefix);
  }
};

const addMultiLevelParentSuggestion = (
  suggestions: string[],
  currentPath: string,
  pathPrefix: string,
  partialName: string,
): void => {
  const currentSegments =
    currentPath === "/" ? [] : currentPath.split("/").filter(Boolean);

  const maxLevels = currentSegments.length;
  const existingLevels = (partialName.match(/\.\./g) || []).length;

  if (existingLevels < maxLevels) {
    const additionalParent = partialName.endsWith("/") ? ".." : "/../..";
    const fullSuggestion = pathPrefix + partialName + additionalParent;
    suggestions.push(fullSuggestion);
  }
};

export const getCurrentSuggestion = ({
  input,
  showAutocomplete,
  autocompleteOptions,
  autocompleteIndex,
}: {
  input: string;
  showAutocomplete: boolean;
  autocompleteOptions: string[];
  autocompleteIndex: number;
}): string => {
  if (!showAutocomplete || autocompleteOptions.length === 0) {
    return "";
  }

  const [cmd, ...args] = input.trim().split(" ");
  const currentOption = autocompleteOptions[autocompleteIndex];

  if (!args.length) {
    return input + currentOption.slice(cmd.length);
  }

  if (cmd.toLowerCase() === "cd") {
    const currentArg = args.join(" ");
    const beforeArg = input.substring(0, input.lastIndexOf(currentArg));
    return beforeArg + currentOption;
  }

  return input;
};
