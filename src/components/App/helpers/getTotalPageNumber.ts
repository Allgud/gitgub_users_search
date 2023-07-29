import { PAGE_CARDS_COUNT, MAX_USERS } from "../../../constants"

export const getTotalPageNumber = (num: number): number => {
  if(num > MAX_USERS) return Math.ceil(MAX_USERS / PAGE_CARDS_COUNT)
  else return Math.ceil(num / PAGE_CARDS_COUNT)
}