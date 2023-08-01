import { useState, useEffect } from 'react'
import SearchInput from '../SearchInput';
import UserCard from '../UserCard';
import Pagination from '../Pagination'
import Sorting from '../Sorting';
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
  const [searchValue, setSearchValue] = useState<string>('')

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
    if (searchValue && order) {
      request(`${SEARCH_API}?q=${searchValue}&sort=repositories&order=${order}&per_page=${PAGE_CARDS_COUNT}`)
      return
    }

    if (order && !searchValue) {
      request(`${SEARCH_API}?q=Q&sort=repositories&order=${order}&per_page=${PAGE_CARDS_COUNT}`)
      return
    }

    if (searchValue && !order) {
      searchUser(searchValue)
      return
    }    
    
    if (!searchValue && !order) {
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

  const onTextChange = (str: string) => {
    setSearchValue(str)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className={styles.app__wrapper}>
      <div className={styles.app__container}>
        <SearchInput
          onSearchClick={searchUser}
          text={searchValue}
          onTextChange={onTextChange}
        />
        <Sorting onSortingChange={sortUsers}/>
        <ul className={styles.results__list}>
          {users?.map(user => (
            <li
              key={user.id}
              className={styles.list__item}
              onClick={() => togglePage(3)}
              data-testid="user-item"
            >
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
