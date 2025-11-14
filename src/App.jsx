import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, User, Heart, Star, Menu, X, Filter, Plus, Minus, Check } from 'lucide-react';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Mock data for batik products
  const products = [
    {
      id: 1,
      name: "Traditional Parang Batik",
      price: 129.99,
      originalPrice: 159.99,
      category: "traditional",
      image: "https://placehold.co/400x400/8B4513/FFFFFF?text=Parang+Batik",
      rating: 4.8,
      reviews: 124,
      description: "Handcrafted traditional Indonesian batik featuring the iconic parang motif, symbolizing strength and protection.",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Brown", "Blue", "Green"]
    },
    {
      id: 2,
      name: "Modern Floral Batik Dress",
      price: 89.99,
      category: "modern",
      image: "https://placehold.co/400x400/FF69B4/FFFFFF?text=Floral+Dress",
      rating: 4.6,
      reviews: 89,
      description: "Contemporary floral batik dress perfect for casual outings and special occasions.",
      sizes: ["S", "M", "L"],
      colors: ["Pink", "Purple", "Red"]
    },
    {
      id: 3,
      name: "Premium Handwoven Sarong",
      price: 79.99,
      originalPrice: 99.99,
      category: "accessories",
      image: "https://placehold.co/400x400/4169E1/FFFFFF?text=Sarong",
      rating: 4.9,
      reviews: 156,
      description: "Authentic handwoven sarong made from premium cotton with intricate traditional patterns.",
      sizes: ["One Size"],
      colors: ["Multi-color", "Blue", "Red"]
    },
    {
      id: 4,
      name: "Royal Court Batik Shirt",
      price: 149.99,
      category: "traditional",
      image: "https://placehold.co/400x400/800080/FFFFFF?text=Court+Shirt",
      rating: 4.7,
      reviews: 92,
      description: "Elegant royal court batik shirt with gold accents, perfect for formal ceremonies.",
      sizes: ["M", "L", "XL", "XXL"],
      colors: ["Purple", "Gold", "Black"]
    },
    {
      id: 5,
      name: "Beach Resort Batik Set",
      price: 199.99,
      category: "modern",
      image: "https://placehold.co/400x400/20B2AA/FFFFFF?text=Resort+Set",
      rating: 4.5,
      reviews: 67,
      description: "Lightweight batik set perfect for beach vacations and tropical getaways.",
      sizes: ["S", "M", "L"],
      colors: ["Turquoise", "Yellow", "Orange"]
    },
    {
      id: 6,
      name: "Kids Traditional Batik",
      price: 49.99,
      category: "kids",
      image: "https://placehold.co/400x400/FFA500/FFFFFF?text=Kids+Batik",
      rating: 4.4,
      reviews: 43,
      description: "Adorable kids batik clothing with playful traditional motifs.",
      sizes: ["2-4Y", "4-6Y", "6-8Y", "8-10Y"],
      colors: ["Orange", "Green", "Blue"]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'traditional', name: 'Traditional' },
    { id: 'modern', name: 'Modern' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'kids', name: 'Kids' }
  ];

  // Filter products based on category and search query
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Add to cart function
  const addToCart = (product, qty = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: qty }];
    });
  };

  // Remove from cart function
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Update quantity in cart
  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Add to wishlist function
  const toggleWishlist = (product) => {
    setWishlistItems(prevItems => {
      const exists = prevItems.find(item => item.id === product.id);
      if (exists) {
        return prevItems.filter(item => item.id !== product.id);
      }
      return [...prevItems, product];
    });
  };

  // Calculate total price
  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Check if product is in wishlist
  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden mr-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h1 className="text-2xl font-bold text-indigo-900">BatikCraft</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'text-indigo-900 bg-indigo-100'
                      : 'text-gray-700 hover:text-indigo-900'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </nav>

            {/* Search and Icons */}
            <div className="flex items-center space-x-4">
              <div className="relative hidden sm:block">
                <input
                  type="text"
                  placeholder="Search batik..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
              </div>
              <button className="p-2 text-gray-700 hover:text-indigo-900">
                <User size={24} />
              </button>
              <button
                onClick={() => toggleWishlist(products[0])}
                className="p-2 text-gray-700 hover:text-red-500 relative"
              >
                <Heart size={24} />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-gray-700 hover:text-indigo-900 relative"
              >
                <ShoppingCart size={24} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="sm:hidden px-4 pb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search batik..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setIsMenuOpen(false);
                  }}
                  className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-colors ${
                    selectedCategory === category.id
                      ? 'text-indigo-900 bg-indigo-100'
                      : 'text-gray-700 hover:text-indigo-900 hover:bg-gray-50'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Authentic Indonesian Batik
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Discover the rich heritage and craftsmanship of traditional Indonesian batik. Each piece tells a story of culture and artistry.
          </p>
          <button
            onClick={() => setSelectedCategory('all')}
            className="bg-white text-indigo-900 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Shop Collection
          </button>
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            {selectedCategory === 'all' ? 'Featured Batik Collection' : `${categories.find(c => c.id === selectedCategory)?.name} Collection`}
          </h2>
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-500" />
            <span className="text-gray-600">{filteredProducts.length} products</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                />
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
                    isInWishlist(product.id)
                      ? 'text-red-500 bg-white'
                      : 'text-gray-400 bg-white hover:text-red-500'
                  }`}
                >
                  <Heart size={20} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
                </button>
                {product.originalPrice && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                    Sale
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-gray-900">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    addToCart(product);
                    setSelectedProduct(product);
                  }}
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors font-medium"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedProduct.name}</h2>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full rounded-lg"
                  />
                </div>
                
                <div>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className={i < Math.floor(selectedProduct.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600">({selectedProduct.reviews} reviews)</span>
                  </div>
                  
                  <p className="text-gray-700 mb-6">{selectedProduct.description}</p>
                  
                  <div className="mb-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-2xl font-bold text-gray-900">${selectedProduct.price}</span>
                      {selectedProduct.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">${selectedProduct.originalPrice}</span>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                      <div className="flex space-x-2">
                        {selectedProduct.sizes.map(size => (
                          <button
                            key={size}
                            className="px-3 py-2 border border-gray-300 rounded-md hover:border-indigo-500 hover:text-indigo-600"
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                      <div className="flex space-x-2">
                        {selectedProduct.colors.map(color => (
                          <button
                            key={color}
                            className="px-3 py-2 border border-gray-300 rounded-md hover:border-indigo-500 hover:text-indigo-600"
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="p-2 hover:bg-gray-100"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 py-2">{quantity}</span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="p-2 hover:bg-gray-100"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => {
                        addToCart(selectedProduct, quantity);
                        setSelectedProduct(null);
                      }}
                      className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center"
                    >
                      <ShoppingCart size={20} className="mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shopping Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsCartOpen(false)}></div>
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Shopping Cart ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</h2>
              <button onClick={() => setIsCartOpen(false)}>
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <>
                  {cartItems.map(item => (
                    <div key={item.id} className="flex items-center space-x-4 py-4 border-b">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="text-gray-600">${item.price}</p>
                        <div className="flex items-center mt-2">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="mx-2">{item.quantity}</span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                </>
              )}
            </div>
            
            {cartItems.length > 0 && (
              <div className="border-t p-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-lg font-bold">${cartTotal.toFixed(2)}</span>
                </div>
                <button className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center">
                  <Check size={20} className="mr-2" />
                  Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">BatikCraft</h3>
              <p className="text-gray-300">
                Authentic Indonesian batik crafted with tradition and passion. Bringing cultural heritage to your wardrobe.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">New Arrivals</a></li>
                <li><a href="#" className="hover:text-white">Best Sellers</a></li>
                <li><a href="#" className="hover:text-white">Sale Items</a></li>
                <li><a href="#" className="hover:text-white">Gift Cards</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white">Returns</a></li>
                <li><a href="#" className="hover:text-white">Size Guide</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Our Story</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BatikCraft. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
