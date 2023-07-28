import SearchInput from '../SearchInput';
import styles from './app.module.css'
import { useState, useEffect } from 'react'
import { PUBLIC_API } from '../../constants';
import { User } from '../../models';
import UserCard from '../UserCard';

const App = () => {
  const [users, setUsers] = useState<User[] | []>([])

  useEffect(() => {
    fetch(`${PUBLIC_API}?q=Q&per_page=32`)
      .then(data => data.json())
      .then(res => setUsers(res.items))
  }, [])

  return (
    <div className={styles.app__wrapper}>
      <div className={styles.app__container}>
        <SearchInput />
        <ul className={styles.results__list}>
          {users?.map(user => (
            <li key={user.id} className={styles.list__item}>
              <UserCard
                login={user.login}
                id={user.id}
                avatar={user.avatar_url}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
