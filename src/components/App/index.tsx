import SearchInput from '../SearchInput';
import styles from './app.module.css'
import { useState, useEffect, useCallback } from 'react'
import UserCard from '../UserCard';
import Pagination from '../Pagination'
import { PUBLIC_API, PAGE_CARDS_COUNT } from "../../constants";
import { User } from '../../models';

const App = () => {
  const [users, setUsers] = useState<User[] | []>([])

  const togglePage = useCallback(async (page: number) => {
    const response = await fetch(`${PUBLIC_API}?q=Q&per_page=${PAGE_CARDS_COUNT}&page=${page}`)
    const result = await response.json()
    setUsers(result.items)
  }, [])

  const getData = async () => {
    const response = await fetch(`${PUBLIC_API}?q=Q&per_page=${PAGE_CARDS_COUNT}`)
    const result = await response.json()
    setUsers(result.items)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className={styles.app__wrapper}>
      <div className={styles.app__container}>
        <SearchInput />
        <ul className={styles.results__list}>
          {users?.map(user => (
            <li key={user.id} className={styles.list__item} onClick={() => togglePage(3)}>
              <UserCard
                login={user.login}
                id={user.id}
                avatar={user.avatar_url}
              />
            </li>
          ))}
        </ul>
        <Pagination pageCount={5} onPageToggle={togglePage } />
      </div>
    </div>
  );
}

export default App;
