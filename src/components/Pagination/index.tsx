import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import cn from 'classnames/bind'
import { useState, useEffect } from 'react'
import { getArrayNumbers } from './helpers/getArrayNumbers'
import { DEFAULT_PAGE_NUMBER } from '../../constants'
import styles from './pagination.module.css'

type PaginationProps = {
  pageCount: number,
  onPageToggle: (arg1: number) => {}
}

const cx = cn.bind(styles)

const Pagination = ({ pageCount, onPageToggle }: PaginationProps) => {
  const [active, setActive] = useState<number>(DEFAULT_PAGE_NUMBER)

  useEffect(() => {
    setActive(DEFAULT_PAGE_NUMBER)
  }, [])

  const onPageClick = (pageNumber: number) => {
    setActive(pageNumber)
    onPageToggle(pageNumber)
  }

  const onChevronClick = (direction: string) => {
    switch (direction) {
      case 'back': {
        setActive(prev => prev - DEFAULT_PAGE_NUMBER)
        onPageToggle(active - DEFAULT_PAGE_NUMBER)
        break;
      }
      case 'forward': {
        setActive(prev => prev + DEFAULT_PAGE_NUMBER)
        onPageToggle(active + DEFAULT_PAGE_NUMBER)
        break;
      }
      default: setActive(DEFAULT_PAGE_NUMBER) 
    }
  }

  return (
    <div className={styles.pagination__container}>
      <button
        className={cx(styles.pagination__button, { btn__disabled: active === DEFAULT_PAGE_NUMBER })}
        onClick={() => onChevronClick('back')}
      >
        <FaChevronLeft />
      </button>
      {
        getArrayNumbers(pageCount).map(num => (
          <span
            key={num}
            className={cx(styles.pagination__item, { item__active: num === active })}
            onClick={() => onPageClick(num)}
          >
            {num}
          </span>
        ))
      }
      <button
        className={cx(styles.pagination__button, { btn__disabled: active === pageCount })}
        onClick={() => onChevronClick('forward')}
      >
        <FaChevronRight />
      </button>
    </div>
  )
}

export default Pagination