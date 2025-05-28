export interface OutputLine {
  type: "command" | "output" | "error";
  text: string;
}

export interface TerminalConfig {
  endpoints: string[];
  commands: string[];
}
