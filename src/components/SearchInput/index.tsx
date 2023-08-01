import Button from '../Button'
import { MdOutlineClose } from 'react-icons/md'
import styles from './search-input.module.css'

type SearchInputProps = {
  onSearchClick: (arg1: string) => {};
  onTextChange: (arg1: string) => void,
  text: string
}

const SearchInput = ({ onSearchClick, onTextChange, text }: SearchInputProps) => {
  const clearSearchInput = () => {
    onTextChange('')
  }

  return (
    <div className={styles.search__group}>
      <input
        type="text"
        className={styles.search__input}
        placeholder='Поиск...'
        value={text}
        onChange={(evt) => onTextChange(evt.target.value)}
      />
      {
        text &&
        <MdOutlineClose
          className={styles.search__clear}
          onClick={() => clearSearchInput()}
          data-testid="close-btn"
        />
      }
      <Button text='Найти' onClick={() => onSearchClick(text)}/>
    </div>
  )
}

export default SearchInput