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
    <div className="card-hover glass-card rounded-2xl overflow-hidden transform transition-all duration-300">
      <figure className="relative h-56 overflow-hidden">
        <img 
          src={product.thumbnail} 
          alt={product.title} 
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h2 className="text-xl font-semibold text-white line-clamp-1">{product.title}</h2>
        </div>
      </figure>
      
      <div className="card-body p-5 bg-purple-900/30 backdrop-blur-sm">
        <div className="flex justify-between items-center">
          <p className="text-2xl font-bold text-primary">${product.price}</p>
          <div className="badge badge-primary bg-primary/20 text-white px-3 py-2">
            {product.category}
          </div>
        </div>
        
        <p className="text-gray-200 line-clamp-2 text-sm mt-2">{product.description}</p>
        
        <div className="card-actions justify-end mt-4 gap-3">
          <Link 
            to={`/product/${product.id}`} 
            className="btn btn-outline border-primary/50 text-white hover:bg-primary/20 hover:border-primary rounded-xl"
          >
            View Details
          </Link>
          <button 
            onClick={handleAddToCart} 
            className="btn bg-primary/20 hover:bg-primary/40 text-white border-primary/50 hover:border-primary rounded-xl"
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
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductItem; 