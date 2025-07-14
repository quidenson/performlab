import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { App } from "./App"
import "./index.css"
import { setupStore } from "./app/store/store"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

const container = document.getElementById("root")
const store = setupStore({})

if (container) {
  const root = createRoot(container)
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
  ])

  root.render(
    <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>,
    // </StrictMode>,
  )
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  )
}
