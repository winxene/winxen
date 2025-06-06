export type ParsedSegment =
  | { type: "text"; content: string }
  | { type: "bold"; content: string }
  | { type: "italic"; content: string }
  | { type: "link"; content: string; href: string }
  | { type: "year"; content: string };

export function markDownFormatter(text: string): ParsedSegment[] {
  const regex =
    /(\b\d{4}(?:\s*-\s*(?:\d{4}|Now))?\b)|(\[([^\]]+)\]\(([^)]+)\))|(\*\*(.*?)\*\*)|(\*(?!\*)([^*]+?)\*)/g;

  const parts: ParsedSegment[] = [];
  let currentIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > currentIndex) {
      parts.push({
        type: "text",
        content: text.slice(currentIndex, match.index),
      });
    }

    if (match[1]) {
      parts.push({ type: "year", content: match[1] });
    } else if (match[2]) {
      parts.push({
        type: "link",
        content: match[3],
        href: match[4],
      });
    } else if (match[5]) {
      parts.push({
        type: "bold",
        content: match[6],
      });
    } else if (match[7]) {
      parts.push({
        type: "italic",
        content: match[8],
      });
    }

    currentIndex = regex.lastIndex;
  }

  if (currentIndex < text.length) {
    parts.push({ type: "text", content: text.slice(currentIndex) });
  }

  return parts;
}
