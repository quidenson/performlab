import * as React from "react"
import styles from "./FilterButton.module.less"

interface FilterButtonProps {
  value: string
  isActive: boolean
  onClick: () => void
}

const FilterButton: React.FC<FilterButtonProps> = ({
  value,
  isActive,
  onClick,
}) => {
  const buttonClass = `${styles.filterButton} ${isActive ? styles.active : ""}`
  return (
    <button className={buttonClass} onClick={onClick} aria-pressed={isActive}>
      {value}
    </button>
  )
}

export default FilterButton
