import * as React from "react"
import styles from "./PaginateButton.module.less" 

interface IPaginateButtonProps {
  name: string
  isActive: boolean
  onClick: () => void
  disabled: boolean
}

const PaginateButton: React.FunctionComponent<IPaginateButtonProps> = props => {
  const buttonClass = `${styles.paginateButton} ${props.isActive ? styles.active : ""}`

  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.name}
    </button>
  )
}

export default PaginateButton
