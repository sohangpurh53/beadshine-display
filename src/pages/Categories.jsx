import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from '../components/Layout';

const categories = [
  { name: 'Beads', image: 'https://example.com/beads-category.jpg', description: 'Explore our wide variety of beads for all your jewelry making needs.' },
  { name: 'Jewelry', image: 'https://example.com/jewelry-category.jpg', description: 'Discover our collection of ready-made jewelry pieces.' },
  { name: 'Charms', image: 'https://example.com/charms-category.jpg', description: 'Find the perfect charm to personalize your jewelry.' },
];

const CategoryCard = ({ category }) => (
  <Card className="overflow-hidden">
    <img src={category.image} alt={category.name} className="w-full h-48 object-cover" />
    <CardContent className="p-4">
      <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
      <p className="text-sm text-gray-600">{category.description}</p>
    </CardContent>
    <CardFooter>
      <Link to={`/products?category=${category.name.toLowerCase()}`}>
        <Button variant="outline">View Products</Button>
      </Link>
    </CardFooter>
  </Card>
);

const Categories = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Product Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <CategoryCard key={index} category={category} />
        ))}
      </div>
    </Layout>
  );
};

export default Categories;