import { useCallback } from "react"
import { useAppDispatch } from "./hooks"
import {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../store/cartSlice"

export const useCartActions = () => {
  const dispatch = useAppDispatch()

  const handleAddToCart = useCallback(
    (product: { id: number; name: string }) => {
      dispatch(addToCart({ ...product, quantity: 1 }))
    },
    [dispatch],
  )

  const handleRemoveFromCart = useCallback(
    (id: number) => {
      dispatch(removeFromCart({ id }))
    },
    [dispatch],
  )

  const handleIncreaseQuantity = useCallback(
    (id: number) => {
      dispatch(increaseQuantity({ id }))
    },
    [dispatch],
  )

  const handleDecreaseQuantity = useCallback(
    (id: number) => {
      dispatch(decreaseQuantity({ id }))
    },
    [dispatch],
  )

  return {
    handleAddToCart,
    handleRemoveFromCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
  }
}
