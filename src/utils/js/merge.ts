export function merge<O extends object>(obj: O) {
  return <K extends object>(objK: K) => ({
    ...obj,
    ...objK,
  });
}
