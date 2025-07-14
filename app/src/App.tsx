import { useEffect, useState } from "react"
import "./App.less"
import { useProductFilters } from "./app/hooks/useProductsFilters"
import ProductsFilters from "./features/products/filter/ProductFilters"
import { useGetProductsQuery } from "./app/store/productsApiSlice"
import Cart from "./features/cart/Cart"
import ProductItem from "./features/products/ProductItem"
import ProductSorting from "./features/products/sort/ProductSorting"
import ProductPagination from "./features/products/pagination/ProductPagination"
import { AUTO_PRODUCTS_PER_PAGE } from "./utils/constApi"
import { LoadingSpinner } from "./ui/utils/loadig/LoadingSpinner"
import { ErrorHandler } from "./ui/utils/errors/ErrorHandler"
import { Product } from "./features/products/types"
import CartIcon from "./public/CartSVG"
import { useAppSelector } from "./app/hooks/hooks"

export const App = () => {
  const { category, sort } = useProductFilters()
  const [page, setPage] = useState(1)
  const [isCartVisible, setCartVisibility] = useState(false)
  const perPage = AUTO_PRODUCTS_PER_PAGE

  const cartItems = useAppSelector(state => state.cart.cart)

  useEffect(() => {
    setPage(1)
  }, [category, sort])

  const {
    data: paginatedResponse,
    error,
    isLoading,
  } = useGetProductsQuery({
    category,
    page,
    per_page: perPage,
    sort: sort || undefined,
  })

  if (isLoading) return <LoadingSpinner />
  if (error) {
    console.log("API loading error:", error)
    return <ErrorHandler error={error} />
  }

  const products = paginatedResponse?.data || []
  const totalPages = paginatedResponse?.totalPages || 1

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  return (
    <div className="app-container">
      <div className="sidebar">
        <ProductsFilters />
        <div className="sorting-container">
          <ProductSorting />
        </div>
      </div>
      <div className="main-content">
        <div className="products-grid">
          {products.map((product: Product) => (
            <ProductItem key={product.id} {...product} />
          ))}
        </div>
        <div className="pagination-container">
          {totalPages > 1 && (
            <ProductPagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
      <div
        className={`cart-container ${isCartVisible ? "visible" : ""}`}
        onMouseEnter={() => setCartVisibility(true)}
        onMouseLeave={() => setCartVisibility(false)}
      >
        <div className="cart-tab">
          <CartIcon size={24} />
          {cartItems.length > 0 && (
            <span className="cart-tab-counter">{cartItems.length}</span>
          )}
        </div>
        <div className="cart-sidebar">
          <Cart />
        </div>
      </div>
    </div>
  )
}
