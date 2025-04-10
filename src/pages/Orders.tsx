
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Package, Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/ui/layout/Navbar";
import { Footer } from "@/components/ui/layout/Footer";
import { OrderStatus } from "@/components/ui/orders/OrderStatus";
import { useOrders } from "@/contexts/OrderContext";

const Orders = () => {
  const { orders } = useOrders();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOrders = searchQuery 
    ? orders.filter(order => order.id.toLowerCase().includes(searchQuery.toLowerCase()))
    : orders;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gray-50 py-6">
          <div className="container-custom">
            <h1 className="text-3xl font-bold text-gray-900">Track Orders</h1>
            <div className="flex items-center text-sm mt-2">
              <span className="text-gray-500">Home</span>
              <span className="mx-2 text-gray-400">/</span>
              <span className="font-medium text-gray-700">Orders</span>
            </div>
          </div>
        </div>

        <div className="container-custom py-8">
          <div className="max-w-4xl mx-auto bg-white rounded-lg border overflow-hidden animate-fade-in">
            <div className="p-6 border-b">
              <h2 className="text-xl font-medium text-gray-900 mb-4">
                Your Orders
              </h2>

              {/* Search */}
              <div className="relative max-w-md">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by order ID..."
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {filteredOrders.length > 0 ? (
              <div className="divide-y">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          Order placed on {new Date(order.date).toLocaleDateString()}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          <h3 className="text-lg font-medium text-gray-900">
                            {order.id}
                          </h3>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            order.status === 'delivered' 
                              ? 'bg-green-100 text-green-800' 
                              : order.status === 'shipped' 
                                ? 'bg-blue-100 text-blue-800'
                                : order.status === 'cancelled'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      <div className="mt-4 sm:mt-0">
                        <Link 
                          to={`/order-confirmation/${order.id}`}
                          className="inline-flex items-center text-primary hover:text-primary/80"
                        >
                          View Order Details
                        </Link>
                      </div>
                    </div>

                    <OrderStatus status={order.status} />

                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex flex-wrap gap-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center">
                            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="ml-3">
                              <p className="text-sm text-gray-900">{item.name}</p>
                              <p className="text-xs text-gray-500">
                                Qty: {item.quantity}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <Package className="h-12 w-12 text-gray-400" />
                </div>
                {searchQuery ? (
                  <>
                    <h2 className="text-2xl font-medium text-gray-900 mb-2">
                      No orders found
                    </h2>
                    <p className="text-gray-600 mb-8">
                      No orders match your search criteria.
                    </p>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-medium text-gray-900 mb-2">
                      You haven't placed any orders yet
                    </h2>
                    <p className="text-gray-600 mb-8">
                      When you place an order, it will appear here for tracking.
                    </p>
                  </>
                )}
                <Button asChild>
                  <Link to="/products">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Start Shopping
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Orders;
