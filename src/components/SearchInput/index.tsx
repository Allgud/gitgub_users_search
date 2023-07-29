import Button from '../Button'
import { useState } from 'react'
import styles from './search-input.module.css'

type SearchInputProps = {
  onSearchClick: (arg1: string) => {};
}

const SearchInput = ({ onSearchClick }: SearchInputProps) => {
  const [text, setText] = useState<string>('')

  const onClickButton = () => {
    onSearchClick(text)
    setText('')
  }

  return (
    <div className={styles.search__group}>
      <input
        type="text"
        className={styles.search__input}
        placeholder='Поиск...'
        value={text}
        onChange={(evt) => setText(evt.target.value)} />
      <Button text='Найти' onClick={() => onClickButton()}/>
    </div>
  )
}

export default SearchInput