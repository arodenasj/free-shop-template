
import React from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle, ShoppingBag, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/layout/Navbar";
import { Footer } from "@/components/ui/layout/Footer";
import { useOrders } from "@/contexts/OrderContext";

const OrderConfirmation = () => {
  const { id } = useParams<{ id: string }>();
  const { getOrderById } = useOrders();
  const order = getOrderById(id || "");

  if (!order) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container-custom py-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Order Not Found
            </h2>
            <p className="text-gray-600 mb-8">
              The order you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/products">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Continue Shopping
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container-custom py-8">
          <div className="max-w-3xl mx-auto bg-white rounded-lg border overflow-hidden animate-fade-in">
            <div className="p-6 text-center border-b">
              <div className="inline-flex items-center justify-center bg-green-100 text-green-600 rounded-full w-16 h-16 mb-4">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Thank You For Your Order!
              </h1>
              <p className="text-gray-600">
                Your order has been received and is being processed.
              </p>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col sm:flex-row justify-between mb-6">
                <div>
                  <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Order Number
                  </h2>
                  <p className="text-lg font-medium text-gray-900">{order.id}</p>
                </div>
                <div className="mt-4 sm:mt-0">
                  <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    Order Date
                  </h2>
                  <p className="text-lg font-medium text-gray-900">
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6 mb-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Order Items
                </h2>
                <div className="space-y-4">
                  {order.items.map((item) => (
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
              </div>
              
              <div className="border-t border-gray-200 pt-6 mb-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Delivery Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Shipping Address
                    </h3>
                    <address className="not-italic text-gray-700">
                      <p>{order.shippingAddress.name}</p>
                      <p>{order.shippingAddress.street}</p>
                      <p>
                        {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                      </p>
                      <p>{order.shippingAddress.country}</p>
                    </address>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Estimated Delivery
                    </h3>
                    <p className="text-gray-700">
                      {new Date(new Date(order.date).getTime() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()} - 
                      {new Date(new Date(order.date).getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6 mb-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Order Summary
                </h2>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-900">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-gray-900">
                      {order.total > 50 ? "Free" : "$5.00"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium text-gray-900">
                      ${(order.total * 0.1).toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="text-base font-medium text-gray-900">Total</span>
                      <span className="text-base font-medium text-gray-900">
                        ${(order.total + (order.total > 50 ? 0 : 5) + order.total * 0.1).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <Button asChild size="lg" className="flex-grow">
                  <Link to="/orders">
                    <Package className="mr-2 h-4 w-4" />
                    Track Order
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="flex-grow">
                  <Link to="/products">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderConfirmation;
