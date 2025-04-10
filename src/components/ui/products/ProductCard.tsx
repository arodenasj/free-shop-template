
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/contexts/ProductContext";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const { id, name, price, image } = product;
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id,
      name,
      price,
      image,
    });
  };

  return (
    <div className="group relative overflow-hidden rounded-lg border bg-white transition-all hover:shadow-md animate-fade-in">
      <Link to={`/products/${id}`} className="block">
        <div className="relative pt-[100%] overflow-hidden">
          <img
            src={image}
            alt={name}
            className="absolute inset-0 h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 line-clamp-1">{name}</h3>
          <p className="mt-1 text-lg font-medium text-primary">
            ${price.toFixed(2)}
          </p>
        </div>
      </Link>
      
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          size="sm"
          className="rounded-full"
          onClick={handleAddToCart}
          aria-label="Add to cart"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>
    </div>
  );
}
