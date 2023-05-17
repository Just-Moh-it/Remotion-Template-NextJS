/**
 * Similar to lodash's sample function, but without the lodash dependency.
 * @param arr The array to sample from.
 * @returns A random element from the array.
 */
export const sample = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];
