import { useState, useEffect } from 'react'
import SearchInput from '../SearchInput';
import UserCard from '../UserCard';
import Pagination from '../Pagination'
import Sorting from '../Sorting';
import { PUBLIC_API, PAGE_CARDS_COUNT, DEFAULT_PAGE_NUMBER } from "../../constants";
import { User } from '../../models';
import { getTotalPageNumber } from './helpers/getTotalPageNumber';
import styles from './app.module.css'

const App = () => {
  const [users, setUsers] = useState<User[] | []>([])
  const [totalPages, setTotalPages] = useState<number>(DEFAULT_PAGE_NUMBER)

  const request = async (queryString: string, sorting: boolean = false) => {
    const response = await fetch(queryString)
    const result = await response.json()
    setTotalPages(getTotalPageNumber(result.total_count))
    setUsers(result.items)
  }

  const getData = async () => {
    request(`${PUBLIC_API}?q=Q&per_page=${PAGE_CARDS_COUNT}`)
  }

  const searchUser = async (text: string) => {
    request(`${PUBLIC_API}?q=${text}&sort=repositories&per_page=${PAGE_CARDS_COUNT}`)
  }

  const togglePage = async (page: number) => {
    request(`${PUBLIC_API}?q=Q&per_page=${PAGE_CARDS_COUNT}&page=${page}`)
  }

  const sortUsers = async (order: string = '') => {
    if (order) {
      request(`${PUBLIC_API}?q=Q&sort=repositories&order=${order}&per_page=${PAGE_CARDS_COUNT}`)
      return
    }
    getData()
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className={styles.app__wrapper}>
      <div className={styles.app__container}>
        <SearchInput onSearchClick={searchUser} />
        <Sorting onSortingChange={sortUsers}/>
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
        <Pagination pageCount={totalPages} onPageToggle={togglePage } />
      </div>
    </div>
  );
}

export default App;
