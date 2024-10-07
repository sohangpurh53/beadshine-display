import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

export default ProductCard;