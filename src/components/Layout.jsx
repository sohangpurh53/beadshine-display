import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Menu, X, Search, ShoppingCart } from 'lucide-react';
import LiveChat from './LiveChat';

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-gray-800">LuxeJewels</Link>
            <div className="hidden md:flex space-x-6">
              <Link to="/products" className="text-gray-600 hover:text-gray-800">Products</Link>
              <Link to="/categories" className="text-gray-600 hover:text-gray-800">Categories</Link>
              <Link to="/about" className="text-gray-600 hover:text-gray-800">About</Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-800">Contact</Link>
            </div>
            <div className="flex items-center space-x-4">
              <form onSubmit={handleSearch} className="hidden md:flex">
                <Input 
                  type="search" 
                  placeholder="Search products..." 
                  className="w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit" variant="ghost">
                  <Search className="h-5 w-5" />
                </Button>
              </form>
              <Link to="/cart" className="text-gray-600 hover:text-gray-800">
                <ShoppingCart className="h-6 w-6" />
              </Link>
              <div className="md:hidden">
                <Button variant="ghost" size="icon" onClick={toggleMenu}>
                  {isMenuOpen ? <X /> : <Menu />}
                </Button>
              </div>
            </div>
          </div>
          {isMenuOpen && (
            <nav className="md:hidden mt-4 space-y-2">
              <Link to="/products" className="block text-gray-600 hover:text-gray-800">Products</Link>
              <Link to="/categories" className="block text-gray-600 hover:text-gray-800">Categories</Link>
              <Link to="/about" className="block text-gray-600 hover:text-gray-800">About</Link>
              <Link to="/contact" className="block text-gray-600 hover:text-gray-800">Contact</Link>
              <form onSubmit={handleSearch} className="mt-2">
                <Input 
                  type="search" 
                  placeholder="Search products..." 
                  className="w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
            </nav>
          )}
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About LuxeJewels</h3>
              <p className="text-sm">Discover exquisite jewelry pieces that elevate your style and capture life's precious moments.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/products" className="text-sm hover:underline">Shop All</Link></li>
                <li><Link to="/categories" className="text-sm hover:underline">Categories</Link></li>
                <li><Link to="/about" className="text-sm hover:underline">About Us</Link></li>
                <li><Link to="/contact" className="text-sm hover:underline">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li><Link to="/faq" className="text-sm hover:underline">FAQ</Link></li>
                <li><Link to="/shipping" className="text-sm hover:underline">Shipping & Returns</Link></li>
                <li><Link to="/care" className="text-sm hover:underline">Jewelry Care</Link></li>
                <li><Link to="/size-guide" className="text-sm hover:underline">Size Guide</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
              <form className="space-y-2">
                <Input type="email" placeholder="Enter your email" className="w-full" />
                <Button type="submit" className="w-full">Subscribe</Button>
              </form>
              <div className="mt-4 flex space-x-4">
                {/* Add social media icons here */}
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
            © 2024 LuxeJewels. All rights reserved.
          </div>
        </div>
      </footer>
      <LiveChat />
    </div>
  );
};

export default Layout;