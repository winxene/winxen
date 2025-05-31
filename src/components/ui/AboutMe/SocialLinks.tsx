import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SOCIAL_LINKS } from "@/constants/about-me/aboutMe";

export const SocialLinks: FC = () => (
  <div className="flex flex-row space-x-10 justify-start">
    {SOCIAL_LINKS.map(({ href, icon, color, label }) => (
      <a
        key={label}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={color}
        aria-label={label}
      >
        <FontAwesomeIcon icon={icon} className="fa-xl" />
      </a>
    ))}
  </div>
);
