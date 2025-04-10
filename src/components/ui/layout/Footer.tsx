
import React from "react";
import { Link } from "react-router-dom";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin 
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-10 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand and about section */}
          <div className="col-span-1">
            <Link to="/" className="text-xl font-bold text-primary">
              ShopQuick
            </Link>
            <p className="mt-4 text-gray-600">
              Your one-stop shop for quality products with fast delivery and excellent customer service.
            </p>
            <div className="flex mt-6 space-x-4">
              <a 
                href="#" 
                className="text-gray-500 hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-500 hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-500 hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Shop links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Shop
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/products" className="text-gray-600 hover:text-primary transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?category=Electronics" className="text-gray-600 hover:text-primary transition-colors">
                  Electronics
                </Link>
              </li>
              <li>
                <Link to="/products?category=Accessories" className="text-gray-600 hover:text-primary transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/products?category=Home" className="text-gray-600 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
            </ul>
          </div>

          {/* Company links */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-primary transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact information */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" />
                <span className="text-gray-600">
                  123 Shop Street, City, 10001
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" />
                <span className="text-gray-600">
                  +1 (555) 123-4567
                </span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" />
                <span className="text-gray-600">
                  support@shopquick.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} ShopQuick. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
