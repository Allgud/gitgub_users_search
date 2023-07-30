import { MdOutlineClose } from 'react-icons/md'
import styles from './modal.module.css'

type ModalProps = {
  avatar?: string,
  login?: string,
  name?: string,
  reposCount?: number,
  created?: string | Date,
  pageLink?: string,
  close: () => void
}

const Modal = ({ avatar, login, name, reposCount, created = new Date(), pageLink, close }: ModalProps) => {
  const date = new Intl.DateTimeFormat('ru-Ru', {
    day: 'numeric',
    month: "long",
    year: 'numeric'
  }).format(new Date(created))
  

  return (
    <div className={styles.modal}>
      <div className={styles.modal__content}>
        <img
          src={avatar}
          alt="Изображение пользователя"
          className={styles.user__image}
        />
        <div className={styles.user__content}>
          <h4 className={styles.user__login}>{login}</h4>
          <p className={styles.user__name}>Имя: {name || login}</p>
          <p className={styles.users__repos_count}>Количество репозиториев: {reposCount}</p>
          <p className={styles.user__created}>Зарегистрирован: {date}</p>
          <a href={pageLink} target="_blank" className={styles.user__page_link} rel="noreferrer">{pageLink}</a>
          <MdOutlineClose className={styles.modal__close} onClick={() => close()}/>
        </div>
      </div>
    </div>
  )
}

export default Modal