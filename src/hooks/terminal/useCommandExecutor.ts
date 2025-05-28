import { TERMINAL_CONFIG } from "@/constants/terminal/terminalConfig";
import { OutputLine } from "@/types/terminal";
import { getFullUrl } from "@/utils/terminal/terminalUtils";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface UseCommandExecutorProps {
  currentPath: string;
  setCurrentPath: (path: string) => void;
  setOutput: React.Dispatch<React.SetStateAction<OutputLine[]>>;
  commandHistory: string[];
  setCommandHistory: React.Dispatch<React.SetStateAction<string[]>>;
  setHistoryIndex: (index: number) => void;
  setInput: (input: string) => void;
  setShowAutocomplete: (show: boolean) => void;
  setShowContent: (show: boolean) => void;
}

export const useCommandExecutor = ({
  currentPath,
  setCurrentPath,
  setOutput,
  commandHistory,
  setCommandHistory,
  setHistoryIndex,
  setInput,
  setShowAutocomplete,
  setShowContent,
}: UseCommandExecutorProps) => {
  const router = useRouter();
  const executeCommand = useCallback(
    (command: string) => {
      const trimmedCommand = command.trim();
      const [cmd, ...args] = trimmedCommand.split(" ");

      if (
        trimmedCommand &&
        commandHistory[commandHistory.length - 1] !== trimmedCommand
      ) {
        setCommandHistory((prev) => [...prev, trimmedCommand]);
      }
      setHistoryIndex(-1);

      setOutput((prev) => [
        ...prev,
        { type: "command", text: `${currentPath} $ ${trimmedCommand}` },
      ]);

      switch (cmd.toLowerCase()) {
        case "ls":
          if (currentPath === "~") {
            setOutput((prev) => [
              ...prev,
              { type: "output", text: TERMINAL_CONFIG.endpoints.join("  ") },
            ]);
          } else {
            setOutput((prev) => [
              ...prev,
              { type: "output", text: "No items found in this directory" },
            ]);
          }
          break;

        case "cd":
          if (!args.length) {
            setCurrentPath("~");
            setOutput((prev) => [
              ...prev,
              { type: "output", text: "Changed to home directory" },
            ]);
            router.push("/");
          } else if (args[0] === ".." || args[0] === "~") {
            setCurrentPath("~");
            setOutput((prev) => [
              ...prev,
              { type: "output", text: "Changed to home directory" },
            ]);
            router.back();
          } else if (TERMINAL_CONFIG.endpoints.includes(args[0])) {
            setCurrentPath(args[0]);
            setOutput((prev) => [
              ...prev,
              { type: "output", text: `Changed to ${args[0]}` },
            ]);
            const targetPath = args[0] === "~" ? "/" : `/${args[0]}`;
            router.push(targetPath);
          } else {
            setOutput((prev) => [
              ...prev,
              { type: "error", text: `cd: ${args[0]}: No such directory` },
            ]);
            router.push("/not-found");
          }

          break;

        case "pwd":
          setOutput((prev) => [
            ...prev,
            { type: "output", text: getFullUrl(currentPath) },
          ]);
          break;

        case "clear":
          setOutput([]);
          setShowContent(false);
          break;

        case "":
          break;

        default:
          setOutput((prev) => [
            ...prev,
            { type: "error", text: `command not found: ${cmd}` },
          ]);
      }

      setInput("");
      setShowAutocomplete(false);
    },
    [
      currentPath,
      commandHistory,
      setCurrentPath,
      setOutput,
      setCommandHistory,
      setHistoryIndex,
      setInput,
      setShowAutocomplete,
      setShowContent,
    ],
  );

  return { executeCommand };
};
