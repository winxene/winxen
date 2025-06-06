import { FC } from "react";
import FormattedText from "./FormattedText";

interface SectionListProps {
  title: string;
  items: string[];
}

export const SectionList: FC<SectionListProps> = ({ title, items }) => (
  <div className="space-y-8">
    <p className="text-title">{title}:</p>
    <ul className="list-disc pl-6">
      {items.map((item, index) => (
        <li key={index} className="text-sm lg:text-base">
          <FormattedText text={item} />
        </li>
      ))}
    </ul>
  </div>
);
