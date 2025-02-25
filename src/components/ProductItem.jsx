import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../store/cartSlice';

function ProductItem({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="card bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <figure className="relative h-48 overflow-hidden">
        <img 
          src={product.thumbnail} 
          alt={product.title} 
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h2 className="text-white font-semibold text-lg line-clamp-1">{product.title}</h2>
        </div>
      </figure>
      <div className="card-body p-4 bg-white">
        <div className="flex justify-between items-center">
          <p className="text-2xl font-bold text-neutral">${product.price}</p>
          <div className="badge badge-primary text-white">{product.category}</div>
        </div>
        <p className="text-neutral-700 line-clamp-2 text-sm mt-2">{product.description}</p>
        <div className="card-actions justify-end mt-4 space-x-2">
          <Link 
            to={`/product/${product.id}`} 
            className="btn btn-outline btn-primary btn-sm hover:text-white"
          >
            View Details
          </Link>
          <button 
            onClick={handleAddToCart} 
            className="btn btn-primary btn-sm text-white"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductItem; 