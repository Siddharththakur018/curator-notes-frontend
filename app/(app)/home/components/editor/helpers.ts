export function getWordCount(text: string): number {
  return text.trim()
    ? text.trim().split(/\s+/).filter(Boolean).length
    : 0;
}

export function formatDate(): string {
  return new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}