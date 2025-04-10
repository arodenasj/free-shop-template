
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ShoppingCart, 
  User, 
  Menu, 
  Search, 
  X 
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="text-xl md:text-2xl font-bold text-primary flex items-center"
            >
              ShopQuick
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-gray-800 hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-gray-800 hover:text-primary transition-colors">
              Products
            </Link>
            <Link to="/orders" className="text-gray-800 hover:text-primary transition-colors">
              Track Order
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon" aria-label="Cart">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* Account */}
            <Button variant="ghost" size="icon" aria-label="Account">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-white z-50 animate-fade-in">
            <div className="p-4 flex justify-end">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="flex flex-col space-y-6 items-center pt-16 text-lg">
              <Link to="/" className="text-gray-800 hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link to="/products" className="text-gray-800 hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                Products
              </Link>
              <Link to="/orders" className="text-gray-800 hover:text-primary" onClick={() => setIsMenuOpen(false)}>
                Track Order
              </Link>
            </nav>
          </div>
        )}

        {/* Search overlay */}
        {isSearchOpen && (
          <div className="fixed inset-0 bg-white z-50 p-4 animate-fade-in">
            <div className="container-custom">
              <div className="flex justify-end mb-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(false)}
                  aria-label="Close search"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <div className="max-w-3xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    autoFocus
                  />
                  <Button
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    aria-label="Search"
                  >
                    <Search className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
