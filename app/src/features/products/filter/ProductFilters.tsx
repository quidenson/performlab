// import { useEffect, useState } from "react";
// import { useDebounce } from "../../../app/hooks/useDebounce";
import { useProductFilters } from "../../../app/hooks/useProductsFilters"
import { defaultCategories } from "../../../utils/constApi"
import FilterButton from "../../../ui/filters/FilterButton"
import styles from "./ProductFilters.module.less"

const ProductsFilters = () => {
  const {
    // search,
    category,
    setFilters,
  } = useProductFilters()
  // const [localSearch, setLocalSearch] = useState(search || '');
  // const debouncedSearch = useDebounce(localSearch, 500);

  // useEffect(() => {
  //   setFilters({ search: debouncedSearch });
  // }, [debouncedSearch, setFilters]);

  // useEffect(() => {
  //   setLocalSearch(search || '');
  // }, [search]);

  const handleCategoryChange = (selectedCategory: string) => {
    const newCategory = category === selectedCategory ? "" : selectedCategory
    setFilters({ category: newCategory })
  }

  return (
    <div className={styles.productsFilters}>
      {/* <div className={styles.searchContainer}>   
        <input
          type="text"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          placeholder="Search products..."
        />
      </div> */}

      <div className={styles.categoryButtons}>
        {defaultCategories.map(categoryValue => (
          <FilterButton
            key={categoryValue}
            value={categoryValue}
            isActive={categoryValue === category}
            onClick={() => handleCategoryChange(categoryValue)}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductsFilters
