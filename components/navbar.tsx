import { useState } from 'react';
import { FiShoppingCart, FiMenu, FiX } from 'react-icons/fi'; // Import icons

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false); // State to toggle mobile menu

  const handleToggle = () => {
    setNavOpen(!navOpen);
  };

  return (
    <nav className="bg-gray-800 text-white p-4 fixed w-full z-10 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">ShopCart</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#" className="hover:text-gray-300">Home</a>
          <a href="#" className="hover:text-gray-300">Shop</a>
          <a href="#" className="hover:text-gray-300">About</a>
          <a href="#" className="hover:text-gray-300">Contact</a>
          
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 rounded-full text-black outline-none"
          />
          
          {/* Cart Icon */}
          <div className="relative">
            <FiShoppingCart size={24} />
            <span className="absolute top-0 right-0 bg-red-500 rounded-full text-xs px-2 py-1">3</span> {/* Cart count */}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={handleToggle}>
            {navOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {navOpen && (
        <div className="md:hidden flex flex-col space-y-4 mt-4">
          <a href="#" className="hover:text-gray-300">Home</a>
          <a href="#" className="hover:text-gray-300">Shop</a>
          <a href="#" className="hover:text-gray-300">About</a>
          <a href="#" className="hover:text-gray-300">Contact</a>

          {/* Search Bar in Mobile */}
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 rounded-full text-black outline-none"
          />

          {/* Cart Icon in Mobile */}
          <div className="flex justify-end pr-4">
            <div className="relative">
              <FiShoppingCart size={24} />
              <span className="absolute top-0 right-0 bg-red-500 rounded-full text-xs px-2 py-1">3</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
