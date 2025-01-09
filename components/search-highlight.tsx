import React from "react";

interface HighlightProps {
  text: string;
  query: string;
}

export function Highlight({ text, query }: HighlightProps) {
  if (!query.trim()) {
    return <>{text}</>;
  }

  const normalizeStr = (str: string) => str.toLowerCase().trim();
  const normalizedText = normalizeStr(text);
  const searchWords = normalizeStr(query)
    .split(/\s+/)
    .filter((word) => word.length > 0);
  const parts: { text: string; highlight: boolean }[] = [];

  let lastIndex = 0;

  // Function to find the next match position
  const findNextMatch = (
    startIndex: number
  ): { index: number; length: number } | null => {
    let earliestMatch = { index: Infinity, length: 0 };

    for (const word of searchWords) {
      const matchIndex = normalizedText.indexOf(word, startIndex);
      if (matchIndex !== -1 && matchIndex < earliestMatch.index) {
        earliestMatch = { index: matchIndex, length: word.length };
      }
    }

    return earliestMatch.index !== Infinity ? earliestMatch : null;
  };

  // Find all matches
  let currentIndex = 0;
  while (currentIndex < normalizedText.length) {
    const match = findNextMatch(currentIndex);

    if (!match) {
      // Add remaining text
      if (currentIndex < normalizedText.length) {
        parts.push({
          text: text.slice(currentIndex),
          highlight: false,
        });
      }
      break;
    }

    // Add text before match
    if (match.index > currentIndex) {
      parts.push({
        text: text.slice(currentIndex, match.index),
        highlight: false,
      });
    }

    // Add matched text
    parts.push({
      text: text.slice(match.index, match.index + match.length),
      highlight: true,
    });

    currentIndex = match.index + match.length;
  }

  return (
    <>
      {parts.map((part, i) =>
        part.highlight ? (
          <mark
            key={i}
            className="bg-yellow-200 dark:bg-yellow-800 rounded px-0.5"
          >
            {part.text}
          </mark>
        ) : (
          <span key={i}>{part.text}</span>
        )
      )}
    </>
  );
}
