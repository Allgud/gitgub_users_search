import styles from './radio-button.module.css'

type RadioButtonProps = {
  title: string,
  id: string,
  name: string,
  value: string,
  checked: boolean,
  onChange: (arg1:string) => void,
}

const RadioButton = ({title, id, name, value, checked, onChange }: RadioButtonProps) => {
  return (
    <label htmlFor={id} className={styles.radio__label}>
      {title}
      <input
        type="radio"
        className={styles.radio__input}
        id={id} name={name}
        value={value} checked={checked}
        onChange={(evt) => onChange(evt.target.value)}
      />
      <div className={styles.indicator} />
    </label>
  )
}

export default RadioButton