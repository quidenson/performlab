

const CartIcon = ({ size = 38 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 64 64" 
    xmlns="http://www.w3.org/2000/svg"
    className="cart-icon"
  >
    <g>
      <path 
        fill="#394240" 
        d="M63.246 21.656C62.492 20.617 61.285 20 60 20H18.977L15.934 3.281C15.59 1.383 13.934 0 12 0H4C1.789 0 0 1.789 0 4s1.789 4 4 4h4.66l7.406 40.711C16.41 50.617 18.066 52 20 52h32c1.723 0 3.25-1.102 3.793-2.734l8-24C64.203 24.047 63.996 22.703 63.246 21.656zM49.117 44H23.34l-2.91-16h34.02L49.117 44z" 
      />
      <circle fill="#394240" cx="44" cy="60" r="4" />
      <circle fill="#394240" cx="28" cy="60" r="4" />
      <polygon 
        fill="#F76D57" 
        points="49.117 44 23.34 44 20.43 28 54.449 28" 
      />
    </g>
  </svg>
);

export default CartIcon;