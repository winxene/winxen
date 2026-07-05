import { FC, ReactNode } from "react";

interface ReadmeCardProps {
  children: ReactNode;
}

const ReadmeCard: FC<ReadmeCardProps> = ({ children }: ReadmeCardProps) => {
  return (
    <div className="flex flex-col w-auto mx-4 my-16 md:my-24 md:mx-auto md:w-full border border-suggestion rounded p-4 md:p-5 overflow-hidden">
      <p className="text-subtitle text-xs md:text-sm py-3 md:py-4">README.md</p>
      {children}
    </div >
  );
};

export default ReadmeCard;