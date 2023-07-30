import styles from './user-card.module.css'

type UserProps = {
  login: string,
  avatar: string,
  onUserClick: (arg1: string) => void;
}

const UserCard = ({login, avatar, onUserClick}: UserProps) => {
  return (
    <div className={styles.card__wrapper}>
      <div className={styles.card__container}>
        <img src={avatar} alt="Изображение пользователя" className={styles.card__image} />
        <span className={styles.card__title} onClick={() => onUserClick(login)}>{login}</span>
      </div>  
    </div>
  )
}

export default UserCard