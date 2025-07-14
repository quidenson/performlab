import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, fireEvent } from "@testing-library/react";
import { Product } from "../../features/products/types";
import ProductItem from "../../features/products/ProductItem";
import { renderWithProviders } from "../../utils/test-utils";

const handleAddToCartMock = vi.fn();
const handleRemoveFromCartMock = vi.fn();
const handleIncreaseQuantityMock = vi.fn();
const handleDecreaseQuantityMock = vi.fn();

vi.mock("../../app/hooks/useCartActions", () => ({
  useCartActions: () => ({
    handleAddToCart: handleAddToCartMock,
    handleRemoveFromCart: handleRemoveFromCartMock,
    handleIncreaseQuantity: handleIncreaseQuantityMock,
    handleDecreaseQuantity: handleDecreaseQuantityMock
  }),
}));

describe("ProductItem", () => {
  const mockProduct: Product = {
    id: 1,
    name: "Test Product",
    category: 'clothing'
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("рендерим имя", () => {
    renderWithProviders(<ProductItem {...mockProduct} />);
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
  });

  it("вызов handleAddToCart по нажатию кнопки", () => {
    renderWithProviders(<ProductItem {...mockProduct} />);
    const button = screen.getByRole("button", { name: /add to cart/i });
    fireEvent.click(button);
    expect(handleAddToCartMock).toHaveBeenCalledWith(mockProduct);
  });

  it("кейс с невалидным продуктом", () => {
    const invalidMockProduct = { ...mockProduct, id: undefined } as any;
    renderWithProviders(<ProductItem {...invalidMockProduct} />);
    expect(screen.getByText("Invalid product")).toBeInTheDocument();
    expect(screen.queryByRole("button")).toBeNull();
  });

  it("невалидный продукт нельзя добавить в корзину", () => {
    const invalidMockProduct = { ...mockProduct, id: undefined } as any;
    renderWithProviders(<ProductItem {...invalidMockProduct} />);
    expect(screen.queryByRole("button", { name: /add to cart/i })).toBeNull();
  });
});