export const compact = <T>(collection: (T | undefined)[]) =>
  Array.from(new Set(collection)).filter((value): value is T => Boolean(value));
