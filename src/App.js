import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, User, Heart, Star, Menu, X, Filter, ChevronDown, Plus, Minus, Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Send } from 'lucide-react';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });

  const [showWelcomePopup, setShowWelcomePopup] = useState(false);

  // Mock product data with batik theme
  const products = [
    {
      id: 1,
      name: "Premium Batik Sarong",
      price: 89.99,
      originalPrice: 129.99,
      image: "https://placehold.co/400x500/8B4513/FFFFFF?text=Premium+Batik+Sarong",
      category: "clothing",
      rating: 4.8,
      reviews: 124,
      description: "Handcrafted traditional batik sarong with intricate floral patterns. Made from premium cotton blend.",
      colors: ["#8B4513", "#228B22", "#4169E1"],
      sizes: ["S", "M", "L", "XL"]
    },
    {
      id: 2,
      name: "Batik Silk Scarf",
      price: 45.99,
      originalPrice: 65.99,
      image: "https://placehold.co/400x500/CD853F/FFFFFF?text=Batik+Silk+Scarf",
      category: "accessories",
      rating: 4.6,
      reviews: 89,
      description: "Luxurious silk scarf featuring traditional Indonesian batik motifs. Lightweight and perfect for any occasion.",
      colors: ["#CD853F", "#DC143C", "#FFD700"],
      sizes: ["One Size"]
    },
    {
      id: 3,
      name: "Traditional Batik Shirt",
      price: 75.99,
      originalPrice: 99.99,
      image: "https://placehold.co/400x500/D2691E/FFFFFF?text=Traditional+Batik+Shirt",
      category: "clothing",
      rating: 4.9,
      reviews: 156,
      description: "Authentic hand-painted batik shirt with geometric patterns. Made from high-quality breathable fabric.",
      colors: ["#D2691E", "#8B0000", "#006400"],
      sizes: ["S", "M", "L", "XL", "XXL"]
    },
    {
      id: 4,
      name: "Batik Cushion Cover Set",
      price: 39.99,
      originalPrice: 59.99,
      image: "https://placehold.co/400x500/DEB887/FFFFFF?text=Batik+Cushion+Set",
      category: "home",
      rating: 4.7,
      reviews: 67,
      description: "Set of 2 cushion covers featuring vibrant batik designs. Perfect for adding cultural flair to your home.",
      colors: ["#DEB887", "#8B4513", "#228B22"],
      sizes: ["16x16 inches"]
    },
    {
      id: 5,
      name: "Batik Wall Hanging",
      price: 129.99,
      originalPrice: 179.99,
      image: "https://placehold.co/400x500/A0522D/FFFFFF?text=Batik+Wall+Hanging",
      category: "home",
      rating: 4.5,
      reviews: 43,
      description: "Beautiful handcrafted batik wall hanging that serves as a stunning focal point in any room.",
      colors: ["#A0522D", "#8B0000", "#4169E1"],
      sizes: ["24x36 inches"]
    },
    {
      id: 6,
      name: "Batik Handbag",
      price: 69.99,
      originalPrice: 99.99,
      image: "https://placehold.co/400x500/8B4513/FFFFFF?text=Batik+Handbag",
      category: "accessories",
      rating: 4.4,
      reviews: 78,
      description: "Elegant handbag made with genuine batik fabric. Features traditional craftsmanship and modern design.",
      colors: ["#8B4513", "#228B22", "#FFD700"],
      sizes: ["One Size"]
    }
  ];
   useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcomePopup(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'clothing', name: 'Clothing' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'home', name: 'Home Decor' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }
    setQuantity(1);
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCartItems(cartItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const toggleWishlist = (product) => {
    if (wishlistItems.includes(product.id)) {
      setWishlistItems(wishlistItems.filter(id => id !== product.id));
    } else {
      setWishlistItems([...wishlistItems, product.id]);
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  const renderHomePage = () => (
    <>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 to-orange-800/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-bold text-amber-900 mb-6 leading-tight">
              Discover the Art of Traditional Batik
            </h2>
            <p className="text-xl text-amber-800 mb-8 leading-relaxed">
              Handcrafted fabrics that tell stories through intricate patterns and vibrant colors. 
              Each piece is a masterpiece of cultural heritage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setCurrentPage('shop')}
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
              >
                Shop Collection
              </button>
              <button 
                onClick={() => setCurrentPage('about')}
                className="border-2 border-amber-600 text-amber-700 hover:bg-amber-50 px-8 py-4 rounded-full font-semibold text-lg transition-all"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-amber-50 to-transparent"></div>
      </section>

      {/* Categories Filter */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <h3 className="text-3xl font-bold text-amber-900">Featured Products</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.slice(0, 6).map(product => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-amber-50 transition-colors"
                  >
                    <Heart
                      size={20}
                      className={`${wishlistItems.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                    />
                  </button>
                  {product.originalPrice > product.price && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      SALE
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h4 className="text-xl font-bold text-amber-900 mb-2">{product.name}</h4>
                  <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-amber-700">${product.price}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mb-4">
                    {product.colors.slice(0, 3).map((color, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 rounded-full border-2 border-white shadow-sm cursor-pointer"
                        style={{ backgroundColor: color }}
                      ></div>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => {
                      setSelectedProduct(product);
                      setQuantity(1);
                    }}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button 
              onClick={() => setCurrentPage('shop')}
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-semibold transition-all"
            >
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-amber-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Stay Updated with New Arrivals</h3>
          <p className="text-xl mb-8 opacity-90">Subscribe to our newsletter for exclusive offers and batik inspiration</p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-l-full text-amber-900 focus:outline-none"
            />
            <button className="bg-amber-600 hover:bg-amber-700 px-8 py-3 rounded-r-full font-semibold transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </>
  );

  const renderShopPage = () => (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h3 className="text-3xl font-bold text-amber-900">Our Batik Collection</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-amber-50 transition-colors"
                >
                  <Heart
                    size={20}
                    className={`${wishlistItems.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                  />
                </button>
                {product.originalPrice > product.price && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    SALE
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h4 className="text-xl font-bold text-amber-900 mb-2">{product.name}</h4>
                <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-amber-700">${product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                </div>
                
                <div className="flex space-x-2 mb-4">
                  {product.colors.slice(0, 3).map((color, index) => (
                    <div
                      key={index}
                      className="w-6 h-6 rounded-full border-2 border-white shadow-sm cursor-pointer"
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
                </div>
                
                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setQuantity(1);
                  }}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-semibold transition-all transform hover:scale-105"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const renderAboutPage = () => (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-amber-900 to-orange-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Story</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Preserving the ancient art of batik through modern craftsmanship and sustainable practices
          </p>
        </div>
      </section>

      {/* About Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-4xl font-bold text-amber-900 mb-6">The Art of Batik</h2>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                Batik is more than just fabric—it's a centuries-old art form that tells stories through intricate patterns and vibrant colors. 
                Our journey began with a deep respect for this traditional craft and a desire to share its beauty with the world.
              </p>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                Each piece in our collection is handcrafted by skilled artisans who have mastered the ancient techniques of batik-making. 
                From the initial wax-resist dyeing process to the final hand-painted details, every step is performed with meticulous care.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                We believe in preserving cultural heritage while embracing sustainability. Our materials are ethically sourced, 
                and our production processes support local communities and traditional craftsmanship.
              </p>
            </div>
            <div>
              <img
                src="https://placehold.co/600x400/8B4513/FFFFFF?text=Batik+Artisans+at+Work"
                alt="Batik artisans at work"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>

          {/* Mission & Values */}
          <div className="bg-amber-50 rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-amber-900 mb-8 text-center">Our Mission & Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-amber-900 mb-3">Cultural Preservation</h3>
                <p className="text-gray-700">
                  We are committed to preserving traditional batik techniques and supporting the artisans who keep this art form alive.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-amber-900 mb-3">Sustainability</h3>
                <p className="text-gray-700">
                  Our eco-friendly practices ensure that our beautiful fabrics don't come at the cost of our planet's health.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-amber-900 mb-3">Quality Craftsmanship</h3>
                <p className="text-gray-700">
                  Every piece is crafted with the highest standards, ensuring that you receive authentic, long-lasting batik art.
                </p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-amber-900 mb-4">Meet Our Artisans</h2>
            <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
              Behind every beautiful batik piece is a skilled artisan with years of experience and a passion for their craft.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <img
                  src="https://placehold.co/300x300/DEB887/FFFFFF?text=Artisan"
                  alt="Master artisan"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-amber-900">Wayan Sukma</h3>
                <p className="text-amber-600">Master Batik Artist</p>
                <p className="text-gray-600 mt-2">20+ years of experience in traditional batik techniques</p>
              </div>
              <div className="text-center">
                <img
                  src="https://placehold.co/300x300/D2691E/FFFFFF?text=Artisan"
                  alt="Senior artisan"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-amber-900">Ni Made Sari</h3>
                <p className="text-amber-600">Senior Designer</p>
                <p className="text-gray-600 mt-2">Specializes in contemporary batik patterns</p>
              </div>
              <div className="text-center">
                <img
                  src="https://placehold.co/300x300/8B4513/FFFFFF?text=Artisan"
                  alt="Young artisan"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-bold text-amber-900">Putu Arta</h3>
                <p className="text-amber-600">Quality Control Specialist</p>
                <p className="text-gray-600 mt-2">Ensures every piece meets our high standards</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderContactPage = () => (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-amber-900 to-orange-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Get In Touch</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            We'd love to hear from you. Reach out with any questions about our batik collection or custom orders.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-amber-900 mb-8">Contact Information</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-amber-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-amber-900 mb-1">Our Studio</h3>
                    <p className="text-gray-600">
                      123 Batik Avenue<br />
                      Yogyakarta, Indonesia 55281
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="text-amber-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-amber-900 mb-1">Phone</h3>
                    <p className="text-gray-600">+62 274 123 4567</p>
                    <p className="text-gray-600">Mon-Fri: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="text-amber-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-amber-900 mb-1">Email</h3>
                    <p className="text-gray-600">info@batikcraft.com</p>
                    <p className="text-gray-600">support@batikcraft.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="text-amber-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-amber-900 mb-1">Business Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>
              
              {/* Social Media */}
              <div>
                <h3 className="text-xl font-semibold text-amber-900 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center hover:bg-amber-200 transition-colors">
                    <Facebook className="text-amber-600" size={20} />
                  </a>
                  <a href="#" className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center hover:bg-amber-200 transition-colors">
                    <Twitter className="text-amber-600" size={20} />
                  </a>
                  <a href="#" className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center hover:bg-amber-200 transition-colors">
                    <Instagram className="text-amber-600" size={20} />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-amber-900 mb-8">Send Us a Message</h2>
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label className="block text-amber-900 font-semibold mb-2">Name</label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-amber-900 font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-amber-900 font-semibold mb-2">Subject</label>
                  <input
                    type="text"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                    className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-amber-900 font-semibold mb-2">Message</label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                    rows={6}
                    className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-300"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 rounded-lg font-semibold text-lg transition-all flex items-center justify-center"
                >
                  <Send className="mr-2" size={20} />
                  Send Message
                </button>
              </form>
            </div>
          </div>
          
          {/* Map Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-amber-900 mb-8 text-center">Find Us</h2>
            <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
              <p className="text-gray-600 text-lg">Interactive Map Placeholder</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
  // ... your existing renderHomePage, renderShopPage, renderAboutPage, renderContactPage functions

  // ADD WELCOME POPUP COMPONENT HERE - Paste your entire WelcomePopup code
  const WelcomePopup = () => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 batik-pattern">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 text-center animate-fade-in shadow-2xl border-2 border-amber-200">
        {/* Batik Inspired Header */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-amber-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-4 text-3xl">✨</span>
          </div>
        </div>
        
        <h2 className="text-4xl font-bold text-amber-900 mb-4 font-serif">
          Welcome to BatikCraft
        </h2>
        
        <p className="text-gray-600 mb-8 text-lg leading-relaxed">
          Where traditional batik art meets modern elegance
        </p>

        {/* Team Section with Avatars */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 mb-8 border border-amber-100">
          <h3 className="text-xl font-semibold text-amber-800 mb-6">
            Crafted with Passion by:
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-start space-x-4 bg-white rounded-xl p-4 shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                1
              </div>
              <span className="text-amber-900 font-medium text-lg">Nama 1</span>
            </div>
            
            <div className="flex items-center justify-start space-x-4 bg-white rounded-xl p-4 shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                2
              </div>
              <span className="text-amber-900 font-medium text-lg">Nama 2</span>
            </div>
            
            <div className="flex items-center justify-start space-x-4 bg-white rounded-xl p-4 shadow-sm">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                3
              </div>
              <span className="text-amber-900 font-medium text-lg">Nama 3</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => setShowWelcomePopup(false)}
          className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg mb-4"
        >
          🎨 Explore Batik Collection
        </button>

        <p className="text-xs text-gray-500">
          Preserving Indonesian cultural heritage through digital innovation
        </p>
      </div>
    </div>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return renderHomePage();
      case 'shop':
        return renderShopPage();
      case 'about':
        return renderAboutPage();
      case 'contact':
        return renderContactPage();
      default:
        return renderHomePage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-amber-50 transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h1 
                onClick={() => setCurrentPage('home')}
                className="text-2xl font-bold text-amber-800 cursor-pointer"
              >
                BatikCraft
              </h1>
            </div>

            <nav className={`absolute lg:static top-full left-0 right-0 bg-white lg:bg-transparent shadow-lg lg:shadow-none transition-all duration-300 ${isMenuOpen ? 'block' : 'hidden lg:block'}`}>
              <ul className="flex flex-col lg:flex-row lg:items-center space-y-2 lg:space-y-0 lg:space-x-8 p-4 lg:p-0">
                <li>
                  <button 
                    onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }}
                    className={`text-amber-800 hover:text-amber-600 font-medium transition-colors ${currentPage === 'home' ? 'text-amber-600 font-bold' : ''}`}
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { setCurrentPage('shop'); setIsMenuOpen(false); }}
                    className={`text-amber-800 hover:text-amber-600 font-medium transition-colors ${currentPage === 'shop' ? 'text-amber-600 font-bold' : ''}`}
                  >
                    Shop
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { setCurrentPage('about'); setIsMenuOpen(false); }}
                    className={`text-amber-800 hover:text-amber-600 font-medium transition-colors ${currentPage === 'about' ? 'text-amber-600 font-bold' : ''}`}
                  >
                    About
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { setCurrentPage('contact'); setIsMenuOpen(false); }}
                    className={`text-amber-800 hover:text-amber-600 font-medium transition-colors ${currentPage === 'contact' ? 'text-amber-600 font-bold' : ''}`}
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search batik products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-amber-200 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-300 w-64"
                />
                <Search className="absolute left-3 top-2.5 text-amber-400" size={20} />
              </div>
              <button className="p-2 rounded-full hover:bg-amber-50 transition-colors relative">
                <Heart size={24} className="text-amber-700" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </button>
              <button className="p-2 rounded-full hover:bg-amber-50 transition-colors">
                <User size={24} className="text-amber-700" />
              </button>
              <button className="p-2 rounded-full hover:bg-amber-50 transition-colors relative">
                <ShoppingCart size={24} className="text-amber-700" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <footer className="bg-amber-900 text-amber-100 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-2xl font-bold text-white mb-4">BatikCraft</h4>
              <p className="mb-4 opacity-80">
                Preserving traditional batik artistry through modern craftsmanship and sustainable practices.
              </p>
            </div>
            <div>
              <h5 className="text-lg font-semibold text-white mb-4">Quick Links</h5>
              <ul className="space-y-2">
                <li><button onClick={() => setCurrentPage('about')} className="hover:text-white transition-colors">About Us</button></li>
                <li><button onClick={() => setCurrentPage('shop')} className="hover:text-white transition-colors">Shop</button></li>
                <li><button onClick={() => setCurrentPage('contact')} className="hover:text-white transition-colors">Contact</button></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold text-white mb-4">Customer Service</h5>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Care Instructions</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-lg font-semibold text-white mb-4">Connect With Us</h5>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="w-10 h-10 bg-amber-800 rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors">
                  <Facebook size={16} />
                </a>
                <a href="#" className="w-10 h-10 bg-amber-800 rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors">
                  <Twitter size={16} />
                </a>
                <a href="#" className="w-10 h-10 bg-amber-800 rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors">
                  <Instagram size={16} />
                </a>
              </div>
              <p className="text-sm opacity-75">
                Subscribe to our newsletter for exclusive offers and batik inspiration
              </p>
            </div>
          </div>
          <div className="border-t border-amber-800 mt-8 pt-8 text-center opacity-75">
            <p>&copy; 2024 BatikCraft. All rights reserved. Handcrafted with passion.</p>
          </div>
        </div>
      </footer>

    {showWelcomePopup && <WelcomePopup />}

      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-amber-900">{selectedProduct.name}</h3>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="p-2 hover:bg-amber-50 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                </div>
                
                <div>
                  <p className="text-gray-600 mb-6">{selectedProduct.description}</p>
                  
                  <div className="flex items-center mb-6">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className={`${i < Math.floor(selectedProduct.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600">
                      {selectedProduct.rating} ({selectedProduct.reviews} reviews)
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-6">
                    <span className="text-3xl font-bold text-amber-700">${selectedProduct.price}</span>
                    {selectedProduct.originalPrice > selectedProduct.price && (
                      <span className="text-xl text-gray-500 line-through">${selectedProduct.originalPrice}</span>
                    )}
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-amber-900 mb-3">Colors</h4>
                    <div className="flex space-x-3">
                      {selectedProduct.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 rounded-full border-2 border-white shadow-sm cursor-pointer ring-2 ring-offset-2 ring-amber-400"
                          style={{ backgroundColor: color }}
                        ></div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-amber-900 mb-3">Size</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.sizes.map((size, index) => (
                        <button
                          key={index}
                          className="px-4 py-2 border border-amber-200 rounded-lg hover:border-amber-400 transition-colors"
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex items-center border border-amber-200 rounded-lg">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2 hover:bg-amber-50 transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 py-2">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 hover:bg-amber-50 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105"
                  >
                    Add to Cart - ${(selectedProduct.price * quantity).toFixed(2)}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-xl p-4 max-w-sm w-full">
          <h4 className="font-bold text-amber-900 mb-3">Cart Summary</h4>
          <div className="space-y-2 mb-4 max-h-32 overflow-y-auto">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center justify-between text-sm">
                <span className="truncate">{item.name} x {item.quantity}</span>
                <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-3">
            <div className="flex justify-between font-bold text-amber-900 mb-3">
              <span>Total: ${getTotalPrice().toFixed(2)}</span>
            </div>
            <button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg font-semibold transition-colors">
              View Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Add Leaf icon since it's not in lucide-react
const Leaf = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13.5 13 12" />
  </svg>
);

export default App;
