/** Splits `text` around `word` so the word can be set in italics. */
export function withEmphasis(text, word) {
  if (!word || !text.includes(word)) return text;
  const [before, after] = text.split(word);
  return (
    <>
      {before}
      <em>{word}</em>
      {after}
    </>
  );
}

/** "1" -> "01" */
export const pad2 = (n) => String(n).padStart(2, '0');
