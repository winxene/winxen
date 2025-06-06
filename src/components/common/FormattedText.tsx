import { markDownFormatter } from "@/utils/regex/markDownFormatter";
import React, { FC } from "react";

interface Props {
  text: string;
}

const FormattedText: FC<Props> = ({ text }) => {
  const segments = markDownFormatter(text);

  return (
    <span>
      {segments.map((seg, i) => {
        switch (seg.type) {
          case "text":
            return <span key={i}>{seg.content}</span>;
          case "bold":
            return (
              <strong key={i} className="font-bold">
                {seg.content}
              </strong>
            );
          case "link":
            return (
              <a
                key={i}
                href={seg.href}
                className="text-link hover:text-linkAlt font-normal"
                target="_blank"
                rel="noopener noreferrer"
              >
                {seg.content}
              </a>
            );
          case "year":
            return (
              <strong key={i} className="font-bold">
                {seg.content}
              </strong>
            );
          default:
            return null;
        }
      })}
    </span>
  );
};

export default FormattedText;
