export function wordCount(text: string): number {
  let count = 0;
  let prev = 1;
  const len = text.length;

  for (let i = 0; i < len; i++) {
    const curr = text.charCodeAt(i) <= 32 ? 1 : 0;
    count += prev & (curr ^ 1);
    prev = curr;
  }

  return count;
}
