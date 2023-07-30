import { useContext } from "react";
import { SearchContext } from "../HOC/SearchProvider";

export const useSearch = () => {
  return useContext(SearchContext)
}