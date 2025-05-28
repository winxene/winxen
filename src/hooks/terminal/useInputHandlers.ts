import { getAutocompleteOptions } from "@/utils/terminal/terminalUtils";
import { useCallback } from "react";

type InputHandlersProps = {
  input: string;
  commandHistory: string[];
  historyIndex: number;
  showAutocomplete: boolean;
  autocompleteOptions: string[];
  autocompleteIndex: number;
};

interface UseInputHandlersProps extends InputHandlersProps {
  setInput: (input: string) => void;
  setHistoryIndex: (index: number) => void;
  setShowAutocomplete: (show: boolean) => void;
  setAutocompleteOptions: (options: string[]) => void;
  setAutocompleteIndex: (
    index: number | ((prevIndex: number) => number),
  ) => void;
  executeCommand: (command: string) => void;
}

export const useInputHandlers = (props: UseInputHandlersProps) => {
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      props.setInput(value);

      const options = getAutocompleteOptions(value);
      props.setAutocompleteOptions(options);
      props.setShowAutocomplete(options.length > 0 && value.trim().length > 0);
      props.setAutocompleteIndex(0);
    },
    [props],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      switch (e.key) {
        case "Enter":
          props.executeCommand(props.input);
          break;

        case "Tab":
          e.preventDefault();
          if (props.autocompleteOptions.length > 0) {
            const [cmd, ...args] = props.input.trim().split(" ");
            const selectedOption =
              props.autocompleteOptions[props.autocompleteIndex];

            const newInput = !args.length
              ? selectedOption
              : [cmd, ...args.slice(0, -1), selectedOption].join(" ");

            props.setInput(newInput);
            props.setShowAutocomplete(false);
          }
          break;

        case "ArrowUp":
          e.preventDefault();
          if (props.showAutocomplete) {
            props.setAutocompleteIndex((prev) =>
              prev > 0 ? prev - 1 : props.autocompleteOptions.length - 1,
            );
          } else if (props.commandHistory.length > 0) {
            const newIndex =
              props.historyIndex === -1
                ? props.commandHistory.length - 1
                : Math.max(0, props.historyIndex - 1);

            props.setHistoryIndex(newIndex);
            props.setInput(props.commandHistory[newIndex]);
          }
          break;

        case "ArrowDown":
          e.preventDefault();
          if (props.showAutocomplete) {
            props.setAutocompleteIndex(
              (prev) => (prev + 1) % props.autocompleteOptions.length,
            );
          } else if (props.historyIndex !== -1) {
            const newIndex =
              props.historyIndex < props.commandHistory.length - 1
                ? props.historyIndex + 1
                : -1;

            props.setHistoryIndex(newIndex);
            props.setInput(
              newIndex === -1 ? "" : props.commandHistory[newIndex],
            );
          }
          break;

        case "Escape":
          props.setShowAutocomplete(false);
          break;
      }
    },
    [props],
  );

  return { handleInputChange, handleKeyDown };
};
