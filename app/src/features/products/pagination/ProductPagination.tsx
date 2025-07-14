import * as React from "react"
import PaginateButton from "../../../ui/pagination/PaginateButton"
import styles from "./ProductPagination.module.less"

interface IProductPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const ProductPagination: React.FunctionComponent<IProductPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevious = () => onPageChange(currentPage - 1)
  const handleNext = () => onPageChange(currentPage + 1)

  return (
    <div className={styles.container}>
      <PaginateButton
        name="Back"
        isActive={false}
        onClick={handlePrevious}
        disabled={currentPage <= 1}
      />

      <span className={styles.pageText}>
        Page {currentPage} of {totalPages}
      </span>

      <PaginateButton
        name="Next"
        isActive={false}
        onClick={handleNext}
        disabled={currentPage >= totalPages}
      />
    </div>
  )
}

export default ProductPagination
