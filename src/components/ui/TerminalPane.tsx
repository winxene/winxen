import { useState, useEffect, useRef } from "react";

const TerminalPane = () => {
  const [currentPath, setCurrentPath] = useState("~");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [autocompleteOptions, setAutocompleteOptions] = useState([]);
  const [autocompleteIndex, setAutocompleteIndex] = useState(0);
  const inputRef = useRef(null);

  const endpoints = ["help", "about-me", "projects"];
  const commands = ["ls", "cd", "pwd", "clear"];

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const getFullUrl = () => {
    const baseUrl = "winxen.vercel.app";
    if (currentPath === "~") return baseUrl;
    return `${baseUrl}/${currentPath}`;
  };

  const getAutocompleteOptions = (input) => {
    const [cmd, ...args] = input.trim().split(" ");

    if (!args.length) {
      return commands.filter((command) =>
        command.startsWith(cmd.toLowerCase()),
      );
    } else if (cmd.toLowerCase() === "cd") {
      const lastArg = args[args.length - 1];
      return endpoints.filter((endpoint) =>
        endpoint.startsWith(lastArg.toLowerCase()),
      );
    }

    return [];
  };

  const getCurrentSuggestion = () => {
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

  const executeCommand = (command) => {
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
            { type: "output", text: endpoints.join("  ") },
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
        } else if (args[0] === "..") {
          setCurrentPath("~");
          setOutput((prev) => [
            ...prev,
            { type: "output", text: "Changed to home directory" },
          ]);
        } else if (args[0] === "~") {
          setCurrentPath("~");
          setOutput((prev) => [
            ...prev,
            { type: "output", text: "Changed to home directory" },
          ]);
        } else if (endpoints.includes(args[0])) {
          setCurrentPath(args[0]);
          setOutput((prev) => [
            ...prev,
            { type: "output", text: `Changed to ${args[0]}` },
          ]);
        } else {
          setOutput((prev) => [
            ...prev,
            { type: "error", text: `cd: ${args[0]}: No such directory` },
          ]);
        }
        break;

      case "pwd":
        setOutput((prev) => [...prev, { type: "output", text: getFullUrl() }]);
        break;

      case "clear":
        setOutput([]);
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
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    const options = getAutocompleteOptions(value);
    setAutocompleteOptions(options);
    setShowAutocomplete(options.length > 0 && value.trim().length > 0);
    setAutocompleteIndex(0);
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "Enter":
        executeCommand(input);
        break;

      case "Tab":
        e.preventDefault();
        if (autocompleteOptions.length > 0) {
          const [cmd, ...args] = input.trim().split(" ");
          let newInput;

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
  };

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
                  {getFullUrl()}
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
          {getFullUrl()}
        </a>
      </div>

      <div className="relative">
        <div className="flex flex-row items-center space-x-2">
          <p className="text-blue-400 text-left">→</p>
          <div className="relative flex-1">
            <div className="absolute inset-0 pointer-events-none text-gray-500 whitespace-pre">
              {getCurrentSuggestion()}
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
