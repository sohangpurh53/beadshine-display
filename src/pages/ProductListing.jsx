import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useLocation } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Star, ShoppingCart, Heart } from 'lucide-react';
import Layout from '../components/Layout';

// Mock function to fetch products (replace with actual API call)
const fetchProducts = async (page = 1, sortBy = 'newest', filters = {}) => {
  // Simulated API call
  const allProducts = [
    { id: 1, title: "Diamond Ring", image: "https://example.com/diamond-ring.jpg", price: 1999.99, rating: 4.8, category: "rings" },
    { id: 2, title: "Pearl Necklace", image: "https://example.com/pearl-necklace.jpg", price: 599.99, rating: 4.5, category: "necklaces" },
    { id: 3, title: "Gold Bracelet", image: "https://example.com/gold-bracelet.jpg", price: 799.99, rating: 4.7, category: "bracelets" },
    { id: 4, title: "Sapphire Earrings", image: "https://example.com/sapphire-earrings.jpg", price: 449.99, rating: 4.6, category: "earrings" },
    // Add more products...
  ];

  // Apply filters
  let filteredProducts = allProducts.filter(product => {
    if (filters.priceRange) {
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false;
    }
    if (filters.categories && filters.categories.length > 0) {
      if (!filters.categories.includes(product.category)) return false;
    }
    // Add more filter conditions as needed
    return true;
  });

  // Sort products
  filteredProducts.sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.id - a.id; // Default to newest
  });

  // Paginate
  const itemsPerPage = 12;
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  return {
    products: paginatedProducts,
    totalPages: Math.ceil(filteredProducts.length / itemsPerPage)
  };
};

const ProductCard = ({ product }) => (
  <Card className="overflow-hidden group">
    <div className="relative">
      <img src={product.image} alt={product.title} className="w-full h-64 object-cover" />
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button size="icon" variant="secondary" className="rounded-full">
          <Heart className="h-4 w-4" />
        </Button>
      </div>
    </div>
    <CardContent className="p-4">
      <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
      <div className="flex justify-between items-center mb-2">
        <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
        <div className="flex items-center">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span className="ml-1 text-sm">{product.rating.toFixed(1)}</span>
        </div>
      </div>
    </CardContent>
    <CardFooter className="p-4 pt-0">
      <Button className="w-full">
        <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
      </Button>
    </CardFooter>
  </Card>
);

const ProductListing = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('newest');
  const [filters, setFilters] = useState({
    priceRange: [0, 2000],
    categories: []
  });
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['products', page, sortBy, filters, searchQuery],
    queryFn: () => fetchProducts(page, sortBy, { ...filters, searchQuery }),
  });

  useEffect(() => {
    refetch();
  }, [searchQuery, refetch]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
    setPage(1); // Reset to first page when filters change
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <Layout>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar with filters */}
        <aside className="w-full md:w-64 space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Price Range</h3>
            <Slider
              min={0}
              max={2000}
              step={10}
              value={filters.priceRange}
              onValueChange={(value) => handleFilterChange('priceRange', value)}
            />
            <div className="flex justify-between mt-2">
              <span>${filters.priceRange[0]}</span>
              <span>${filters.priceRange[1]}</span>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Categories</h3>
            {['rings', 'necklaces', 'bracelets', 'earrings'].map(category => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={filters.categories.includes(category)}
                  onCheckedChange={(checked) => {
                    const newCategories = checked
                      ? [...filters.categories, category]
                      : filters.categories.filter(c => c !== category);
                    handleFilterChange('categories', newCategories);
                  }}
                />
                <label htmlFor={category} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </label>
              </div>
            ))}
          </div>
          {/* Add more filter options here */}
        </aside>

        {/* Main content */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Our Products</h1>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {searchQuery && (
            <p className="mb-4">Showing results for: "{searchQuery}"</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {data.products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={() => setPage(p => Math.max(1, p - 1))} />
              </PaginationItem>
              {[...Array(data.totalPages).keys()].map(i => (
                <PaginationItem key={i}>
                  <PaginationLink onClick={() => setPage(i + 1)} isActive={page === i + 1}>
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext onClick={() => setPage(p => Math.min(data.totalPages, p + 1))} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </Layout>
  );
};

export default ProductListing;