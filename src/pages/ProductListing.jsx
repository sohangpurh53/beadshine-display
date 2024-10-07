import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import Layout from '../components/Layout';

// Mock function to fetch products
const fetchProducts = async (page = 1) => {
  // In a real app, this would be an API call
  return {
    products: [
      { id: 1, title: "Ruby Beads", image: "https://example.com/ruby-beads.jpg", description: "Vibrant red ruby beads for stunning jewelry creations." },
      { id: 2, title: "Silver Chain", image: "https://example.com/silver-chain.jpg", description: "Sterling silver chain for versatile jewelry designs." },
      // ... more products
    ],
    totalPages: 5
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

  const { data, isLoading, error } = useQuery({
    queryKey: ['products', page, sortBy],
    queryFn: () => fetchProducts(page),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Our Products</h1>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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