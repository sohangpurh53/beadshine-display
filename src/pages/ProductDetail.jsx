import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from '../components/Layout';

// Mock function to fetch a single product
const fetchProduct = async (id) => {
  // In a real app, this would be an API call
  return {
    id,
    title: "Emerald Beads",
    images: ["https://example.com/emerald-beads-1.jpg", "https://example.com/emerald-beads-2.jpg"],
    description: "Luxurious emerald beads for creating stunning jewelry pieces.",
    details: {
      material: "Natural Emerald",
      size: "6mm",
      color: "Deep Green",
      quantity: "50 beads per strand"
    },
    relatedProducts: [
      { id: 2, title: "Ruby Beads", image: "https://example.com/ruby-beads.jpg" },
      { id: 3, title: "Sapphire Beads", image: "https://example.com/sapphire-beads.jpg" },
    ]
  };
};

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <Layout>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img 
            src={product.images[selectedImage]} 
            alt={product.title} 
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
          <div className="flex mt-4 space-x-2">
            {product.images.map((img, index) => (
              <img 
                key={index}
                src={img} 
                alt={`${product.title} ${index + 1}`}
                className={`w-20 h-20 object-cover rounded cursor-pointer ${selectedImage === index ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Product Details</h2>
            <ul className="list-disc list-inside">
              {Object.entries(product.details).map(([key, value]) => (
                <li key={key} className="text-gray-600">
                  <span className="font-medium">{key}:</span> {value}
                </li>
              ))}
            </ul>
          </div>
          <Button>Contact Us for More Details</Button>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {product.relatedProducts.map(relatedProduct => (
            <Card key={relatedProduct.id}>
              <img src={relatedProduct.image} alt={relatedProduct.title} className="w-full h-48 object-cover" />
              <CardContent className="p-4">
                <h3 className="font-semibold">{relatedProduct.title}</h3>
                <Button variant="link" className="mt-2">View Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;