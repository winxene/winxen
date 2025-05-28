import {
  TERMINAL_CONFIG,
  MESSAGES,
  TERMINAL_HOME_PATH,
} from "@/constants/terminal/terminalConfig";
import { OutputLine } from "@/types/terminal";
import { getFullPath } from "@/utils/terminal/terminalUtils";
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
        case "ls":
          if (props.currentPath === TERMINAL_HOME_PATH) {
            addOutput(props.setOutput, {
              type: "output",
              text: TERMINAL_CONFIG.endpoints.join("  "),
            });
          } else {
            addOutput(props.setOutput, {
              type: "output",
              text: MESSAGES.NO_ITEMS,
            });
          }
          break;

        case "cd":
          if (!args.length) {
            addOutput(props.setOutput, {
              type: "output",
              text: MESSAGES.HOME_CHANGED,
            });
            window.location.replace("/");
          } else if (args[0] === "..") {
            addOutput(props.setOutput, {
              type: "output",
              text: MESSAGES.HOME_CHANGED,
            });
            router.back();
          } else if (TERMINAL_CONFIG.endpoints.includes(args[0])) {
            addOutput(props.setOutput, {
              type: "output",
              text: MESSAGES.CHANGED_TO(args[0]),
            });
            const targetPath = `/${args[0]}`;
            router.push(targetPath);
          } else {
            addOutput(props.setOutput, {
              type: "error",
              text: MESSAGES.NO_DIRECTORY(args[0]),
            });
            router.push("/not-found");
          }
          props.setShowContent(true);
          break;

        case "pwd":
          addOutput(props.setOutput, {
            type: "output",
            text: getFullPath(props.currentPath),
          });
          break;

        case "clear":
          props.setOutput([]);
          props.setShowContent(false);
          break;

        case "help":
          addOutput(props.setOutput, {
            type: "output",
            text: "",
          });
          props.setShowContent(true);
          router.push("/help");
          break;

        case "":
          break;

        default:
          addOutput(props.setOutput, {
            type: "error",
            text: MESSAGES.COMMAND_NOT_FOUND(cmd),
          });
      }
    },
    [props, router],
  );

  return { executeCommand };
};
