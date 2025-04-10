
import React, { createContext, useContext, ReactNode, useState } from "react";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured?: boolean;
};

// Mock products data
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    description: "Premium wireless headphones with noise cancellation and high-quality sound.",
    price: 149.99,
    image: "https://res.cloudinary.com/dmuce4d8x/image/upload/v1744280383/still-life-tech-device_hx7nsq.jpg",
    category: "Electronics",
    featured: true
  },
  {
    id: "2",
    name: "Smartphone Pro",
    description: "Latest smartphone with advanced camera and powerful performance.",
    price: 899.99,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=500",
    category: "Electronics",
    featured: true
  },
  {
    id: "3",
    name: "Classic Watch",
    description: "Elegant watch with leather strap and precise movement.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=500",
    category: "Accessories"
  },
  {
    id: "4",
    name: "Leather Backpack",
    description: "Handcrafted leather backpack with multiple compartments.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=500",
    category: "Bags",
    featured: true
  },
  {
    id: "5",
    name: "Sunglasses",
    description: "UV-protective sunglasses with stylish design.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=500",
    category: "Accessories"
  },
  {
    id: "6",
    name: "Running Shoes",
    description: "Lightweight and durable running shoes for all terrains.",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=500",
    category: "Footwear",
    featured: true
  },
  {
    id: "7",
    name: "Smart Speaker",
    description: "Voice-controlled smart speaker with premium sound quality.",
    price: 89.99,
    image: "https://res.cloudinary.com/dmuce4d8x/image/upload/v1744280486/hand-touching-speakers-side-view_ftk3fw.jpg",
    category: "Electronics"
  },
  {
    id: "8",
    name: "Desk Lamp",
    description: "Adjustable desk lamp with multiple brightness levels.",
    price: 49.99,
    image: "https://res.cloudinary.com/dmuce4d8x/image/upload/v1744280554/lamp-bedroom_vm4tyf.jpg",
    category: "Home"
  }
];

type ProductContextType = {
  products: Product[];
  getProductById: (id: string) => Product | undefined;
  getFeaturedProducts: () => Product[];
  getProductsByCategory: (category: string) => Product[];
  getCategories: () => string[];
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};

type ProductProviderProps = {
  children: ReactNode;
};

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [products] = useState<Product[]>(mockProducts);

  const getProductById = (id: string) => {
    return products.find((product) => product.id === id);
  };

  const getFeaturedProducts = () => {
    return products.filter((product) => product.featured);
  };

  const getProductsByCategory = (category: string) => {
    return category === "All" 
      ? products 
      : products.filter((product) => product.category === category);
  };

  const getCategories = () => {
    const categories = products.map((product) => product.category);
    return ["All", ...new Set(categories)];
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        getProductById,
        getFeaturedProducts,
        getProductsByCategory,
        getCategories,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
