import { useCommandExecutor } from "@/hooks/terminal/useCommandExecutor";
import { useInputHandlers } from "@/hooks/terminal/useInputHandlers";
import { OutputLine } from "@/types/terminal";
import {
  getCurrentSuggestion,
  getFullUrl,
} from "@/utils/terminal/terminalUtils";
import { useState, useEffect, useRef } from "react";

const TerminalPane = () => {
  const [currentPath, setCurrentPath] = useState("~");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<OutputLine[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [showAutocomplete, setShowAutocomplete] = useState<boolean>(false);
  const [autocompleteOptions, setAutocompleteOptions] = useState<string[]>([]);
  const [autocompleteIndex, setAutocompleteIndex] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const { executeCommand } = useCommandExecutor({
    currentPath,
    setCurrentPath,
    setOutput,
    commandHistory,
    setCommandHistory,
    setHistoryIndex,
    setInput,
    setShowAutocomplete,
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

  const suggestion = getCurrentSuggestion(
    input,
    showAutocomplete,
    autocompleteOptions,
    autocompleteIndex,
  );

  return (
    <div className="flex flex-col items-left justify-start w-[70%] text-primary space-y-2 font-mono">
      <div className="w-full max-h-96 overflow-y-auto space-y-1">
        {output.map((line, index) => (
          <>
            {index % 2 === 0 && (
              <div className="text-left">
                <span className="text-link">Winxen</span> |{" "}
                <span className="text-subtitle">{currentPath}</span> on{" "}
                <a href="/" className="text-domain hover:underline">
                  {getFullUrl(currentPath)}
                </a>
              </div>
            )}
            <div
              key={index}
              className={`text-left text-sm ${
                line.type === "command"
                  ? "text-primary"
                  : line.type === "error"
                    ? "text-error"
                    : "text-suggestion"
              }`}
            >
              {line.text}
            </div>
          </>
        ))}
      </div>

      <div className="text-left">
        <span className="text-link">Winxen</span> |{" "}
        <span className="text-subtitle">{currentPath}</span> on{" "}
        <a href="/" className="text-domain hover:underline">
          {getFullUrl(currentPath)}
        </a>
      </div>

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

      <div className="text-xs text-gray-500 mt-4">
        Available commands: ls, cd, pwd, clear | Use Tab to accept suggestion |
        Use ↑↓ for command history
        {showAutocomplete && autocompleteOptions.length > 1 && (
          <span>
            {" "}
            | Use ↑↓ to cycle suggestions ({autocompleteIndex + 1}/
            {autocompleteOptions.length})
          </span>
        )}
      </div>
    </div>
  );
};

export default TerminalPane;
