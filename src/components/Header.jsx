import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';

function Header() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="navbar bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex-1">
          <Link 
            to="/" 
            className="text-2xl font-bold text-primary hover:text-secondary transition-colors"
          >
            ShoppyGlobe
          </Link>
        </div>
        <div className="flex-none">
          <Link 
            to="/cart" 
            className="btn btn-ghost btn-circle hover:bg-primary/10 relative"
          >
            <div className="indicator text-neutral">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                />
              </svg>
              {totalItems > 0 && (
                <span className="badge badge-sm badge-primary text-white absolute -top-2 -right-2">
                  {totalItems}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header; 