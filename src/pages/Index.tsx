
import React, { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import Cart, { CartItem } from '../components/Cart';
import { Product } from '../components/ProductCard';

const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 199,
    originalPrice: 249,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 124,
    category: "Electronics",
    isNew: true,
    isOnSale: true,
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 299,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 89,
    category: "Wearables",
    isNew: true,
  },
  {
    id: 3,
    name: "Minimalist Desk Lamp",
    price: 79,
    originalPrice: 99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop",
    rating: 4.4,
    reviews: 56,
    category: "Home & Living",
    isOnSale: true,
  },
  {
    id: 4,
    name: "Organic Cotton T-Shirt",
    price: 29,
    image: "https://images.unsplash.com/photo-1521572463247-2fa2e9c5b38e?w=400&h=300&fit=crop",
    rating: 4.7,
    reviews: 203,
    category: "Fashion",
  },
  {
    id: 5,
    name: "Professional Camera",
    price: 899,
    originalPrice: 1099,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop",
    rating: 4.9,
    reviews: 78,
    category: "Electronics",
    isOnSale: true,
  },
  {
    id: 6,
    name: "Luxury Skincare Set",
    price: 149,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop",
    rating: 4.5,
    reviews: 167,
    category: "Beauty",
    isNew: true,
  },
  {
    id: 7,
    name: "Artisan Coffee Beans",
    price: 24,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 234,
    category: "Food & Drink",
  },
  {
    id: 8,
    name: "Ergonomic Office Chair",
    price: 399,
    originalPrice: 499,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 91,
    category: "Furniture",
    isOnSale: true,
  },
];

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      removeItem(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        cartItemsCount={cartItemsCount}
        onCartClick={() => setIsCartOpen(true)}
      />
      <Hero />
      <ProductGrid 
        products={sampleProducts}
        onAddToCart={addToCart}
      />
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />
    </div>
  );
};

export default Index;
