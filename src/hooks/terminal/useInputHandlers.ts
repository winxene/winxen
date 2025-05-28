import { getAutocompleteOptions } from "@/utils/terminal/terminalUtils";
import { useCallback } from "react";

interface UseInputHandlersProps {
  input: string;
  setInput: (input: string) => void;
  commandHistory: string[];
  historyIndex: number;
  setHistoryIndex: (index: number) => void;
  showAutocomplete: boolean;
  setShowAutocomplete: (show: boolean) => void;
  autocompleteOptions: string[];
  setAutocompleteOptions: (options: string[]) => void;
  autocompleteIndex: number;
  setAutocompleteIndex: (
    index: number | ((prevIndex: number) => number),
  ) => void;
  executeCommand: (command: string) => void;
}

export const useInputHandlers = ({
  input,
  setInput,
  commandHistory,
  historyIndex,
  setHistoryIndex,
  showAutocomplete,
  setShowAutocomplete,
  autocompleteOptions,
  setAutocompleteOptions,
  autocompleteIndex,
  setAutocompleteIndex,
  executeCommand,
}: UseInputHandlersProps) => {
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInput(value);

      const options = getAutocompleteOptions(value);
      setAutocompleteOptions(options);
      setShowAutocomplete(options.length > 0 && value.trim().length > 0);
      setAutocompleteIndex(0);
    },
    [
      setInput,
      setAutocompleteOptions,
      setShowAutocomplete,
      setAutocompleteIndex,
    ],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case "Enter":
          executeCommand(input);
          break;

        case "Tab":
          e.preventDefault();
          if (autocompleteOptions.length > 0) {
            const [cmd, ...args] = input.trim().split(" ");
            let newInput: string;

            if (!args.length) {
              newInput = autocompleteOptions[autocompleteIndex];
            } else {
              args[args.length - 1] = autocompleteOptions[autocompleteIndex];
              newInput = [cmd, ...args].join(" ");
            }

            setInput(newInput);
            setShowAutocomplete(false);
          }
          break;

        case "ArrowUp":
          e.preventDefault();
          if (showAutocomplete) {
            setAutocompleteIndex((prev) =>
              prev > 0 ? prev - 1 : autocompleteOptions.length - 1,
            );
          } else if (commandHistory.length > 0) {
            const newIndex =
              historyIndex === -1
                ? commandHistory.length - 1
                : Math.max(0, historyIndex - 1);
            setHistoryIndex(newIndex);
            setInput(commandHistory[newIndex]);
          }
          break;

        case "ArrowDown":
          e.preventDefault();
          if (showAutocomplete) {
            setAutocompleteIndex(
              (prev) => (prev + 1) % autocompleteOptions.length,
            );
          } else if (historyIndex !== -1) {
            const newIndex =
              historyIndex < commandHistory.length - 1 ? historyIndex + 1 : -1;
            setHistoryIndex(newIndex);
            setInput(newIndex === -1 ? "" : commandHistory[newIndex]);
          }
          break;

        case "Escape":
          setShowAutocomplete(false);
          break;
      }
    },
    [
      input,
      executeCommand,
      autocompleteOptions,
      autocompleteIndex,
      setInput,
      setShowAutocomplete,
      showAutocomplete,
      setAutocompleteIndex,
      commandHistory,
      historyIndex,
      setHistoryIndex,
    ],
  );

  return { handleInputChange, handleKeyDown };
};
