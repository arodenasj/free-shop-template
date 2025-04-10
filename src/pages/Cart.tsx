
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/layout/Navbar";
import { Footer } from "@/components/ui/layout/Footer";
import { CartItem } from "@/components/ui/cart/CartItem";
import { useCart } from "@/contexts/CartContext";

const Cart = () => {
  const { items, subtotal } = useCart();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container-custom py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

          {items.length > 0 ? (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart Items */}
              <div className="lg:w-2/3">
                <div className="bg-white rounded-lg border overflow-hidden">
                  <div className="p-6 space-y-6">
                    {items.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:w-1/3">
                <div className="bg-white rounded-lg border overflow-hidden animate-fade-in">
                  <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                      Order Summary
                    </h2>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-medium text-gray-900">
                          ${subtotal.toFixed(2)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Shipping</span>
                        <span className="font-medium text-gray-900">
                          {subtotal > 50 ? "Free" : "$5.00"}
                        </span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Tax</span>
                        <span className="font-medium text-gray-900">
                          ${(subtotal * 0.1).toFixed(2)}
                        </span>
                      </div>
                      
                      <div className="border-t border-gray-200 pt-4 mt-4">
                        <div className="flex justify-between">
                          <span className="text-base font-medium text-gray-900">Total</span>
                          <span className="text-base font-medium text-gray-900">
                            ${(subtotal + (subtotal > 50 ? 0 : 5) + subtotal * 0.1).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Button asChild className="w-full" size="lg">
                        <Link to="/checkout">
                          Proceed to Checkout
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg border animate-fade-in">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag className="h-12 w-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-medium text-gray-900 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-8">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Button asChild size="lg">
                <Link to="/products">
                  Browse Products
                </Link>
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
