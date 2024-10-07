import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useLocation } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import Layout from '../components/Layout';

// Mock function to fetch products
const fetchProducts = async (page = 1, sortBy = 'newest', searchQuery = '', filters = {}) => {
  // In a real app, this would be an API call
  const allProducts = [
    { id: 1, title: "Ruby Beads", image: "https://example.com/ruby-beads.jpg", description: "Vibrant red ruby beads for stunning jewelry creations.", category: "Beads", price: 1200, brand: "BeadsBoutique", rating: 4.5 },
    { id: 2, title: "Silver Chain", image: "https://example.com/silver-chain.jpg", description: "Sterling silver chain for versatile jewelry designs.", category: "Jewelry", price: 800, brand: "JewelryMaster", rating: 4.2 },
    { id: 3, title: "Emerald Pendant", image: "https://example.com/emerald-pendant.jpg", description: "Elegant emerald pendant for a touch of luxury.", category: "Jewelry", price: 2500, brand: "GemCraft", rating: 4.8 },
    { id: 4, title: "Gold Clasp", image: "https://example.com/gold-clasp.jpg", description: "14k gold clasp for secure and stylish closures.", category: "Supplies", price: 600, brand: "JewelryMaster", rating: 4.0 },
    { id: 5, title: "Pearl Earrings", image: "https://example.com/pearl-earrings.jpg", description: "Classic freshwater pearl earrings for timeless elegance.", category: "Jewelry", price: 1500, brand: "BeadsBoutique", rating: 4.7 },
    // ... more products
  ];

  // Filter products based on search query and filters
  const filteredProducts = allProducts.filter(product => 
    (searchQuery ? (
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) : true) &&
    (filters.category ? product.category === filters.category : true) &&
    (filters.priceRange ? (product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]) : true) &&
    (filters.brand ? product.brand === filters.brand : true) &&
    (filters.rating ? product.rating >= filters.rating : true)
  );

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'newest') return b.id - a.id;
    if (sortBy === 'popular') return b.rating - a.rating;
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0;
  });

  // Paginate products
  const itemsPerPage = 6;
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage);

  return {
    products: paginatedProducts,
    totalPages: Math.ceil(sortedProducts.length / itemsPerPage)
  };
};

const ProductCard = ({ product }) => (
  <Card className="overflow-hidden">
    <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
    <CardContent className="p-4">
      <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
      <p className="text-sm text-gray-600">{product.description}</p>
    </CardContent>
    <CardFooter>
      <Link to={`/products/${product.id}`}>
        <Button variant="outline">View Details</Button>
      </Link>
    </CardFooter>
  </Card>
);

const FilterSection = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="font-semibold mb-2">{title}</h3>
    {children}
  </div>
);

const ProductListing = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('newest');
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 5000],
    brand: '',
    rating: 0,
  });
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['products', page, sortBy, searchQuery, filters],
    queryFn: () => fetchProducts(page, sortBy, searchQuery, filters),
  });

  useEffect(() => {
    refetch();
  }, [searchQuery, filters, refetch]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1); // Reset to first page when filters change
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <Layout>
      <div className="flex flex-col md:flex-row">
        {/* Filters Sidebar */}
        <div className="w-full md:w-1/4 pr-4">
          <h2 className="text-xl font-bold mb-4">Filters</h2>
          
          <FilterSection title="Categories">
            {['Beads', 'Jewelry', 'Charms', 'Supplies'].map(category => (
              <div key={category} className="flex items-center mb-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={filters.category === category}
                  onCheckedChange={() => handleFilterChange('category', category)}
                />
                <label htmlFor={`category-${category}`} className="ml-2">{category}</label>
              </div>
            ))}
          </FilterSection>

          <FilterSection title="Price Range">
            <div className="flex items-center mb-2">
              <Input
                type="number"
                placeholder="Min"
                value={filters.priceRange[0]}
                onChange={(e) => handleFilterChange('priceRange', [parseInt(e.target.value), filters.priceRange[1]])}
                className="w-20 mr-2"
              />
              <span>to</span>
              <Input
                type="number"
                placeholder="Max"
                value={filters.priceRange[1]}
                onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                className="w-20 ml-2"
              />
            </div>
            <Slider
              min={0}
              max={5000}
              step={100}
              value={filters.priceRange}
              onValueChange={(value) => handleFilterChange('priceRange', value)}
              className="mt-2"
            />
          </FilterSection>

          <FilterSection title="Brand">
            <Input
              type="text"
              placeholder="Search Brand"
              value={filters.brand}
              onChange={(e) => handleFilterChange('brand', e.target.value)}
              className="mb-2"
            />
            {['BeadsBoutique', 'GemCraft', 'JewelryMaster', 'CharmWorld'].map(brand => (
              <div key={brand} className="flex items-center mb-2">
                <Checkbox
                  id={`brand-${brand}`}
                  checked={filters.brand === brand}
                  onCheckedChange={() => handleFilterChange('brand', brand)}
                />
                <label htmlFor={`brand-${brand}`} className="ml-2">{brand}</label>
              </div>
            ))}
          </FilterSection>

          <FilterSection title="Customer Ratings">
            {[4, 3, 2, 1].map(rating => (
              <div key={rating} className="flex items-center mb-2">
                <Checkbox
                  id={`rating-${rating}`}
                  checked={filters.rating === rating}
                  onCheckedChange={() => handleFilterChange('rating', rating)}
                />
                <label htmlFor={`rating-${rating}`} className="ml-2">{rating}★ & above</label>
              </div>
            ))}
          </FilterSection>
        </div>

        {/* Product Listing */}
        <div className="w-full md:w-3/4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-3xl font-bold mb-4 md:mb-0">Our Products</h1>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {searchQuery && (
            <p className="mb-4">Showing results for: "{searchQuery}"</p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
