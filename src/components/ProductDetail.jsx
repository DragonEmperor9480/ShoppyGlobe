import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addToCart } from '../store/cartSlice';

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

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

  if (loading) return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="loading loading-spinner loading-lg text-primary"></div>
    </div>
  );
  
  if (error) return (
    <div className="alert alert-error max-w-md mx-auto mt-8 text-white">
      <span>{error}</span>
    </div>
  );
  
  if (!product) return (
    <div className="alert alert-info max-w-md mx-auto mt-8">
      Product not found
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => navigate(-1)} 
        className="btn btn-ghost mb-6"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-xl shadow-lg p-6">
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <img 
              src={product.images[selectedImage]} 
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto py-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 
                  ${selectedImage === index ? 'border-primary' : 'border-transparent'}`}
              >
                <img 
                  src={image} 
                  alt={`${product.title} - view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-neutral-800">{product.title}</h1>
            <p className="text-lg text-neutral-600 mt-2">{product.brand}</p>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-4xl font-bold text-primary">
              ${product.price}
            </span>
            {product.discountPercentage > 0 && (
              <span className="badge badge-secondary">
                {product.discountPercentage}% OFF
              </span>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-neutral-600">Rating:</span>
              <div className="rating rating-sm">
                {[...Array(5)].map((_, index) => (
                  <input
                    key={index}
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-orange-400"
                    checked={index < Math.floor(product.rating)}
                    readOnly
                  />
                ))}
              </div>
              <span className="text-neutral-600">({product.rating})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-neutral-600">Stock:</span>
              <span className={`font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `${product.stock} units` : 'Out of Stock'}
              </span>
            </div>
          </div>

          <div className="divider"></div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-neutral-600">{product.description}</p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {product.category && (
                <span className="badge badge-outline">{product.category}</span>
              )}
              {product.tags && product.tags.map(tag => (
                <span key={tag} className="badge badge-outline">{tag}</span>
              ))}
            </div>

            <button
              onClick={() => dispatch(addToCart(product))}
              className="btn btn-primary btn-block"
              disabled={product.stock <= 0}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail; 