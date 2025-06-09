import { COLOURS } from "@/constants/about-me/aboutMe";
import { extractColorCode } from "@/utils/regex/extractColourCode";
import { FC, useState } from "react";

const ColourPalette: FC<{ className?: string }> = ({ className = "" }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (colorClass: string, index: number) => {
    const code = extractColorCode(colorClass);
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className={`${className}`}>
      <div className="grid grid-rows-2 grid-cols-8 min-w-full h-14 lg:h-20 gap-0 relative">
        {COLOURS.map((color, index) => {
          const displayCode = extractColorCode(color);

          return (
            <div
              key={index}
              className={`relative group h-full w-full cursor-pointer ${color}`}
              onClick={() => handleCopy(color, index)}
            >
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs text-white bg-black rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                {copiedIndex === index ? "Copied!" : displayCode}
              </span>

              <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-black opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ColourPalette;
