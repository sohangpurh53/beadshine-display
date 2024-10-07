import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LiveChat from './LiveChat';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-gray-800">BeadsBoutique</Link>
          <div className="flex-grow mx-4 max-w-xl">
            <Input type="search" placeholder="Search products..." className="w-full" />
          </div>
          <nav>
            <Link to="/products" className="text-gray-600 hover:text-gray-800 mx-2">Products</Link>
            <Link to="/categories" className="text-gray-600 hover:text-gray-800 mx-2">Categories</Link>
          </nav>
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