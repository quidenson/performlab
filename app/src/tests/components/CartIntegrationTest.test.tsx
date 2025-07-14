import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"

import CartButton from "../../ui/cart/CartButton"
import { DEFAULT_PRODUCT_IN_CART_LIMIT } from "../../utils/constApi"
import CartItemComp from "../../features/cart/CartItemComp"
import { renderWithProviders } from "../../utils/test-utils"

vi.mock("../../ui/cart/CartButton", () => ({
  default: vi.fn(({ onIncrease, onDecrease, onRemove, quantity }) => (
    <div>
      <button
        onClick={onDecrease}
        data-testid="decrease-btn"
        data-disabled={quantity <= 1}
      >
        -
      </button>
      <button
        onClick={onIncrease}
        data-testid="increase-btn"
        data-disabled={quantity >= DEFAULT_PRODUCT_IN_CART_LIMIT}
      >
        +
      </button>
      <button onClick={onRemove} data-testid="remove-btn">
        Delete
      </button>
    </div>
  )),
}))

describe("CartItemComp Integration", () => {
  const mockItem = {
    id: 1,
    name: "Test Product",
    quantity: 2,
  }

  const mockHandlers = {
    onIncrease: vi.fn(),
    onDecrease: vi.fn(),
    onRemove: vi.fn(),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("рендерим продукты", () => {
    render(<CartItemComp {...mockItem} {...mockHandlers} />)

    expect(screen.getByText("Test Product")).toBeInTheDocument()
    expect(screen.getByText("Quantity: 2")).toBeInTheDocument()
  })

  it("передача пропсов CartButton", () => {
    renderWithProviders(<CartItemComp {...mockItem} {...mockHandlers} />)
    expect(CartButton).toHaveBeenCalledWith(
      expect.objectContaining({
        quantity: 2,
        onIncrease: mockHandlers.onIncrease,
        onDecrease: mockHandlers.onDecrease,
        onRemove: mockHandlers.onRemove,
      }),
      undefined 
    )
  })

  it("добавление товара", () => {
    render(<CartItemComp {...mockItem} {...mockHandlers} />)

    fireEvent.click(screen.getByTestId("increase-btn"))
    expect(mockHandlers.onIncrease).toHaveBeenCalledTimes(1)
  })

  it("уменьшение кол-ва товара", () => {
    render(<CartItemComp {...mockItem} {...mockHandlers} />)

    fireEvent.click(screen.getByTestId("decrease-btn"))
    expect(mockHandlers.onDecrease).toHaveBeenCalledTimes(1)
  })

  it("удаление товара", () => {
    render(<CartItemComp {...mockItem} {...mockHandlers} />)

    fireEvent.click(screen.getByTestId("remove-btn"))
    expect(mockHandlers.onRemove).toHaveBeenCalledTimes(1)
  })

  it("когда кол-во товара 1, кнопка уменьшения кол-ва должна стать неактивной", () => {
    const minQuantityItem = { ...mockItem, quantity: 1 }
    render(<CartItemComp {...minQuantityItem} {...mockHandlers} />)

    const decreaseBtn = screen.getByTestId("decrease-btn")
    expect(decreaseBtn.dataset.disabled).toBe("true")
  })

  it("когда кол-во товара достигает лимита, кнопка добавления товара неактивна", () => {
    const maxQuantityItem = { ...mockItem, quantity: DEFAULT_PRODUCT_IN_CART_LIMIT } 
    render(<CartItemComp {...maxQuantityItem} {...mockHandlers} />)

    const increaseBtn = screen.getByTestId("increase-btn")
    expect(increaseBtn.dataset.disabled).toBe("true")
  })

})
