import { useSelector } from 'react-redux';
import CartItem from './CartItem';

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Shopping Cart</h2>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <div className="card bg-base-100 shadow-xl p-4">
        <div className="text-xl font-bold">
          Total: ${total.toFixed(2)}
        </div>
        <button className="btn btn-primary mt-4">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart; 