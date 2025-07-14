import * as React from "react"
import { CartItem } from "./types"
import CartButton from "../../ui/cart/CartButton"
import styles from './CartItemComp.module.less'; 

export interface ICartItemCompProps extends CartItem {
  onIncrease: () => void
  onDecrease: () => void
  onRemove: () => void
}

const CartItemComp: React.FunctionComponent<ICartItemCompProps> = ({
  name,
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  return (
    <div className={styles.cartItem}>
      <div className={styles.itemInfo}>
        <div className={styles.itemName}>{name}</div>
        <div className={styles.itemQuantity}>Quantity: {quantity}</div>
      </div>
      <div>
        <CartButton
          onIncrease={onIncrease}
          onDecrease={onDecrease}
          onRemove={onRemove}
          name={name}
          quantity={quantity}
        />
      </div>
    </div>
  )
}

export default CartItemComp