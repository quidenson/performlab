import { createSlice } from "@reduxjs/toolkit"
import { CartItem } from "../../features/cart/types"

interface CartState {
  cart: CartItem[]
}

const initialState: CartState = {
  cart: [],
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload
      const addedProduct = state.cart.find(item => item.id === product.id)

      if (!addedProduct) {
        state.cart = [product, ...state.cart]
      } else {
        addedProduct.quantity++
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload.id)
    },
    increaseQuantity: (state, action) => {
      const id = action.payload.id
      const product = state.cart.find(item => item.id === id)
      product && product.quantity++
    },
    decreaseQuantity: (state, action) => {
      const id = action.payload.id
      const product = state.cart.find(item => item.id === id)
      if (product && product.quantity > 1) {
        product.quantity--
      }
    },
  },
})

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions

export default cartSlice.reducer
