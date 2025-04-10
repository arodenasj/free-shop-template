
import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Share2, ArrowLeft, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/layout/Navbar";
import { Footer } from "@/components/ui/layout/Footer";
import { useProducts } from "@/contexts/ProductContext";
import { useCart } from "@/contexts/CartContext";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById } = useProducts();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = getProductById(id || "");

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container-custom py-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Product Not Found
            </h2>
            <p className="text-gray-600 mb-8">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/products">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Products
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    }
    navigate("/cart");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container-custom py-8">
          {/* Breadcrumbs */}
          <div className="mb-8">
            <div className="flex items-center text-sm">
              <Link to="/" className="text-gray-500 hover:text-primary">
                Home
              </Link>
              <span className="mx-2 text-gray-400">/</span>
              <Link to="/products" className="text-gray-500 hover:text-primary">
                Products
              </Link>
              <span className="mx-2 text-gray-400">/</span>
              <span className="font-medium text-gray-700">{product.name}</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Product Image */}
            <div className="md:w-1/2 animate-fade-in">
              <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="md:w-1/2 animate-fade-in">
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-500">5.0 (24 reviews)</span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              
              <p className="text-2xl font-semibold text-primary mb-4">
                ${product.price.toFixed(2)}
              </p>
              
              <div className="mb-6">
                <p className="text-gray-700">{product.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Category</h3>
                <Link 
                  to={`/products?category=${product.category}`}
                  className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700 hover:bg-gray-200"
                >
                  {product.category}
                </Link>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
                <div className="flex items-center w-32">
                  <button 
                    className="w-10 h-10 border rounded-l-md flex items-center justify-center text-gray-600 hover:bg-gray-50"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <div className="w-12 h-10 border-t border-b flex items-center justify-center">
                    {quantity}
                  </div>
                  <button 
                    className="w-10 h-10 border rounded-r-md flex items-center justify-center text-gray-600 hover:bg-gray-50"
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-6">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <Share2 className="mr-2 h-5 w-5" />
                  Share
                </Button>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <div className="text-sm text-gray-500">
                  <p className="mb-2">
                    <span className="font-medium text-gray-700">Free shipping</span> on orders over $50
                  </p>
                  <p>
                    <span className="font-medium text-gray-700">In stock</span> - Ready to ship
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
