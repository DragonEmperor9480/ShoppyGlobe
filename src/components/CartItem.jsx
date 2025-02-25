import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../store/cartSlice';

function CartItem({ item }) {
  const dispatch = useDispatch();

  const handleQuantityChange = (e) => {
    const quantity = parseInt(e.target.value);
    if (quantity > 0) {
      dispatch(updateQuantity({ id: item.id, quantity }));
    }
  };

  return (
    <div className="card card-side bg-base-100 shadow-xl">
      <figure className="w-48">
        <img src={item.thumbnail} alt={item.title} className="h-full object-cover" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{item.title}</h2>
        <p className="text-lg">${item.price}</p>
        <div className="flex items-center gap-4">
          <input
            type="number"
            value={item.quantity}
            onChange={handleQuantityChange}
            className="input input-bordered w-20"
            min="1"
          />
          <button
            onClick={() => dispatch(removeFromCart(item.id))}
            className="btn btn-error"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
  }).isRequired,
};

export default CartItem; 