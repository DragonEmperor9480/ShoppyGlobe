import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addToCart } from '../store/cartSlice';

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch product details');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="loading loading-spinner loading-lg"></div>;
  if (error) return <div className="alert alert-error">{error}</div>;
  if (!product) return <div className="alert alert-info">Product not found</div>;

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <figure className="lg:w-1/2">
        <img src={product.thumbnail} alt={product.title} className="w-full h-full object-cover" />
      </figure>
      <div className="card-body lg:w-1/2">
        <h2 className="card-title">{product.title}</h2>
        <p>{product.description}</p>
        <p className="text-xl font-bold">${product.price}</p>
        <div className="badge badge-secondary">{product.category}</div>
        <div className="card-actions justify-end">
          <button 
            className="btn btn-primary"
            onClick={() => dispatch(addToCart(product))}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail; 