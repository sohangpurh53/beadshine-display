import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Menu, X, Search } from 'lucide-react';
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
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-gray-800">BeadsBoutique</Link>
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={toggleMenu}>
                {isMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
            <nav className={`md:flex ${isMenuOpen ? 'flex' : 'hidden'} flex-col md:flex-row absolute md:relative top-16 md:top-0 left-0 md:left-auto right-0 md:right-auto bg-white md:bg-transparent p-4 md:p-0 shadow-md md:shadow-none z-50`}>
              <Link to="/products" className="text-gray-600 hover:text-gray-800 my-2 md:my-0 md:mx-2">Products</Link>
              <Link to="/categories" className="text-gray-600 hover:text-gray-800 my-2 md:my-0 md:mx-2">Categories</Link>
            </nav>
          </div>
          <form onSubmit={handleSearch} className="mt-4 flex">
            <Input 
              type="search" 
              placeholder="Search products..." 
              className="w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button type="submit" className="ml-2">
              <Search className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-gray-100">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600">
          © 2024 BeadsBoutique. All rights reserved.
        </div>
      </footer>
      <LiveChat />
    </div>
  );
};

export default Layout;