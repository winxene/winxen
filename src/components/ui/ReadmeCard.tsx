import { ReactNode } from "react";

type ReadmeCardProps = {
  children: ReactNode;
};

const ReadmeCard = ({ children }: ReadmeCardProps) => {
  return (
    <div className="flex flex-col w-[70%] mx-3 my-24 md:mt-0 md:mx-auto border border-suggestion rounded p-5">
      <p className="text-subtitle text-xs md:text-sm py-4">README.md</p>
      {children}
    </div>
  );
};

export default ReadmeCard;
