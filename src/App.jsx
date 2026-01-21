import React, { useState } from 'react';
import {
  ShoppingCart,
  Plus,
  Minus,
  X,
  Search,
  Clock,
  Star,
  MessageSquare,
  Send,
  ChevronRight,
  TrendingUp,
  Award,
  Users
} from 'lucide-react';

const FoodOrderingWebsite = () => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showSignIn, setShowSignIn] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [users, setUsers] = useState([{ email: 'demo@foodhub.com', password: 'demo123', name: 'Demo User' }]);
  const [signInError, setSignInError] = useState('');

  const categories = ['All', 'Burgers', 'Pizza', 'Pasta', 'Salads', 'Desserts', 'Drinks'];
  const menuItems = [
    { id: 1, name: 'Classic Burger', category: 'Burgers', price: 12.99, image: '🍔', rating: 4.5, time: '15-20 min', description: 'Juicy beef patty', popular: true },
    { id: 2, name: 'Margherita Pizza', category: 'Pizza', price: 14.99, image: '🍕', rating: 4.7, time: '20-25 min', description: 'Fresh mozzarella', popular: true },
    { id: 3, name: 'Caesar Salad', category: 'Salads', price: 9.99, image: '🥗', rating: 4.3, time: '10-15 min', description: 'Crispy romaine' },
    { id: 4, name: 'Spaghetti Carbonara', category: 'Pasta', price: 13.99, image: '🍝', rating: 4.6, time: '15-20 min', description: 'Creamy classic', popular: true },
    { id: 5, name: 'Pepperoni Pizza', category: 'Pizza', price: 15.99, image: '🍕', rating: 4.8, time: '20-25 min', description: 'Loaded pepperoni' },
    { id: 6, name: 'Chocolate Cake', category: 'Desserts', price: 6.99, image: '🍰', rating: 4.9, time: '5-10 min', description: 'Rich chocolate' },
    { id: 7, name: 'Fresh Lemonade', category: 'Drinks', price: 3.99, image: '🍋', rating: 4.4, time: '5 min', description: 'Freshly squeezed' },
    { id: 8, name: 'Chicken Burger', category: 'Burgers', price: 11.99, image: '🍔', rating: 4.5, time: '15-20 min', description: 'Crispy chicken' },
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (item) => {
    const existing = cart.find(c => c.id === item.id);
    if (existing) {
      setCart(cart.map(c => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, delta) => {
    setCart(cart.map(i => i.id === id ? { ...i, quantity: i.quantity + delta } : i).filter(i => i.quantity > 0));
  };

  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  const handleSignIn = () => {
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const name = document.querySelector('input[name="name"]')?.value;

    if (isSignUp) {
      if (users.find(u => u.email === email)) {
        setSignInError('Email exists');
        return;
      }
      setUsers([...users, { email, password, name }]);
      setUserName(name);
      setIsSignedIn(true);
      setShowSignIn(false);
      setSignInError('');
    } else {
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        setUserName(user.name);
        setIsSignedIn(true);
        setShowSignIn(false);
        setSignInError('');
      } else {
        setSignInError('Invalid. Try demo@foodhub.com / demo123');
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <div className="relative min-h-screen bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-400 rounded-full opacity-20 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-400 rounded-full opacity-20 blur-3xl" style={{animationDelay:'1s'}}></div>
        </div>

        <nav className="relative z-20 px-6 py-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-5xl">🍽️</div>
              <div>
                <h1 className="text-3xl font-bold">FoodHub</h1>
                <p className="text-sm text-white/80">Delicious food delivered</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              {isSignedIn ? (
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-semibold">Hi, {userName}!</p>
                    <button onClick={() => {setIsSignedIn(false); setUserName(''); setCart([]);}} className="text-xs text-white/70">Sign Out</button>
                  </div>
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold border-2 border-white/30">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                </div>
              ) : (
                <button onClick={() => setShowSignIn(true)} className="bg-white text-orange-600 px-6 py-2.5 rounded-full font-semibold">
                  Sign In
                </button>
              )}
              
              <button onClick={() => setShowCart(!showCart)} className="relative bg-white/20 text-white px-6 py-2.5 rounded-full font-semibold flex items-center gap-2 border-2 border-white/30">
                <ShoppingCart className="w-5 h-5" />
                Cart
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-black w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">{totalItems}</span>
                )}
              </button>
            </div>
          </div>
        </nav>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
          <div className="max-w-3xl">
            <h2 className="text-7xl md:text-8xl font-bold mb-6 leading-tight">
              Delicious Food<br /><span className="text-yellow-300">Delivered Fast</span>
            </h2>
            <p className="text-2xl md:text-3xl text-white/90 mb-10">
              Order your favorite meals delivered in minutes
            </p>
            <div className="flex gap-4">
              <a href="#menu" className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 hover:text-black transition inline-flex items-center gap-2">
                Order Now <ChevronRight className="w-5 h-5" />
              </a>
              <a href="#menu" className="bg-white/20 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/30 transition border-2 border-white/30">
                View Menu
              </a>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8 mt-20 max-w-2xl">
            <div className="text-center">
              <TrendingUp className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
              <div className="text-4xl font-bold">500+</div>
              <div className="text-white/70">Orders Daily</div>
            </div>
            <div className="text-center">
              <Award className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
              <div className="text-4xl font-bold">4.8</div>
              <div className="text-white/70">Rating</div>
            </div>
            <div className="text-center">
              <Users className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
              <div className="text-4xl font-bold">10K+</div>
              <div className="text-white/70">Customers</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120"><path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H0V0Z" fill="#000"/></svg>
        </div>
      </div>

      {/* Menu */}
      <div id="menu" className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-5xl font-bold mb-4">Our <span className="text-orange-500">Menu</span></h3>
            <p className="text-xl text-gray-400">Choose from our delicious selection</p>
          </div>

          <div className="relative max-w-2xl mx-auto mb-8">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
            <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-16 pr-6 py-5 rounded-2xl bg-white/5 border-2 border-white/10 focus:border-orange-500 focus:outline-none text-white" />
          </div>

          <div className="flex gap-3 overflow-x-auto pb-4 justify-center">
            {categories.map(c => (
              <button key={c} onClick={() => setSelectedCategory(c)}
                className={`px-8 py-3 rounded-full font-semibold whitespace-nowrap transition ${
                  selectedCategory === c ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' : 'bg-white/5 text-gray-300 border border-white/10'
                }`}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredItems.map(item => (
              <div key={item.id} className="group bg-gradient-to-br from-white/5 to-white/[0.02] rounded-3xl overflow-hidden border border-white/10 hover:border-orange-500/50 transition hover:shadow-2xl hover:-translate-y-2">
                <div className="relative bg-gradient-to-br from-orange-500/20 to-red-500/20 p-12 flex items-center justify-center">
                  <div className="text-8xl group-hover:scale-110 transition">{item.image}</div>
                  {item.popular && <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold">POPULAR</div>}
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{item.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{item.description}</p>
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span>{item.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{item.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">${item.price}</span>
                    <button onClick={() => addToCart(item)}
                      className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg flex items-center gap-2">
                      <Plus className="w-5 h-5" />Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button onClick={() => setShowFeedback(true)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-orange-500 to-red-500 text-white p-5 rounded-full shadow-2xl hover:scale-110 transition z-30">
        <MessageSquare className="w-7 h-7" />
      </button>

      {/* Cart */}
      {showCart && (
        <div className="fixed inset-0 bg-black/80 z-50" onClick={() => setShowCart(false)}>
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-gradient-to-br from-gray-900 to-black border-l border-white/10 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">Your Cart</h2>
                <button onClick={() => setShowCart(false)}><X className="w-8 h-8" /></button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-8xl mb-6">🛒</div>
                  <p className="text-gray-400 text-xl">Cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-8">
                    {cart.map(i => (
                      <div key={i.id} className="bg-white/5 rounded-2xl p-5 border border-white/10">
                        <div className="flex gap-4">
                          <div className="text-5xl">{i.image}</div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg">{i.name}</h3>
                            <p className="text-orange-500 font-bold text-xl mt-1">${i.price}</p>
                            <div className="flex items-center gap-3 mt-4">
                              <button onClick={() => updateQuantity(i.id, -1)} className="bg-white/10 border border-white/20 rounded-lg p-2 hover:bg-orange-500 transition">
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="font-bold text-lg w-8 text-center">{i.quantity}</span>
                              <button onClick={() => updateQuantity(i.id, 1)} className="bg-white/10 border border-white/20 rounded-lg p-2 hover:bg-orange-500 transition">
                                <Plus className="w-4 h-4" />
                              </button>
                              <button onClick={() => setCart(cart.filter(c => c.id !== i.id))} className="ml-auto text-red-400 text-sm">Remove</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-white/10 pt-6 space-y-4">
                    <div className="flex justify-between text-gray-400"><span>Subtotal</span><span>${totalPrice.toFixed(2)}</span></div>
                    <div className="flex justify-between text-gray-400"><span>Delivery</span><span>$2.99</span></div>
                    <div className="flex justify-between text-2xl font-bold">
                      <span>Total</span>
                      <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">${(totalPrice + 2.99).toFixed(2)}</span>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-5 rounded-2xl font-bold text-lg hover:shadow-lg transition mt-8">Checkout</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Sign In */}
      {showSignIn && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setShowSignIn(false)}>
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl w-full max-w-md border border-white/10" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-br from-orange-500 to-red-500 p-10 text-center">
              <div className="text-7xl mb-4">🍽️</div>
              <h2 className="text-4xl font-bold">Welcome</h2>
              <p className="mt-3">{isSignUp ? 'Create account' : 'Sign in'}</p>
            </div>
            
            <div className="p-8">
              <div className="flex gap-2 mb-8">
                <button onClick={() => {setIsSignUp(false); setSignInError('');}}
                  className={`flex-1 py-4 rounded-xl font-bold ${!isSignUp ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-white/5 text-gray-400'}`}>
                  Sign In
                </button>
                <button onClick={() => {setIsSignUp(true); setSignInError('');}}
                  className={`flex-1 py-4 rounded-xl font-bold ${isSignUp ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-white/5 text-gray-400'}`}>
                  Sign Up
                </button>
              </div>

              {signInError && <div className="mb-6 p-4 bg-red-500/10 border-2 border-red-500/30 rounded-xl text-red-400 text-sm">{signInError}</div>}
              {!isSignUp && <div className="mb-6 p-4 bg-blue-500/10 border-2 border-blue-500/30 rounded-xl text-blue-400 text-sm"><strong>Demo:</strong> demo@foodhub.com / demo123</div>}

              <div className="space-y-5">
                {isSignUp && (
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Name *</label>
                    <input type="text" name="name" required className="w-full px-5 py-4 rounded-xl bg-white/5 border-2 border-white/10 focus:border-orange-500 focus:outline-none text-white" />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Email *</label>
                  <input type="email" name="email" required className="w-full px-5 py-4 rounded-xl bg-white/5 border-2 border-white/10 focus:border-orange-500 focus:outline-none text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Password *</label>
                  <input type="password" name="password" required minLength={isSignUp ? 6 : 1} className="w-full px-5 py-4 rounded-xl bg-white/5 border-2 border-white/10 focus:border-orange-500 focus:outline-none text-white" />
                  {isSignUp && <p className="text-xs text-gray-500 mt-2">Min 6 chars</p>}
                </div>
                <button onClick={handleSignIn} className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-5 rounded-xl font-bold text-lg hover:shadow-lg transition">
                  {isSignUp ? 'Create' : 'Sign In'}
                </button>
              </div>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
                <div className="relative flex justify-center text-sm"><span className="px-4 bg-black text-gray-500">Or</span></div>
              </div>

              <div className="space-y-3">
                <button onClick={() => {setUserName('Google User'); setIsSignedIn(true); setShowSignIn(false);}}
                  className="w-full px-4 py-3 border-2 border-white/10 rounded-xl hover:bg-white/5 transition font-semibold">Google</button>
                <button onClick={() => {setUserName('Facebook User'); setIsSignedIn(true); setShowSignIn(false);}}
                  className="w-full px-4 py-3 border-2 border-white/10 rounded-xl hover:bg-white/5 transition font-semibold">Facebook</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feedback */}
      {showFeedback && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setShowFeedback(false)}>
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl w-full max-w-lg border border-white/10" onClick={(e) => e.stopPropagation()}>
            {feedbackSubmitted ? (
              <div className="p-12 text-center">
                <div className="text-7xl mb-4">✅</div>
                <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                <p className="text-gray-400">Feedback submitted</p>
              </div>
            ) : (
              <>
                <div className="bg-gradient-to-br from-orange-500 to-red-500 p-8 text-center">
                  <MessageSquare className="w-16 h-16 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold">Feedback</h2>
                </div>
                
                <div className="p-8 space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                    <input type="text" defaultValue={isSignedIn ? userName : ''} className="w-full px-4 py-3 rounded-xl bg-white/5 border-2 border-white/10 focus:border-orange-500 focus:outline-none text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                    <input type="email" className="w-full px-4 py-3 rounded-xl bg-white/5 border-2 border-white/10 focus:border-orange-500 focus:outline-none text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Rating</label>
                    <div className="flex gap-2 justify-center py-3">
                      {[1,2,3,4,5].map(r => (
                        <button key={r} type="button" className="text-4xl hover:scale-125 transition">⭐</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Message *</label>
                    <textarea required rows="5" className="w-full px-4 py-3 rounded-xl bg-white/5 border-2 border-white/10 focus:border-orange-500 focus:outline-none text-white resize-none"></textarea>
                  </div>
                  <div className="flex gap-3">
                    <button type="button" onClick={() => setShowFeedback(false)} className="flex-1 bg-white/5 py-3 rounded-xl font-semibold hover:bg-white/10 transition">Cancel</button>
                    <button onClick={() => {setFeedbackSubmitted(true); setTimeout(() => {setShowFeedback(false); setFeedbackSubmitted(false);}, 2000);}} className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 py-3 rounded-xl font-semibold hover:shadow-lg transition flex items-center justify-center gap-2">
                      <Send className="w-5 h-5" />Submit
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodOrderingWebsite;

