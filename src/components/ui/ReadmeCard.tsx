import { ReactNode } from "react";

type ReadmeCardProps = {
  children: ReactNode;
};

const ReadmeCard = ({ children }: ReadmeCardProps) => {
  return (
    <div className="flex flex-col min-w-full mx-0 md:mx-24 2xl:mx-96 border border-suggestion rounded p-5">
      <p className="text-subtitle text-xs md:text-sm py-4">README.md</p>
      {children}
    </div>
  );
};

export default ReadmeCard;
