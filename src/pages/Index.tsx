
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight, Truck, ShieldCheck, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/layout/Navbar";
import { Footer } from "@/components/ui/layout/Footer";
import { ProductCard } from "@/components/ui/products/ProductCard";
import { useProducts } from "@/contexts/ProductContext";

const Home = () => {
  const { getFeaturedProducts } = useProducts();
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-r from-purple-50 to-indigo-50">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0 md:pr-8 animate-fade-in">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                  Shop with Style <br />
                  <span className="text-primary">Deliver with Speed</span>
                </h1>
                <p className="text-lg text-gray-700 mb-8 max-w-md">
                  Discover our curated collection of products with fast delivery and exceptional quality.
                </p>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <Button asChild size="lg" className="px-6">
                    <Link to="/products">
                      <ShoppingBag className="mr-2 h-5 w-5" />
                      Shop Now
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="px-6">
                    <Link to="/products">
                      Explore More
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="md:w-1/2 relative animate-fade-in">
                <img
                  src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&q=80&w=700"
                  alt="Hero image of products"
                  className="rounded-lg shadow-xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-accent rounded-lg p-4 shadow-lg hidden md:block">
                  <p className="text-white font-bold">
                    New Collection
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 rounded-lg border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
                <p className="text-gray-600">
                  Get your products delivered to your doorstep quickly and reliably.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-lg border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Quality Guarantee</h3>
                <p className="text-gray-600">
                  All our products come with a quality guarantee for your peace of mind.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-lg border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <CreditCard className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Secure Checkout</h3>
                <p className="text-gray-600">
                  Shop with confidence with our secure and easy checkout process.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Featured Products
              </h2>
              <Link to="/products" className="text-primary hover:text-primary/80 flex items-center">
                View All
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="product-grid">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 bg-primary text-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Stay Updated with Our Latest Offers
              </h2>
              <p className="text-primary-foreground/90 mb-8">
                Subscribe to our newsletter and be the first to know about exclusive deals and new arrivals.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-white text-gray-900"
                />
                <Button variant="secondary" className="whitespace-nowrap">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
