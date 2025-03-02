import { createSlice } from '@reduxjs/toolkit';

// Load cart items from localStorage
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : { items: [] };
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return { items: [] };
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartFromStorage(),
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
    clearCart: (state) => {
      state.items = [];
      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer; 