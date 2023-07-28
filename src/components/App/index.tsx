import SearchInput from '../SearchInput';
import styles from './app.module.css'

const App = () => {
  return (
    <div className={styles.app__wrapper}>
      <div className={styles.app__container}>
        <SearchInput />
      </div>
    </div>
  );
}

export default App;
