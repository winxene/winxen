const fetchAsciiArt = async (textSrc: String) => {
  const response = await fetch(textSrc.toString());
  if (!response.ok) {
    throw new Error("Failed to fetch ASCII art");
  }
  const data = await response.text();
  return data;
};

export default fetchAsciiArt;
