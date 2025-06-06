import React, { FC } from "react";

const FormattedText: FC<{ text: string }> = ({ text }) => {
  const parseText = (text: string) => {
    const parts = [];
    let currentIndex = 0;

    const regex =
      /(\b\d{4}(?:\s*-\s*(?:\d{4}|Now))?\b)|(\[([^\]]+)\]\(([^)]+)\))/g;
    let match;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > currentIndex) {
        parts.push(text.slice(currentIndex, match.index));
      }

      if (match[1]) {
        parts.push(
          <strong key={match.index} className="font-bold">
            {match[1]}
          </strong>,
        );
      } else if (match[2]) {
        const linkText = match[3];
        const linkUrl = match[4];
        parts.push(
          <a
            key={match.index}
            href={linkUrl}
            className="text-link hover:text-linkAlt font-normal"
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkText}
          </a>,
        );
      }

      currentIndex = regex.lastIndex;
    }

    if (currentIndex < text.length) {
      parts.push(text.slice(currentIndex));
    }

    return parts;
  };

  return <span>{parseText(text)}</span>;
};

export default FormattedText;
