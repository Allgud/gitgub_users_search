import styles from './user-card.module.css'

type UserProps = {
  login: string,
  id: number,
  avatar: string,
}

const UserCard = ({login, id, avatar}: UserProps) => {
  return (
    <div className={styles.card__wrapper}>
      <div className={styles.card__container}>
        <img src={avatar} alt="Изображение пользователя" className={styles.card__image} />
        <span className={styles.card__title}>{login}</span>
      </div>  
    </div>
  )
}

export default UserCard