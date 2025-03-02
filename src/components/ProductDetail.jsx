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

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
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
    <div className="container mx-auto px-4 py-8 mt-16">
      <button 
        onClick={() => navigate(-1)} 
        className="btn btn-ghost text-white mb-6 hover:bg-white/10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card rounded-2xl overflow-hidden p-4">
          <div className="relative aspect-square rounded-xl overflow-hidden">
            <img 
              src={product.images[selectedImage]} 
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto py-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 
                  ${selectedImage === index ? 'border-primary' : 'border-white/20'}`}
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

        <div className="glass-card rounded-2xl p-6 text-white">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold gradient-text">{product.title}</h1>
            <p className="text-lg text-white/80">{product.brand}</p>

            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-primary">
                ${product.price}
              </span>
              {product.discountPercentage > 0 && (
                <span className="badge badge-primary">
                  {product.discountPercentage}% OFF
                </span>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-white/80">Rating:</span>
                <div className="rating rating-sm">
                  {[...Array(5)].map((_, index) => (
                    <input
                      key={index}
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-primary"
                      checked={index < Math.floor(product.rating)}
                      readOnly
                    />
                  ))}
                </div>
                <span className="text-white/80">({product.rating})</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-white/80">Stock:</span>
                <span className={`font-semibold ${product.stock > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {product.stock > 0 ? `${product.stock} units` : 'Out of Stock'}
                </span>
              </div>
            </div>

            <div className="divider bg-white/10"></div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-white/80">{product.description}</p>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className="badge badge-outline text-white">{product.category}</span>
              </div>

              <button
                onClick={handleAddToCart}
                className="btn btn-primary btn-block text-white"
                disabled={product.stock <= 0}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail; 