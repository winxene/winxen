import { OutputLine } from "@/types/terminal";
import { FC } from "react";
import TerminalLine from "./TerminalLine";

interface TerminalHistoryPaneProps {
  currentPath: string;
  text?: string;
  output?: OutputLine[];
}

const TerminalHistoryPane: FC<TerminalHistoryPaneProps> = ({
  currentPath,
  output = [],
  text = "",
}: TerminalHistoryPaneProps) => {
  if (text && output.length === 0) {
    return (
      <div className="w-full max-h-96 overflow-y-auto space-y-1 mb-4">
        <TerminalLine currentPath={currentPath} />
        <p className={"text-left text-sm text-primaryAlt"}>{`$ ${text}`}</p>
      </div>
    );
  } else {
    return (
      <div className="w-full max-h-96 overflow-y-auto space-y-1">
        {output.map((line, index) => (
          <>
            {index % 2 === 0 && <TerminalLine currentPath={currentPath} />}
            <p
              key={index}
              className={`text-left text-sm ${
                line.type === "command"
                  ? "text-primaryAlt"
                  : line.type === "error"
                    ? "text-error"
                    : "text-suggestion"
              }`}
            >
              {line.text}
            </p>
          </>
        ))}
      </div>
    );
  }
};

export default TerminalHistoryPane;
