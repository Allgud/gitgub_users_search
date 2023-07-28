export const getArrayNumbers = (num: number):number[] => {
  return Array.from({length: num}, (_, i) => i + 1)
}