import { useState, useEffect } from 'react'
import SearchInput from '../SearchInput';
import UserCard from '../UserCard';
import Pagination from '../Pagination'
import Sorting from '../Sorting';
import { useSearch } from '../../hooks/useSearch';
import { SEARCH_API, PAGE_CARDS_COUNT, DEFAULT_PAGE_NUMBER, USER_API } from "../../constants";
import { OneUser, User } from '../../models';
import { getTotalPageNumber } from './helpers/getTotalPageNumber';
import styles from './app.module.css'
import Modal from '../Modal';

const App = () => {
  const [users, setUsers] = useState<User[] | []>([])
  const [totalPages, setTotalPages] = useState<number>(DEFAULT_PAGE_NUMBER)
  const [currentUser, setCurrentUser] = useState<OneUser | null>(null)
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const { text } = useSearch()

  const request = async (queryString: string, sorting: boolean = false) => {
    const response = await fetch(queryString)
    const result = await response.json()
    setTotalPages(getTotalPageNumber(result.total_count))
    setUsers(result.items)
  }

  const getData = async () => {
    request(`${SEARCH_API}?q=Q&per_page=${PAGE_CARDS_COUNT}`)
  }

  const searchUser = async (text: string) => {
    request(`${SEARCH_API}?q=${text}&per_page=${PAGE_CARDS_COUNT}`)
  }

  const togglePage = async (page: number) => {
    request(`${SEARCH_API}?q=Q&per_page=${PAGE_CARDS_COUNT}&page=${page}`)
  }

  const sortUsers = async (order: string = '') => {
    if (text && order) {
      request(`${SEARCH_API}?q=${text}&sort=repositories&order=${order}&per_page=${PAGE_CARDS_COUNT}`)
      return
    }

    if (order && !text) {
      request(`${SEARCH_API}?q=Q&sort=repositories&order=${order}&per_page=${PAGE_CARDS_COUNT}`)
      return
    }

    if (text && !order) {
      searchUser(text)
      return
    }    
    
    if (!text && !order) {
      getData()
      return
    }
  }

  const getUserInfo = async (username: string) => {
    const response = await fetch(`${USER_API}/${username}`)
    const user = await response.json()
    setCurrentUser(user)
    setModalVisible(true)
  }

  const modalClose = () => {
    setModalVisible(false)
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
                avatar={user.avatar_url}
                onUserClick={getUserInfo}
              />
            </li>
          ))}
        </ul>
        <Pagination pageCount={totalPages} onPageToggle={togglePage} />  
      </div>
      {
        modalVisible &&
        <Modal
          avatar={currentUser?.avatar_url}
          login={currentUser?.login}
          name={currentUser?.name}
          reposCount={currentUser?.public_repos}
          created={currentUser?.created_at}
          pageLink={currentUser?.html_url}
          close={modalClose}
        />
      }
    </div>
  );
}

export default App;
