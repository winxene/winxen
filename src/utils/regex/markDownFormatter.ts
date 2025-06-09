export type ParsedSegment =
  | { type: "text"; content: string }
  | { type: "bold"; content: string }
  | { type: "italic"; content: string }
  | { type: "bold-italic"; content: string }
  | { type: "strikethrough"; content: string }
  | { type: "underline"; content: string }
  | { type: "code"; content: string }
  | { type: "link"; content: string; href: string }
  | { type: "image"; content: string; src: string }
  | { type: "heading"; content: string; level: number }
  | { type: "blockquote"; content: string }
  | { type: "list-item"; content: string; ordered: boolean }
  | { type: "horizontal-rule" }
  | { type: "line-break" }
  | { type: "year"; content: string };

export function markDownFormatter(text: string): ParsedSegment[] {
  const lines = text.split("\n");
  const parts: ParsedSegment[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (/^-{3,}$|^\*{3,}$|^_{3,}$/.test(line.trim())) {
      parts.push({ type: "horizontal-rule" });
      continue;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      parts.push({
        type: "heading",
        content: headingMatch[2],
        level: headingMatch[1].length,
      });
      continue;
    }

    const blockquoteMatch = line.match(/^>\s*(.+)$/);
    if (blockquoteMatch) {
      parts.push({
        type: "blockquote",
        content: blockquoteMatch[1],
      });
      continue;
    }

    const orderedListMatch = line.match(/^\d+\.\s+(.+)$/);
    if (orderedListMatch) {
      parts.push({
        type: "list-item",
        content: orderedListMatch[1],
        ordered: true,
      });
      continue;
    }

    const unorderedListMatch = line.match(/^[-*+]\s+(.+)$/);
    if (unorderedListMatch) {
      parts.push({
        type: "list-item",
        content: unorderedListMatch[1],
        ordered: false,
      });
      continue;
    }

    if (line.trim()) {
      parts.push(...parseInlineFormatting(line));
    }

    if (i < lines.length - 1 && line.trim()) {
      parts.push({ type: "line-break" });
    }
  }

  return parts;
}

function parseInlineFormatting(text: string): ParsedSegment[] {
  const regex =
    /(\b\d{4}(?:\s*-\s*(?:\d{4}|Now))?\b)|(!?\[([^\]]+)\]\(([^)]+)\))|(\*\*\*(.+?)\*\*\*)|(\*\*(.+?)\*\*)|(\*(?!\*)([^*\n]+?)\*)|(__(.+?)__)|(_(.+?)_)|(~~(.+?)~~)|(`(.+?)`)|(\+\+(.+?)\+\+)/g;

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
      if (match[2].startsWith("!")) {
        parts.push({
          type: "image",
          content: match[3],
          src: match[4],
        });
      } else {
        parts.push({
          type: "link",
          content: match[3],
          href: match[4],
        });
      }
    } else if (match[5]) {
      parts.push({
        type: "bold-italic",
        content: match[6],
      });
    } else if (match[7]) {
      parts.push({
        type: "bold",
        content: match[8],
      });
    } else if (match[9]) {
      parts.push({
        type: "italic",
        content: match[10],
      });
    } else if (match[11]) {
      parts.push({
        type: "bold",
        content: match[12],
      });
    } else if (match[13]) {
      parts.push({
        type: "italic",
        content: match[14],
      });
    } else if (match[15]) {
      parts.push({
        type: "strikethrough",
        content: match[16],
      });
    } else if (match[17]) {
      parts.push({
        type: "code",
        content: match[18],
      });
    } else if (match[19]) {
      parts.push({
        type: "underline",
        content: match[20],
      });
    }

    currentIndex = regex.lastIndex;
  }

  if (currentIndex < text.length) {
    parts.push({ type: "text", content: text.slice(currentIndex) });
  }

  return parts;
}
