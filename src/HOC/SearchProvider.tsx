import { useState, createContext, ReactNode } from 'react'

interface ISearchContext {
  text: string,
  onTextChange: (arg1: string) => void,
}

export const SearchContext = createContext<ISearchContext>({
  text: '',
  onTextChange: () => {}
})

type SearchProviderProps = {
  children: ReactNode
}

const SearchProvider = ({children}: SearchProviderProps) => {
  const [text, setText] = useState<string>('')

  const onTextChange = (str: string) => {
    setText(str)
  }

  return (
    <SearchContext.Provider value={{ text, onTextChange }}>{children}</SearchContext.Provider>
  )
}

export default SearchProvider