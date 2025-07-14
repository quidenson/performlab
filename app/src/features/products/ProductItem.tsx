import * as React from "react"
import { Product } from "./types"
import { useCartActions } from "../../app/hooks/useCartActions"
import styles from "./ProductItem.module.less"
import { useAppSelector } from "../../app/hooks/hooks"
import CartButton from "../../ui/cart/CartButton"

interface IProductItemProps extends Product {}

const ProductItem: React.FunctionComponent<IProductItemProps> = (product) => {
  const { handleAddToCart, handleDecreaseQuantity, handleRemoveFromCart } = useCartActions();
  const cartItems = useAppSelector((state) => state.cart.cart);
  

  const cartItem = cartItems.find((item: Product) => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

  if (!product.id || !product.name) {
    return (
      <div className={styles.productItem} data-testid="invalid-product">
        <div className={styles.errorMessage}>Invalid product</div>
      </div>
    );
  }

  return (
    <div className={styles.productItem}>
      <div className={styles.imageContainer}>
        <span>Product Image Bolvanka</span>
      </div>
      <div className={styles.productName}>{product.name}</div>
      
      {quantity > 0 ? (
        <div className={styles.cartControls}>
          <div className={styles.productName}>{quantity} added to the cart!</div>
          <CartButton
            onIncrease={() => handleAddToCart(product)}
            onDecrease={() => handleDecreaseQuantity(product.id)}
            onRemove={() => handleRemoveFromCart(product.id)}
            quantity={quantity}
            name={product.name}
          />
        </div>
      ) : (
        <button
          onClick={() => handleAddToCart(product)}
          className={styles.addToCartButton}
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductItem;