
export function longProcess() {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve("Long process completed!");
    }, (1000 * 60 * 1));
  });
}