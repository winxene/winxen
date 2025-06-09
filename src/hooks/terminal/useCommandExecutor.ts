import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { OutputLine } from "@/types/terminal";
import {
  addOutput,
  handleLsCommand,
  handleCdCommand,
  handlePwdCommand,
  handleClearCommand,
  handleHelpCommand,
  handleUnknownCommand,
} from "./commandHandlers";

type SetStateFn<T> = React.Dispatch<React.SetStateAction<T>>;

interface UseCommandExecutorProps {
  currentPath: string;
  setOutput: SetStateFn<OutputLine[]>;
  commandHistory: string[];
  setCommandHistory: SetStateFn<string[]>;
  setHistoryIndex: (index: number) => void;
  setInput: (input: string) => void;
  setShowAutocomplete: (show: boolean) => void;
  setShowContent: (show: boolean) => void;
}

const updateCommandHistory = (
  command: string,
  commandHistory: string[],
  setCommandHistory: SetStateFn<string[]>,
): void => {
  if (command && commandHistory[commandHistory.length - 1] !== command) {
    setCommandHistory((prev) => [...prev, command]);
  }
};

const resetInputState = (
  setHistoryIndex: (index: number) => void,
  setInput: (input: string) => void,
  setShowAutocomplete: (show: boolean) => void,
): void => {
  setHistoryIndex(-1);
  setInput("");
  setShowAutocomplete(false);
};

const displayCommand = (
  command: string,
  setOutput: SetStateFn<OutputLine[]>,
): void => {
  addOutput(setOutput, {
    type: "command",
    text: `$ ${command}`,
  });
};

const executeCommandLogic = (
  cmd: string,
  args: string[],
  props: UseCommandExecutorProps,
  router: ReturnType<typeof useRouter>,
): void => {
  const { currentPath, setOutput, setShowContent } = props;

  switch (cmd.toLowerCase()) {
    case "ls":
      handleLsCommand(currentPath, setOutput);
      break;

    case "cd":
      handleCdCommand(args, currentPath, setOutput, setShowContent, router);
      break;

    case "pwd":
      handlePwdCommand(currentPath, setOutput);
      break;

    case "clear":
      handleClearCommand(setOutput, setShowContent);
      break;

    case "help":
      handleHelpCommand(setOutput, setShowContent, router);
      break;

    case "":
      break;

    default:
      handleUnknownCommand(cmd, setOutput);
  }
};

export const useCommandExecutor = (props: UseCommandExecutorProps) => {
  const router = useRouter();

  const executeCommand = useCallback(
    (command: string) => {
      const trimmedCommand = command.trim();
      const [cmd, ...args] = trimmedCommand.split(" ");

      updateCommandHistory(
        trimmedCommand,
        props.commandHistory,
        props.setCommandHistory,
      );

      resetInputState(
        props.setHistoryIndex,
        props.setInput,
        props.setShowAutocomplete,
      );

      displayCommand(trimmedCommand, props.setOutput);

      executeCommandLogic(cmd, args, props, router);
    },
    [props, router],
  );

  return { executeCommand };
};
