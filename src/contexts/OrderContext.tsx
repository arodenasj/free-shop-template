
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type OrderStatus = 'processing' | 'shipped' | 'delivered' | 'cancelled';

export type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export type Order = {
  id: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  date: string;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
};

type OrderContextType = {
  orders: Order[];
  createOrder: (order: Omit<Order, 'id' | 'date'>) => Order;
  getOrderById: (id: string) => Order | undefined;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};

type OrderProviderProps = {
  children: ReactNode;
};

// Sample orders for demonstration
const sampleOrders: Order[] = [
  {
    id: 'ord-001',
    items: [
      {
        id: '1',
        name: 'Wireless Headphones',
        price: 149.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1618160302696-80f9f4afcfe3?auto=format&fit=crop&q=80&w=500',
      },
    ],
    total: 149.99,
    status: 'shipped',
    date: '2025-04-05T12:00:00Z',
    shippingAddress: {
      name: 'John Doe',
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345',
      country: 'USA',
    },
  },
];

export const OrderProvider = ({ children }: OrderProviderProps) => {
  const [orders, setOrders] = useState<Order[]>(sampleOrders);

  const createOrder = (orderData: Omit<Order, 'id' | 'date'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Math.random().toString(36).substring(2, 8)}`,
      date: new Date().toISOString(),
    };

    setOrders((prev) => [...prev, newOrder]);
    return newOrder;
  };

  const getOrderById = (id: string) => {
    return orders.find((order) => order.id === id);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        getOrderById,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
