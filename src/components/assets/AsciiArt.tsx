import { FC, useEffect, useState } from "react";

interface AsciiArtProps {
  src: string;
}

const colorClasses = [
  "text-subtitle",
  "text-primary",
  "text-error",
  "text-domain",
  "text-link",
];

const AsciiArt: FC<AsciiArtProps> = ({ src }: AsciiArtProps) => {
  const [asciiArt, setAsciiArt] = useState<string[]>([]);
  const [visibleLines, setVisibleLines] = useState(0);
  const [isColor, setIsColor] = useState(false);

  useEffect(() => {
    fetch(src)
      .then((res) => res.text())
      .then((text) => setAsciiArt(text.split("\n")))
      .catch(console.error);
  }, [src]);

  useEffect(() => {
    if (asciiArt.length === 0) return;
    setVisibleLines(0);

    let v = 0;
    let delay = 60;
    const minDelay = 10;
    const acceleration = 0.92;

    function revealLine() {
      setVisibleLines(v + 1);
      v++;
      if (v < asciiArt.length) {
        delay = Math.max(minDelay, delay * acceleration);
        setTimeout(revealLine, delay);
      }
    }

    revealLine();

    return () => { };
  }, [asciiArt]);

  const handleToggle = () => setIsColor((prev) => !prev);

  return (
    <pre
      className="text-[5px] text-center lg:text-xs whitespace-pre select-none cursor-pointer overflow-visible"
      onClick={handleToggle}
      title="Toggle color/plain"
    >
      {asciiArt.slice(0, visibleLines).map((line, idx) => {
        const total = asciiArt.length;
        const segment = Math.floor((idx / total) * 5);
        const colorClass = isColor
          ? colorClasses[Math.min(segment, colorClasses.length - 1)]
          : "";
        return (
          <span key={idx} className={`${colorClass} font-bold`}>
            {line}
            {"\n"}
          </span>
        );
      })}
    </pre>
  );
};

export default AsciiArt;
