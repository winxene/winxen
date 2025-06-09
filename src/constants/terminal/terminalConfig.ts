import { TerminalConfig } from "@/types/terminal";

export const TERMINAL_CONFIG: TerminalConfig = {
  endpoints: ["help", "about-me", "projects"],
  commands: ["ls", "cd", "pwd", "clear"],
};

export const TERMINAL_HOME_PATH = "~";

export const MESSAGES = {
  HOME_CHANGED: "Changed to home directory",
  NO_ITEMS: "No items found in this directory",
  COMMAND_NOT_FOUND: (cmd: string) => `command not found: ${cmd}`,
  NO_DIRECTORY: (dir: string) => `cd: ${dir}: No such directory`,
  CHANGED_TO: (dir: string) => `Changed to ${dir}`,
} as const;

export const BASE_URL = "winxen.vercel.app";
