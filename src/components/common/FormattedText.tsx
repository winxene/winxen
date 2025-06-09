import { markDownFormatter } from "@/utils/regex/markDownFormatter";
import React, { FC } from "react";

interface Props {
  text: string;
}

const FormattedText: FC<Props> = ({ text }) => {
  const segments = markDownFormatter(text);

  return (
    <div>
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

          case "italic":
            return (
              <em key={i} className="italic">
                {seg.content}
              </em>
            );

          case "bold-italic":
            return (
              <strong key={i} className="font-bold italic">
                {seg.content}
              </strong>
            );

          case "strikethrough":
            return (
              <del key={i} className="line-through">
                {seg.content}
              </del>
            );

          case "underline":
            return (
              <u key={i} className="underline">
                {seg.content}
              </u>
            );

          case "code":
            return (
              <code
                key={i}
                className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono"
              >
                {seg.content}
              </code>
            );

          case "link":
            return (
              <a
                key={i}
                href={seg.href}
                className="text-link hover:text-linkAlt font-normal underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {seg.content}
              </a>
            );

          case "image":
            return (
              <img
                key={i}
                src={seg.src}
                alt={seg.content}
                className="max-w-full h-auto"
              />
            );

          case "heading":
            const HeadingTag = `h${seg.level}` as keyof JSX.IntrinsicElements;
            const headingClasses = {
              1: "text-4xl font-bold mb-4",
              2: "text-3xl font-bold mb-3",
              3: "text-2xl font-bold mb-2",
              4: "text-xl font-bold mb-2",
              5: "text-lg font-bold mb-1",
              6: "text-base font-bold mb-1",
            };

            return (
              <HeadingTag
                key={i}
                className={
                  headingClasses[seg.level as keyof typeof headingClasses]
                }
              >
                {seg.content}
              </HeadingTag>
            );

          case "blockquote":
            return (
              <blockquote
                key={i}
                className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-2"
              >
                {seg.content}
              </blockquote>
            );

          case "list-item":
            return seg.ordered ? (
              <li key={i} className="ml-6 list-decimal">
                {seg.content}
              </li>
            ) : (
              <li key={i} className="ml-6 list-disc">
                {seg.content}
              </li>
            );

          case "horizontal-rule":
            return <hr key={i} className="border-t border-gray-300 my-4" />;

          case "line-break":
            return <br key={i} />;

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
    </div>
  );
};

export default FormattedText;
