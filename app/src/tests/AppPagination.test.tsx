import { describe, it, expect, vi, beforeEach } from "vitest"
import { screen, waitFor, fireEvent } from "@testing-library/react"
import { renderWithProviders } from "../utils/test-utils"
import { App } from "../App"
import * as productsApi from "../app/store/productsApiSlice"
import { AUTO_PRODUCTS_PER_PAGE } from "../utils/constApi"

vi.mock("../app/store/productsApiSlice", async importOriginal => {
  const actual = await importOriginal()
  return {
    ...(actual as object),
    useGetProductsQuery: vi.fn(),
  }
})

describe("App component pagination", () => {
  const mockProducts = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    category: "electronics",
  }))

  const totalPages = Math.ceil(mockProducts.length / AUTO_PRODUCTS_PER_PAGE)

  beforeEach(() => {
    vi.clearAllMocks()
    ;(productsApi.useGetProductsQuery as any).mockImplementation(
      (filters: { page: number }) => {
        const startIndex = (filters.page - 1) * AUTO_PRODUCTS_PER_PAGE
        const endIndex = startIndex + AUTO_PRODUCTS_PER_PAGE
        const pageProducts = mockProducts.slice(startIndex, endIndex)

        return {
          data: {
            data: pageProducts,
            totalPages: totalPages,
          },
          isLoading: false,
          error: null,
        }
      },
    )
  })

  it("пагинация по консте", async () => {
    renderWithProviders(<App />)
    await waitFor(() => {
      for (let i = 1; i <= AUTO_PRODUCTS_PER_PAGE; i++) {
        expect(screen.getByText(`Product ${i}`)).toBeInTheDocument()
      }
      expect(screen.queryByText("Product 11")).not.toBeInTheDocument()
    })
    fireEvent.click(screen.getByText("Next"))
    await waitFor(() => {
      for (let i = 11; i <= AUTO_PRODUCTS_PER_PAGE * 2; i++) {
        expect(screen.getByText(`Product ${i}`)).toBeInTheDocument()
      }
      expect(screen.queryByText("Product 10")).not.toBeInTheDocument()
    })
  })

  it("кнопки навигации становятся неактивными", async () => {
    renderWithProviders(<App />)
    await waitFor(() => {
      expect(screen.getByText("Back")).toBeDisabled()
      expect(screen.getByText("Next")).not.toBeDisabled()
    })
    fireEvent.click(screen.getByText("Next"))
    await waitFor(() => {
      expect(screen.getByText("Back")).not.toBeDisabled()
      expect(screen.getByText("Next")).toBeDisabled()
    })
  })
})
