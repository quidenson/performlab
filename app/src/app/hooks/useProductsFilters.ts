import { useCallback } from "react"
import { useSearchParams } from "react-router-dom"

interface Filters {
  search?: string
  category?: string
  sort?: string 
}

export function useProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  // const search = searchParams.get("search") || ""
  const category = searchParams.get("category") || ""
  const sort = searchParams.get("sort") || ''

  const setFilters = useCallback(
    (newFilters: Partial<Filters>) => {
      setSearchParams(currentParams => {
        const params = new URLSearchParams(currentParams)

        if (newFilters.search !== undefined) {
          newFilters.search
            ? params.set("search", newFilters.search)
            : params.delete("search")
        }

        if (newFilters.category !== undefined) {
          newFilters.category
            ? params.set("category", newFilters.category)
            : params.delete("category")
        }
        if (newFilters.sort !== undefined) {
          params.set("sort", newFilters.sort)
        }

        return params
      })
    },
    [setSearchParams],
  )

  return {
    // search,
    category,
    sort,
    setFilters,
  }
}
