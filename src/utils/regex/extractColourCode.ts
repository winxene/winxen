export const extractColorCode = (bgClass: string) => {
  const match = bgClass.match(/#([0-9A-Fa-f]{6})/);
  return match ? `#${match[1]}` : bgClass;
};
