import FilterButton from '../../../ui/filters/FilterButton';
import { useProductFilters } from '../../../app/hooks/useProductsFilters';
import {  DEFAULT_SORT_NAMES, DEFAULT_SORTING } from '../../../utils/constApi';

interface IProductSortingProps {}

const ProductSorting: React.FunctionComponent<IProductSortingProps> = () => {
  const { sort, setFilters } = useProductFilters();

  const handleSortChange = () => {
    const currentIndex = DEFAULT_SORTING.indexOf(sort);
    const nextIndex = (currentIndex + 1) % DEFAULT_SORTING.length;
    const nextSort = DEFAULT_SORTING[nextIndex];
    setFilters({ sort: nextSort });
  };

  
  let displayName = 'Sort';
  if (sort === 'name' || sort === '-name') {
    displayName = DEFAULT_SORT_NAMES[sort];
  }

  return (
    <div>
      <FilterButton 
        value={displayName}
        isActive={displayName!=='Sort'}
        onClick={handleSortChange}
      />
    </div>
  );
};

export default ProductSorting;