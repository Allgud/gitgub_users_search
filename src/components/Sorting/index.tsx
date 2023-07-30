import styles from './sorting.module.css'
import RadioButton from '../RadioButton'
import { RadioButtonsLabels, Order } from '../../constants'
import { useState } from 'react'

type SortingProps = {
  onSortingChange: (arg1: string) => void
}

const Sorting = ({onSortingChange}: SortingProps) => {
  const [currentRadio, setCurrentRadio] = useState<string>(RadioButtonsLabels.nevermind)

  const toggleRadio = (value: string) => {
    setCurrentRadio(value)
    if (value === RadioButtonsLabels.nevermind) {
      onSortingChange('')
    }

    if (value === RadioButtonsLabels.productive) {
      onSortingChange(Order.desc)
      return
    }

    if (value === RadioButtonsLabels.lazy) {
      onSortingChange(Order.asc)
      return
    }
  }

  return (
    <div className={styles.sorting__container}>
      <span className={styles.sorting__title}>Сортировка:</span>
      <RadioButton
        title={RadioButtonsLabels.nevermind}
        id={RadioButtonsLabels.nevermind}
        name='sorting'
        value={RadioButtonsLabels.nevermind}
        checked={currentRadio === RadioButtonsLabels.nevermind}
        onChange={toggleRadio}
      />
      <RadioButton
        title={RadioButtonsLabels.productive}
        id={RadioButtonsLabels.productive}
        name='sorting'
        value={RadioButtonsLabels.productive}
        checked={currentRadio === RadioButtonsLabels.productive}
        onChange={toggleRadio}
      />
      <RadioButton
        title={RadioButtonsLabels.lazy}
        id={RadioButtonsLabels.lazy}
        name='sorting'
        value={RadioButtonsLabels.lazy}
        checked={currentRadio === RadioButtonsLabels.lazy}
        onChange={toggleRadio}
      />
    </div>
  )
}

export default Sorting