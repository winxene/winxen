import { BASE_URL } from "@/constants/terminal/terminalConfig";
import { FC } from "react";

interface TerminalLineProps {
  currentPath: string;
}

const TerminalLine: FC<TerminalLineProps> = ({
  currentPath,
}: TerminalLineProps) => {
  return (
    <div className="text-left text-sm md:text-base">
      <span className="text-link">Winxen</span> |{" "}
      <span className="text-subtitle">{currentPath}</span> on{" "}
      <a href="/" className="text-domain hover:underline">
        {BASE_URL}
      </a>
    </div>
  );
};

export default TerminalLine;
