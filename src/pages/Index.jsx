import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from '../components/Layout';

const FeaturedProduct = ({ title, image, description }) => (
  <Card className="overflow-hidden">
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <CardContent className="p-4">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </CardContent>
    <CardFooter>
      <Link to={`/products/${title.toLowerCase().replace(/ /g, '-')}`}>
        <Button variant="outline">View Details</Button>
      </Link>
    </CardFooter>
  </Card>
);

const Index = () => {
  const featuredProducts = [
    { title: "Sapphire Beads", image: "https://example.com/sapphire-beads.jpg", description: "Exquisite blue sapphire beads for elegant jewelry designs." },
    { title: "Pearl Necklace", image: "https://example.com/pearl-necklace.jpg", description: "Classic freshwater pearl necklace with sterling silver clasp." },
    { title: "Gold Charms", image: "https://example.com/gold-charms.jpg", description: "Delicate 14k gold charms for bracelets and necklaces." },
  ];

  return (
    <Layout>
      <h1 className="text-4xl font-bold mb-8 text-center">Welcome to BeadsBoutique</h1>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product, index) => (
            <FeaturedProduct key={index} {...product} />
          ))}
        </div>
      </section>
      <section className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Explore Our Collections</h2>
        <div className="flex justify-center space-x-4">
          <Link to="/categories/beads">
            <Button>Beads</Button>
          </Link>
          <Link to="/categories/jewelry">
            <Button>Jewelry</Button>
          </Link>
          <Link to="/categories/charms">
            <Button>Charms</Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;