import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import cnBind from 'classnames/bind'
import { useState } from 'react'
import { DEFAULT_PAGE_NUMBER } from '../../constants'
import styles from './pagination.module.css'

type PaginationProps = {
  pageCount: number,
  onPageToggle: (arg1: number) => {}
}

const cx = cnBind.bind(styles)

const Pagination = ({ pageCount, onPageToggle }: PaginationProps) => {
  const [active, setActive] = useState<number>(DEFAULT_PAGE_NUMBER)

  const onChevronClick = (direction: string) => {
    switch (direction) {
      case 'first': {
        setActive(DEFAULT_PAGE_NUMBER)
        onPageToggle(DEFAULT_PAGE_NUMBER)
        break;
      }
      case 'prev': {
        setActive(prev => prev - DEFAULT_PAGE_NUMBER)
        onPageToggle(active - DEFAULT_PAGE_NUMBER)
        break;
      }
      case 'next': {
        setActive(prev => prev + DEFAULT_PAGE_NUMBER)
        onPageToggle(active + DEFAULT_PAGE_NUMBER)
        break;
      }
      case 'last': {
        setActive(pageCount)
        onPageToggle(pageCount)
        break;
      }
      default: setActive(DEFAULT_PAGE_NUMBER) 
    }
  }

  return (
    <div className={styles.pagination__container}>
      <button
        className={cx(styles.pagination__button, { btn__disabled: active === DEFAULT_PAGE_NUMBER })}
        onClick={() => onChevronClick('first')}
      >
        <HiChevronDoubleLeft />
      </button>
      <button
        className={cx(styles.pagination__button, { btn__disabled: active === DEFAULT_PAGE_NUMBER })}
        onClick={() => onChevronClick('prev')}
      >
        <FaChevronLeft />
      </button>
      <div className={styles.pagination__item}>
        {active} / {pageCount}
      </div>
      <button
        className={cx(styles.pagination__button, { btn__disabled: active === pageCount })}
        onClick={() => onChevronClick('next')}
      >
        <FaChevronRight />
      </button>
      <button
        className={cx(styles.pagination__button, { btn__disabled: active === pageCount })}
        onClick={() => onChevronClick('last')}
      >
        <HiChevronDoubleRight /> 
      </button>
    </div>
  )
}

export default Pagination