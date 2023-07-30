import Button from '../Button'
import {useSearch} from '../../hooks/useSearch'
import styles from './search-input.module.css'

type SearchInputProps = {
  onSearchClick: (arg1: string) => {};
}

const SearchInput = ({ onSearchClick }: SearchInputProps) => {
  const { text, onTextChange } = useSearch()

  return (
    <div className={styles.search__group}>
      <input
        type="text"
        className={styles.search__input}
        placeholder='Поиск...'
        value={text}
        onChange={(evt) => onTextChange(evt.target.value)} />
      <Button text='Найти' onClick={() => onSearchClick(text)}/>
    </div>
  )
}

export default SearchInput