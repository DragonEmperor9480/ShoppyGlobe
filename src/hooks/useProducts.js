import { useState, useEffect } from 'react';
import axios from 'axios';

export const useProducts = (searchQuery = '') => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const url = searchQuery
          ? `https://dummyjson.com/products/search?q=${searchQuery}`
          : 'https://dummyjson.com/products';
        const response = await axios.get(url);
        setProducts(response.data.products);
        setError(null);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  return { products, loading, error };
}; 