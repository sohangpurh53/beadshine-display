import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useLocation } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import Layout from '../components/Layout';

// Mock function to fetch products
const fetchProducts = async (page = 1, sortBy = 'newest', searchQuery = '', category = '') => {
  // In a real app, this would be an API call
  const allProducts = [
    { id: 1, title: "Ruby Beads", image: "https://example.com/ruby-beads.jpg", description: "Vibrant red ruby beads for stunning jewelry creations.", category: "beads" },
    { id: 2, title: "Silver Chain", image: "https://example.com/silver-chain.jpg", description: "Sterling silver chain for versatile jewelry designs.", category: "jewelry" },
    { id: 3, title: "Emerald Pendant", image: "https://example.com/emerald-pendant.jpg", description: "Elegant emerald pendant for a touch of luxury.", category: "jewelry" },
    { id: 4, title: "Gold Clasp", image: "https://example.com/gold-clasp.jpg", description: "14k gold clasp for secure and stylish closures.", category: "charms" },
    { id: 5, title: "Pearl Earrings", image: "https://example.com/pearl-earrings.jpg", description: "Classic freshwater pearl earrings for timeless elegance.", category: "jewelry" },
    // ... more products
  ];

  // Filter products based on search query and category
  const filteredProducts = allProducts.filter(product => 
    (searchQuery ? (
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) : true) &&
    (category ? product.category === category : true)
  );

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'newest') return b.id - a.id;
    // Add more sorting logic here if needed
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

const ProductListing = () => {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('newest');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['products', page, sortBy, searchQuery, category],
    queryFn: () => fetchProducts(page, sortBy, searchQuery, category),
  });

  useEffect(() => {
    refetch();
  }, [searchQuery, category, refetch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <Layout>
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
      {category && (
        <p className="mb-4">Category: {category}</p>
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
    </Layout>
  );
};

export default ProductListing;