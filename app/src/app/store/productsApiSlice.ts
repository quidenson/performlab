import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import {
  AUTO_PRODUCTS_PER_PAGE,
  BASE_URL,
  TEST_DELAY,
} from "../../utils/constApi"
import { Product } from "../../features/products/types"

interface ListProducts<T> {
  page: number
  data: T[]
  totalPages: number
}

interface ApiResponse<T> {
  data: T[]
  first: number
  prev: number | null
  next: number | null
  last: number
  pages: number
  items: number
}

export const productsApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  reducerPath: "productsApi",
  tagTypes: ["Product"],
  endpoints: build => ({
    getProducts: build.query<
      ListProducts<Product>,
      {
        // search?: string;
        category?: string
        page: number
        per_page: number
        sort?: string
      }
    >({
      query: filters => {
        const params = new URLSearchParams()

        // console.log('api', filters.search);
        console.log('hi');
        

        if (filters.category !== undefined)
          params.append("category", filters.category)
        if (filters.page) params.append("_page", filters.page.toString())
        if (filters.sort) params.append("_sort", filters.sort)

        return `?${params.toString()}`
      },
      transformResponse: (
        baseQueryReturnValue: ApiResponse<Product>,
        _meta:
          | {
              request: Request
              response: Response
            }
          | undefined,
        arg: {
          search?: string
          category?: string
          page: number
          per_page: number
          sort?: string
        },
      ) => {
        const dataArray = baseQueryReturnValue.data
        const totalPages = Math.ceil(
          baseQueryReturnValue.items / AUTO_PRODUCTS_PER_PAGE,
        )
        const currentPage = arg.page

        return {
          page: currentPage,
          data: dataArray,
          totalPages: totalPages,
        }
      },
      providesTags: result => {
        if (result?.data) {
          return [
            ...result.data.map(({ id }) => ({ type: "Product" as const, id })),
            { type: "Product", id: "LIST" },
          ]
        }
        return [{ type: "Product", id: "LIST" }]
      },
    }),

    getProductsErrorTest: build.query<ApiResponse<Product>, void>({
      query: () => "/dorogi-net/",
      transformResponse: () => {
        throw new Error("Error test")
      },
    }),

    getProductsLoadingTest: build.query<ListProducts<Product>, void>({
      query: () => "/",
      transformResponse: async (response: ApiResponse<Product>) => {
        await new Promise(resolve => setTimeout(resolve, TEST_DELAY))
        return {
          page: 1,
          data: response.data,
          totalPages: Math.ceil(response.items / AUTO_PRODUCTS_PER_PAGE),
        }
      },
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductsErrorTestQuery,
  useGetProductsLoadingTestQuery,
} = productsApiSlice
