import * as React from "react"
import { DEFAULT_PRODUCT_IN_CART_LIMIT } from "../../utils/constApi"
import styles from "./CartButton.module.less" 

interface ICartButtonProps {
  onIncrease: () => void
  onDecrease: () => void
  onRemove: () => void
  quantity: number
  name: string
}

const CartButton: React.FunctionComponent<ICartButtonProps> = ({
  onIncrease,
  onDecrease,
  onRemove,
  quantity,
  name,
}) => {
  return (
    <div className={styles.cartButtonGroup}>
      <div className={styles.quantityControl}>
        <button
          onClick={onDecrease}
          disabled={quantity <= 1}
          aria-label={`Decrease quantity of ${name}`}
          className={styles.button}
        >
          -
        </button>
        <span className={styles.quantityDisplay}>{quantity}</span>
        <button
          onClick={onIncrease}
          disabled={quantity >= DEFAULT_PRODUCT_IN_CART_LIMIT}
          aria-label={`Increase quantity of ${name}`}
          className={styles.button}
        >
          +
        </button>
      </div>
      <button
        onClick={onRemove}
        aria-label={`Remove ${name} from cart`}
        className={styles.deleteButton}
      >
        Delete
      </button>
    </div>
  );
};

export default CartButton;