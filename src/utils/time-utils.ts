export const getDurationFromMs = (durationMs: number): string => {
  const date = new Date(durationMs);

  const minutes = date.getMinutes();
  const seconds = '00' + date.getSeconds();

  return `${minutes}:${seconds.slice(-2)}`;
};
