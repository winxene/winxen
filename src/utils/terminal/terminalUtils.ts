import { BASE_URL, TERMINAL_CONFIG } from "@/constants/terminal/terminalConfig";

export const getFullUrl = (currentPath: string): string => {
  if (currentPath === "~") return BASE_URL;
  return `${BASE_URL}/${currentPath}`;
};

export const getAutocompleteOptions = (input: string): string[] => {
  const [cmd, ...args] = input.trim().split(" ");

  if (!args.length) {
    return TERMINAL_CONFIG.commands.filter((command) =>
      command.startsWith(cmd.toLowerCase()),
    );
  } else if (cmd.toLowerCase() === "cd") {
    const lastArg = args[args.length - 1];
    return TERMINAL_CONFIG.endpoints.filter((endpoint) =>
      endpoint.startsWith(lastArg.toLowerCase()),
    );
  }

  return [];
};

export const getCurrentSuggestion = (
  input: string,
  showAutocomplete: boolean,
  autocompleteOptions: string[],
  autocompleteIndex: number,
): string => {
  if (!showAutocomplete || autocompleteOptions.length === 0) return "";

  const [cmd, ...args] = input.trim().split(" ");
  const currentOption = autocompleteOptions[autocompleteIndex];

  if (!args.length) {
    return input + currentOption.slice(cmd.length);
  } else if (cmd.toLowerCase() === "cd") {
    const lastArg = args[args.length - 1];
    const beforeLastArg = input.substring(0, input.lastIndexOf(lastArg));
    return beforeLastArg + currentOption;
  }

  return input;
};
