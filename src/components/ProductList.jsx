import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductItem from './ProductItem';

function ProductList() {
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { products, loading, error } = useProducts(searchQuery);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="loading loading-spinner loading-lg text-primary"></div>
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center mb-8">
        <form onSubmit={handleSearch} className="form-control w-full max-w-md">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search products..."
                className="input input-bordered w-full pr-10 bg-white text-neutral placeholder:text-neutral-400"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <svg
                className="absolute right-3 top-3 h-5 w-5 text-neutral-500"
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
              className="btn btn-primary text-white"
            >
              Search
            </button>
          </div>
        </form>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList; 