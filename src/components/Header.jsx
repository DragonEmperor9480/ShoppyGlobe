import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function Header() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogoClick = () => {
    window.location.href = '/';
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 glass-card">
      <div className="navbar container mx-auto px-4">
        <div className="flex-1">
          <button 
            onClick={handleLogoClick}
            className="text-2xl font-bold gradient-text hover:opacity-80 transition-opacity"
          >
            ShoppyGlobe
          </button>
        </div>
        <div className="flex-none gap-4">
          <div className="dropdown dropdown-end">
            <button className="btn btn-ghost btn-circle text-light">
              <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="badge badge-xs badge-primary indicator-item"></span>
              </div>
            </button>
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle text-light">
              <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {totalItems > 0 && (
                  <span className="badge badge-sm badge-primary indicator-item">
                    {totalItems}
                  </span>
                )}
              </div>
            </label>
            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 glass-card text-light">
              <div className="card-body">
                <span className="font-bold text-lg">{totalItems} Items</span>
                <div className="card-actions">
                  <a href="/cart" className="btn btn-primary btn-block text-light">View cart</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  onLogoClick: PropTypes.func.isRequired,
};

export default Header; 