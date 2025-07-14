import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { productsApiSlice } from "./productsApiSlice"
import cartSlice from "./cartSlice"

const store = combineReducers({
  [productsApiSlice.reducerPath]: productsApiSlice.reducer,
  cart: cartSlice,
})

export const setupStore = ({}) => {
  return configureStore({
    reducer: store,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(productsApiSlice.middleware),
  })
}

export type RootState = ReturnType<typeof store>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = ReturnType<typeof setupStore>["dispatch"]
