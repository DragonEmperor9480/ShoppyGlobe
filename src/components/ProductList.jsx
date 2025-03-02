import { useState, useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductItem from './ProductItem';
import PropTypes from 'prop-types';

function ProductList({ searchReset }) {
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { products, loading, error } = useProducts(searchQuery);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    setSearchInput('');
    setSearchQuery('');
  }, [searchReset]);

  const categories = ['all', ...new Set(products.map(product => product.category))];
  
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="loading loading-spinner loading-lg text-light"></div>
    </div>
  );
  
  if (error) return (
    <div className="alert alert-error max-w-md mx-auto mt-8 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>{error}</span>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-4xl font-bold gradient-text mb-6 text-center">
          Discover Amazing Products
        </h1>
        <form onSubmit={handleSearch} className="form-control w-full max-w-md">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search products..."
                className="input glass-card w-full pr-10 text-light placeholder:text-light/70 focus:outline-primary"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <svg
                className="absolute right-3 top-3 h-5 w-5 text-light/70"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <button 
              type="submit" 
              className="btn btn-primary text-light"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      <div className="mb-8 overflow-x-auto">
        <div className="flex gap-2 pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`btn btn-sm ${
                selectedCategory === category 
                  ? 'btn-primary text-light' 
                  : 'glass-card text-light hover:bg-primary/20'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

ProductList.propTypes = {
  searchReset: PropTypes.bool,
};

export default ProductList; 