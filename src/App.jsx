import React, { useState } from 'react';
import ProductList from './ProductList';
import './App.css';

function App() {
  // Sample product data
  const [products] = useState([
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
      description: 'Premium wireless headphones with noise cancellation',
      rating: 4.5,
      inStock: true
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
      description: 'Feature-rich smartwatch with fitness tracking',
      rating: 4.8,
      inStock: true
    },
    {
      id: 3,
      name: 'Laptop Backpack',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop',
      description: 'Durable backpack with laptop compartment',
      rating: 4.3,
      inStock: true
    },
    {
      id: 4,
      name: 'USB-C Hub',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=300&h=300&fit=crop',
      description: '7-in-1 USB-C hub with multiple ports',
      rating: 4.6,
      inStock: false
    },
    {
      id: 5,
      name: 'Mechanical Keyboard',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop',
      description: 'RGB mechanical keyboard with blue switches',
      rating: 4.7,
      inStock: true
    },
    {
      id: 6,
      name: 'Wireless Mouse',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop',
      description: 'Ergonomic wireless mouse with precision tracking',
      rating: 4.4,
      inStock: true
    }
  ]);

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="App">
      <header className="header">
        <h1>🛒 TechShop Online</h1>
        <div className="cart-badge">
          Cart ({cart.length})
        </div>
      </header>
      
      <main className="main-content">
        <h2>Featured Products</h2>
        <ProductList products={products} onAddToCart={addToCart} />
      </main>
      
      <footer className="footer">
        <p>&copy; 2026 TechShop Online. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
