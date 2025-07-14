import { useAppSelector } from '../../app/hooks/hooks';
import { useCartActions } from '../../app/hooks/useCartActions';
import CartItemComp from './CartItemComp';
import { CartItem } from './types';
import styles from './Cart.module.less'; 

const Cart: React.FC = () => {
  const products = useAppSelector(state => state.cart.cart);
  
  const { 
    handleIncreaseQuantity, 
    handleDecreaseQuantity, 
    handleRemoveFromCart 
  } = useCartActions();

  if (products.length === 0) {
    return <div className={styles.cartEmpty}>Your cart is empty :(</div>;
  }

  return (
    <div className={styles.cartContainer}>
      {products.map((item: CartItem) => (
        <CartItemComp
          key={item.id}
          {...item}
          onIncrease={() => handleIncreaseQuantity(item.id)}
          onDecrease={() => handleDecreaseQuantity(item.id)}
          onRemove={() => handleRemoveFromCart(item.id)}
        />
      ))}
    </div>
  );
};

export default Cart;