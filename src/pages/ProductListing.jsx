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
import { fetchProducts } from '../utils/productUtils';
import FilterSection from '../components/FilterSection';
import ProductCard from '../components/ProductCard';

const ProductListing = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('newest');
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 5000],
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
    setPage(1);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <Layout>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 pr-4">
          <h2 className="text-xl font-bold mb-4">Filters</h2>
          
          <FilterSection 
            title="Categories" 
            categories={['Beads', 'Jewelry', 'Charms', 'Supplies']}
            selectedCategory={filters.category}
            onCategoryChange={(category) => handleFilterChange('category', category)}
          />

          <FilterSection 
            title="Price Range"
            priceRange={filters.priceRange}
            onPriceRangeChange={(range) => handleFilterChange('priceRange', range)}
          />
        </div>

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