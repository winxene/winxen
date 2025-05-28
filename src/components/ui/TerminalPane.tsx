import { useCommandExecutor } from "@/hooks/terminal/useCommandExecutor";
import { useInputHandlers } from "@/hooks/terminal/useInputHandlers";
import { OutputLine } from "@/types/terminal";
import { getCurrentSuggestion } from "@/utils/terminal/terminalUtils";
import { useState, useEffect, useRef } from "react";
import TerminalLine from "./Terminal/TerminalLine";
import { useSyncTerminalPath } from "@/hooks/terminal/useSyncTerminalPath";
import TerminalHistoryPane from "./Terminal/TerminalHistoryPane";

interface TerminalPaneProps {
  setShowContent: (show: boolean) => void;
}

const TerminalPane = ({ setShowContent }: TerminalPaneProps) => {
  const [currentPath, setCurrentPath] = useState("~");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<OutputLine[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [showAutocomplete, setShowAutocomplete] = useState<boolean>(false);
  const [autocompleteOptions, setAutocompleteOptions] = useState<string[]>([]);
  const [autocompleteIndex, setAutocompleteIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useSyncTerminalPath({ setCurrentPath });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const { executeCommand } = useCommandExecutor({
    currentPath,
    setOutput,
    commandHistory,
    setCommandHistory,
    setHistoryIndex,
    setInput,
    setShowAutocomplete,
    setShowContent,
  });

  const { handleInputChange, handleKeyDown } = useInputHandlers({
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
  });

  const suggestion = getCurrentSuggestion({
    input,
    showAutocomplete,
    autocompleteOptions,
    autocompleteIndex,
  });

  return (
    <div className="flex flex-col items-left justify-start w-[70%] text-primary space-y-2 font-mono">
      <TerminalHistoryPane currentPath={currentPath} output={output} />
      <TerminalLine currentPath={currentPath} />

      <div className="relative">
        <div className="flex flex-row items-center space-x-2">
          <p className="text-blue-400 text-left">→</p>
          <div className="relative flex-1">
            <div className="absolute inset-0 pointer-events-none text-gray-500 whitespace-pre">
              {suggestion}
            </div>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="w-full caret-primary outline-none border-none bg-transparent text-primary focus:outline-none focus:ring-0 relative z-10"
              placeholder="Type a command..."
              style={{ backgroundColor: "transparent" }}
            />
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-4">
        Type{" "}
        <a href="/help" className="font-bold hover:text-linkAlt">
          help
        </a>{" "}
        for command details | Use <span className="font-bold">Tab</span> to
        accept suggestion | Use <span className="font-bold">↑↓ </span> for
        command history
        {showAutocomplete && autocompleteOptions.length > 1 && (
          <span className="font-bold">
            {" "}
            | Use ↑↓ to cycle suggestions ({autocompleteIndex + 1}/
            {autocompleteOptions.length})
          </span>
        )}
      </p>
    </div>
  );
};

export default TerminalPane;
