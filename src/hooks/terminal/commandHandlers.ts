import { MESSAGES } from "@/constants/terminal/terminalConfig";
import { OutputLine } from "@/types/terminal";
import {
  normalizePath,
  resolvePath,
  isValidPath,
  getAvailableDirectories,
  getFullPath,
} from "@/utils/terminal/pathUtils";
import { NextRouter } from "next/router";

type SetOutputFn = React.Dispatch<React.SetStateAction<OutputLine[]>>;

export const addOutput = (setOutput: SetOutputFn, line: OutputLine) => {
  setOutput((prev) => [...prev, line]);
};

export const handleLsCommand = (
  currentPath: string,
  setOutput: SetOutputFn,
): void => {
  const path = normalizePath(currentPath);
  const availableDirectories = getAvailableDirectories(path);

  if (availableDirectories.length > 0) {
    addOutput(setOutput, {
      type: "output",
      text: availableDirectories.join("  "),
    });
  } else {
    addOutput(setOutput, {
      type: "output",
      text: MESSAGES.NO_ITEMS,
    });
  }
};

export const handleCdCommand = (
  args: string[],
  currentPath: string,
  setOutput: SetOutputFn,
  setShowContent: (show: boolean) => void,
  router: NextRouter,
): void => {
  if (!args.length) {
    addOutput(setOutput, {
      type: "output",
      text: MESSAGES.HOME_CHANGED,
    });
    router.push("/");
  } else {
    const targetPath = args.join(" ");
    const resolvedPath = resolvePath(currentPath, targetPath);

    if (isValidPath(resolvedPath)) {
      const displayPath =
        resolvedPath === "/" ? "home" : resolvedPath.substring(1);
      addOutput(setOutput, {
        type: "output",
        text: MESSAGES.CHANGED_TO
          ? MESSAGES.CHANGED_TO(displayPath)
          : `Changed to ${displayPath}`,
      });
      router.push(resolvedPath);
    } else {
      const current = normalizePath(currentPath);
      addOutput(setOutput, {
        type: "error",
        text: `Directory not found: ${targetPath}. Available: ${getAvailableDirectories(current).join(", ")}`,
      });
    }
  }
  setShowContent(true);
};

export const handlePwdCommand = (
  currentPath: string,
  setOutput: SetOutputFn,
): void => {
  const path = normalizePath(currentPath);
  addOutput(setOutput, {
    type: "output",
    text: getFullPath(path),
  });
};

export const handleClearCommand = (
  setOutput: SetOutputFn,
  setShowContent: (show: boolean) => void,
): void => {
  setOutput([]);
  setShowContent(false);
};

export const handleHelpCommand = (
  setOutput: SetOutputFn,
  setShowContent: (show: boolean) => void,
  router: NextRouter,
): void => {
  addOutput(setOutput, {
    type: "output",
    text: "",
  });
  setShowContent(true);
  router.push("/help");
};

export const handleUnknownCommand = (
  command: string,
  setOutput: SetOutputFn,
): void => {
  addOutput(setOutput, {
    type: "error",
    text: MESSAGES.COMMAND_NOT_FOUND
      ? MESSAGES.COMMAND_NOT_FOUND(command)
      : `Command not found: ${command}`,
  });
};
