export interface OutputLine {
  type: "command" | "output" | "error";
  text: string;
}

export interface TerminalState {
  currentPath: string;
  input: string;
  output: OutputLine[];
  commandHistory: string[];
  historyIndex: number;
  showAutocomplete: boolean;
  autocompleteOptions: string[];
  autocompleteIndex: number;
}

export interface CommandHandlers {
  executeCommand: (command: string) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface AutocompleteHelpers {
  getAutocompleteOptions: (input: string) => string[];
  getCurrentSuggestion: () => string;
}

export interface TerminalConfig {
  endpoints: string[];
  commands: string[];
}
