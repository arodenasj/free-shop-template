
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, SlidersHorizontal } from "lucide-react";
import { Navbar } from "@/components/ui/layout/Navbar";
import { Footer } from "@/components/ui/layout/Footer";
import { ProductCard } from "@/components/ui/products/ProductCard";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/contexts/ProductContext";

const Products = () => {
  const { products, getCategories, getProductsByCategory } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const categories = getCategories();

  // Sync with URL parameters
  useEffect(() => {
    const categoryParam = searchParams.get("category") || "All";
    setSelectedCategory(categoryParam);
  }, [searchParams]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category);
    }
    setSearchParams(searchParams);
  };

  const displayedProducts = getProductsByCategory(selectedCategory);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-gray-50 py-6">
          <div className="container-custom">
            <h1 className="text-3xl font-bold text-gray-900">Products</h1>
            <div className="flex items-center text-sm mt-2">
              <span className="text-gray-500">Home</span>
              <span className="mx-2 text-gray-400">/</span>
              <span className="font-medium text-gray-700">Products</span>
              {selectedCategory !== "All" && (
                <>
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="font-medium text-primary">{selectedCategory}</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="container-custom py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Mobile Filter Toggle */}
            <div className="md:hidden mb-4">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter className="mr-2 h-4 w-4" />
                Filter Products
              </Button>
            </div>

            {/* Sidebar with Categories */}
            <div 
              className={`md:w-64 flex-shrink-0 ${
                isFilterOpen ? 'block' : 'hidden md:block'
              }`}
            >
              <div className="sticky top-24 bg-white rounded-lg border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium">Categories</h3>
                  <SlidersHorizontal className="h-5 w-5 text-gray-500" />
                </div>
                
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`w-full text-left py-2 px-3 rounded-md transition-colors ${
                        selectedCategory === category
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => handleCategoryChange(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="flex-grow">
              {displayedProducts.length > 0 ? (
                <div className="product-grid">
                  {displayedProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-500">
                    Try changing your filter or check back later.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
