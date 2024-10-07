import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from '../components/Layout';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";

const FeaturedProduct = ({ title, image, price }) => (
  <Card className="group relative overflow-hidden">
    <img src={image} alt={title} className="w-full h-64 object-cover transition-transform group-hover:scale-105" />
    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
      <div className="text-white text-center">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-xl font-bold mb-4">${price}</p>
        <Button variant="outline" className="bg-white text-black hover:bg-gray-200">Quick View</Button>
      </div>
    </div>
  </Card>
);

const CategoryCard = ({ name, image }) => (
  <Card className="overflow-hidden">
    <img src={image} alt={name} className="w-full h-48 object-cover" />
    <CardContent className="p-4 text-center">
      <h3 className="font-semibold text-lg">{name}</h3>
    </CardContent>
  </Card>
);

const Index = () => {
  const heroSlides = [
    { image: "https://example.com/hero1.jpg", title: "Elegant Necklaces" },
    { image: "https://example.com/hero2.jpg", title: "Sparkling Rings" },
    { image: "https://example.com/hero3.jpg", title: "Timeless Watches" },
  ];

  const categories = [
    { name: "Necklaces", image: "https://example.com/necklaces.jpg" },
    { name: "Rings", image: "https://example.com/rings.jpg" },
    { name: "Earrings", image: "https://example.com/earrings.jpg" },
    { name: "Bracelets", image: "https://example.com/bracelets.jpg" },
  ];

  const featuredProducts = [
    { title: "Diamond Pendant", image: "https://example.com/diamond-pendant.jpg", price: 999.99 },
    { title: "Gold Bracelet", image: "https://example.com/gold-bracelet.jpg", price: 599.99 },
    { title: "Pearl Earrings", image: "https://example.com/pearl-earrings.jpg", price: 299.99 },
    { title: "Silver Watch", image: "https://example.com/silver-watch.jpg", price: 449.99 },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="mb-12">
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {heroSlides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[400px]">
                  <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                    <h2 className="text-4xl font-bold text-white">{slide.title}</h2>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>

      {/* Categories Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link key={index} to={`/categories/${category.name.toLowerCase()}`}>
              <CategoryCard {...category} />
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product, index) => (
            <FeaturedProduct key={index} {...product} />
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">Subscribe to Our Newsletter</h2>
          <p className="mb-6">Stay updated with our latest collections and exclusive offers.</p>
          <form className="flex flex-col sm:flex-row gap-4 justify-center">
            <Input type="email" placeholder="Enter your email" className="max-w-xs" />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Index;