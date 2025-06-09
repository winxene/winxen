export const getPublicationLinkDisplay = (url?: string) => {
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
