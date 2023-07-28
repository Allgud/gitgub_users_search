import styles from './button.module.css'

type ButtonProps = {
  text: string,
  onClick: () => void
}

const Button = ({text, onClick}: ButtonProps) => {
  return (
    <button onClick={() => onClick()} className={styles.button__wrapper}>
      <span className={styles.button__text}>{text}</span>
    </button>
  )
}

export default Button