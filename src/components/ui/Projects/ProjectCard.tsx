import { useRouter } from "next/navigation";
import { FC, useState } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  link: string;
  image: string;
  publicationLink?: string;
  techStack?: string[];
  yearAccomplished?: string;
  role?: string;
}

const ProjectCard: FC<ProjectCardProps> = ({
  title,
  description,
  link,
  image,
  publicationLink,
  techStack,
  yearAccomplished,
  role,
}) => {
  const router = useRouter();
  const [showDetails, setShowDetails] = useState(false);

  const handleCardClick = () => {
    setShowDetails(!showDetails);
  };

  const handleNavigation = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/projects${link}`);
  };

  const getPublicationLinkDisplay = (url?: string) => {
    if (!url) return null;

    if (url.includes("medium.com")) {
      return { text: "Medium", href: url };
    } else if (url.includes("github.com")) {
      return { text: "GitHub", href: url };
    } else if (url.includes("figma.com")) {
      return { text: "Figma", href: url };
    } else if (url.includes("youtube.com") || url.includes("youtu.be")) {
      return { text: "YouTube", href: url };
    } else {
      return { text: "Website", href: url };
    }
  };

  const publicationDisplay = getPublicationLinkDisplay(publicationLink);

  return (
    <div
      className="flex flex-col w-[280px] lg:w-[320px] h-auto mx-auto my-6 border border-suggestion rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-200 text-sm lg:text-base"
      onClick={handleCardClick}
    >
      <div className="h-[160px] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <button
          onClick={handleNavigation}
          className="text-left text-lg font-semibold text-link hover:text-linkAlt transition-colors duration-200 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded"
        >
          {title}
        </button>

        <p className="text-sm text-title mb-3">{description}</p>

        {showDetails && (
          <div className="mt-3 pt-3 space-y-2">
            <p>-----------------------------</p>
            {yearAccomplished && (
              <div className="text-sm">
                <span className="font-semibold text-title">Year: </span>
                <span className="text-primary">{yearAccomplished}</span>
              </div>
            )}

            {role && (
              <div className="text-sm">
                <span className="font-semibold text-title">Role: </span>
                <span className="text-primary">{role}</span>
              </div>
            )}

            {techStack && techStack.length > 0 && (
              <div className="text-sm">
                <span className="font-semibold text-title">Tech Stack: </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {publicationDisplay && (
              <div className="text-sm">
                <span className="font-semibold text-title">Publication: </span>
                <a
                  href={publicationDisplay.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-link hover:text-linkAlt transition-colors duration-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  {publicationDisplay.text}
                </a>
              </div>
            )}
          </div>
        )}

        {(yearAccomplished || role || techStack || publicationLink) && (
          <div className="mt-2 text-xs text-suggestion">
            Click to {showDetails ? "hide" : "show"} details
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
