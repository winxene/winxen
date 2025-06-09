import { getAllProjects } from "@/constants/projects/projects";
import {
  TERMINAL_CONFIG,
  MESSAGES,
  TERMINAL_HOME_PATH,
} from "@/constants/terminal/terminalConfig";
import { OutputLine } from "@/types/terminal";
import {
  getAvailableDirectories,
  getFullPath,
  normalizePath,
} from "@/utils/terminal/terminalUtils";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

type SetStateFn<T> = React.Dispatch<React.SetStateAction<T>>;
type CommandProps = {
  currentPath: string;
  setOutput: SetStateFn<OutputLine[]>;
  commandHistory: string[];
  setCommandHistory: SetStateFn<string[]>;
};

interface UseCommandExecutorProps extends CommandProps {
  setHistoryIndex: (index: number) => void;
  setInput: (input: string) => void;
  setShowAutocomplete: (show: boolean) => void;
  setShowContent: (show: boolean) => void;
}

const addOutput = (setOutput: SetStateFn<OutputLine[]>, line: OutputLine) => {
  setOutput((prev) => [...prev, line]);
};

const resolvePath = (currentPath: string, targetPath: string): string => {
  currentPath = normalizePath(currentPath);
  targetPath = normalizePath(targetPath);

  if (targetPath.startsWith("/")) {
    return targetPath;
  }

  const segments = targetPath.split("/").filter(Boolean);

  const currentSegments =
    currentPath === "/" ? [] : currentPath.split("/").filter(Boolean);
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

const isValidPath = (path: string): boolean => {
  path = normalizePath(path);
  const allProjects = getAllProjects();

  if (path === "/" || path === TERMINAL_HOME_PATH) {
    return true;
  }

  if (path === "/projects") {
    return true;
  }

  if (path.startsWith("/projects/")) {
    const projectName = path.substring(10);
    return allProjects.includes(projectName);
  }

  if (TERMINAL_CONFIG.endpoints?.some((endpoint) => path === `/${endpoint}`)) {
    return true;
  }

  return false;
};

export const useCommandExecutor = (props: UseCommandExecutorProps) => {
  const router = useRouter();

  const executeCommand = useCallback(
    (command: string) => {
      const trimmedCommand = command.trim();
      const [cmd, ...args] = trimmedCommand.split(" ");

      if (
        trimmedCommand &&
        props.commandHistory[props.commandHistory.length - 1] !== trimmedCommand
      ) {
        props.setCommandHistory((prev) => [...prev, trimmedCommand]);
      }

      props.setHistoryIndex(-1);
      props.setInput("");
      props.setShowAutocomplete(false);

      addOutput(props.setOutput, {
        type: "command",
        text: `$ ${trimmedCommand}`,
      });

      switch (cmd.toLowerCase()) {
        case "ls": {
          const path = normalizePath(props.currentPath);
          const availableDirectories = getAvailableDirectories(path);
          if (availableDirectories.length > 0) {
            addOutput(props.setOutput, {
              type: "output",
              text: availableDirectories.join("  "),
            });
          } else {
            addOutput(props.setOutput, {
              type: "output",
              text: MESSAGES.NO_ITEMS,
            });
          }
          break;
        }

        case "cd": {
          if (!args.length) {
            addOutput(props.setOutput, {
              type: "output",
              text: MESSAGES.HOME_CHANGED,
            });
            router.push("/");
          } else {
            const targetPath = args.join(" ");
            const resolvedPath = resolvePath(props.currentPath, targetPath);

            if (isValidPath(resolvedPath)) {
              const displayPath =
                resolvedPath === "/" ? "home" : resolvedPath.substring(1);
              addOutput(props.setOutput, {
                type: "output",
                text: MESSAGES.CHANGED_TO
                  ? MESSAGES.CHANGED_TO(displayPath)
                  : `Changed to ${displayPath}`,
              });
              router.push(resolvedPath);
            } else {
              const current = normalizePath(props.currentPath);
              addOutput(props.setOutput, {
                type: "error",
                text: `Directory not found: ${targetPath}. Available: ${getAvailableDirectories(current).join(", ")}`,
              });
            }
          }
          props.setShowContent(true);
          break;
        }

        case "pwd": {
          const path = normalizePath(props.currentPath);
          addOutput(props.setOutput, {
            type: "output",
            text: getFullPath(path),
          });
          break;
        }

        case "clear": {
          props.setOutput([]);
          props.setShowContent(false);
          break;
        }

        case "help": {
          addOutput(props.setOutput, {
            type: "output",
            text: "",
          });
          props.setShowContent(true);
          router.push("/help");
          break;
        }

        case "":
          break;

        default:
          addOutput(props.setOutput, {
            type: "error",
            text: MESSAGES.COMMAND_NOT_FOUND
              ? MESSAGES.COMMAND_NOT_FOUND(cmd)
              : `Command not found: ${cmd}`,
          });
      }
    },
    [props, router],
  );

  return { executeCommand };
};
