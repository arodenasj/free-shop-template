
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/ui/layout/Navbar";
import { Footer } from "@/components/ui/layout/Footer";
import { CheckoutForm } from "@/components/ui/checkout/CheckoutForm";
import { useCart } from "@/contexts/CartContext";

const Checkout = () => {
  const { items, subtotal } = useCart();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container-custom py-8">
          <div className="mb-6">
            <Link to="/cart" className="inline-flex items-center text-gray-600 hover:text-primary">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Cart
            </Link>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

          {items.length > 0 ? (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Checkout Form */}
              <div className="lg:w-2/3">
                <div className="bg-white rounded-lg border p-6">
                  <CheckoutForm />
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:w-1/3">
                <div className="bg-white rounded-lg border p-6 animate-fade-in">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    Order Summary
                  </h2>
                  
                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-grow">
                          <h3 className="text-sm text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity} × ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">
                            ${(item.quantity * item.price).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-4 space-y-4">
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
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg border">
              <h2 className="text-2xl font-medium text-gray-900 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-8">
                You need to add items to your cart before checking out.
              </p>
              <Link 
                to="/products" 
                className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                Browse Products
              </Link>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
