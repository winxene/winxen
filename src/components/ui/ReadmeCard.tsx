import { FC, ReactNode } from "react";

interface ReadmeCardProps {
  children: ReactNode;
}

const ReadmeCard: FC<ReadmeCardProps> = ({ children }: ReadmeCardProps) => {
  return (
    <div className="flex flex-col w-full mx-3 my-24 md:mx-auto border border-suggestion rounded p-5 overflow-hidden">
      <p className="text-subtitle text-xs md:text-sm py-4">README.md</p>
      {children}
    </div >
  );
};

export default ReadmeCard;