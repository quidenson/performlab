export interface Product {
  id: number
  name: string
  category?: "food" | "clothing" | "electronics"
}

export interface ProductsState {
  products: Product[]
}
