import Button from '../Button'

import styles from './search-input.module.css'

const SearchInput = () => {
  return (
    <div className={styles.search__group}>
      <input type="text" className={styles.search__input} placeholder='Поиск...'/>
      <Button text='Найти' onClick={() => {}}/>
    </div>
  )
}

export default SearchInput