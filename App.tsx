
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import Admin from './pages/Admin';
import Checkout from './pages/Checkout';
import Auth from './pages/Auth';
import MagicDust from './components/MagicDust';
import { Product, CartItem, User, Category } from './types';
import { db, productsCol } from './lib/firebase';
import { onSnapshot, query, orderBy, addDoc, deleteDoc, doc } from 'firebase/firestore';

const MASTER_CODE = "nexhishkodrankrista2628@";

const AdminSecureModal = ({ isOpen, onClose, onConfirm }: { isOpen: boolean, onClose: () => void, onConfirm: (code: string) => void }) => {
  const [code, setCode] = useState("");
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4">
      <div className="secure-access-modal animate-in zoom-in duration-300">
        <h2 className="secure-title">SECURE ACCESS</h2>
        <input 
          type="password" 
          placeholder="Kodi Master..." 
          className="secure-input"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onConfirm(code)}
          autoFocus
        />
        <button 
          onClick={() => onConfirm(code)}
          className="secure-confirm-btn"
        >
          KONFIRMO
        </button>
        <span onClick={onClose} className="secure-cancel">Anulo</span>
      </div>
    </div>
  );
};

const LoadingScreen = ({ brand, color }: { brand: string, color: string }) => (
  <div className="fixed inset-0 bg-black z-[200] flex flex-col items-center justify-center text-center px-6">
    <div 
      className="text-white px-8 py-4 font-black text-3xl italic mb-6 animate-pulse rounded-lg"
      style={{ backgroundColor: color, boxShadow: `0 0 40px ${color}80` }}
    >
      {brand}
    </div>
    <div className="text-xl font-black uppercase tracking-[0.5em] text-white">
      <div className="typing-text">Zbuloni K-MODA</div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isAdminModalOpen, setAdminModalOpen] = useState(false);
  
  const [brandName, setBrandName] = useState(() => localStorage.getItem('brandName') || 'K-MODA');
  const [logo, setLogo] = useState(() => localStorage.getItem('brandLogo') || 'https://i.ibb.co/rRc78Nn6/Gemini-Generated-Image-7t1c4c7t1c4c7t1c.png');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => (localStorage.getItem('theme') as any) || 'dark');
  const [categories, setCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem('categories');
    return saved ? JSON.parse(saved) : Object.values(Category);
  });
  
  const [bannerText, setBannerText] = useState(() => localStorage.getItem('bannerText') || 'K-MODA | STILI QË JU PËRFAQËSON');
  const [bannerBg, setBannerBg] = useState(() => localStorage.getItem('bannerBg') || '#000000');
  const [bannerTextColor, setBannerTextColor] = useState(() => localStorage.getItem('bannerTextColor') || '#ffffff');
  const [btnGlowColor, setBtnGlowColor] = useState(() => localStorage.getItem('btnGlowColor') || '#a855f7');
  const [btnTextColor, setBtnTextColor] = useState(() => localStorage.getItem('btnTextColor') || '#ffffff');
  const [bgImage, setBgImage] = useState(() => localStorage.getItem('bgImage') || '');

  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    const q = query(productsCol, orderBy("name", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const prods: Product[] = [];
      snapshot.forEach((doc) => {
        prods.push({ id: doc.id, ...doc.data() } as Product);
      });
      setProducts(prods);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.setProperty('--btn-glow-color', btnGlowColor);
    document.documentElement.style.setProperty('--btn-text-color', btnTextColor);
    const panel = document.getElementById('panel');
    if (panel) {
      panel.style.backgroundImage = bgImage ? `url(${bgImage})` : 'none';
      panel.style.backgroundColor = theme === 'dark' ? '#000000' : '#f8fafc';
    }
  }, [theme, btnGlowColor, btnTextColor, bgImage]);

  useEffect(() => {
    localStorage.setItem('brandName', brandName);
    localStorage.setItem('brandLogo', logo);
    localStorage.setItem('categories', JSON.stringify(categories));
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('bannerText', bannerText);
    localStorage.setItem('bannerBg', bannerBg);
    localStorage.setItem('bannerTextColor', bannerTextColor);
    localStorage.setItem('btnGlowColor', btnGlowColor);
    localStorage.setItem('btnTextColor', btnTextColor);
    localStorage.setItem('bgImage', bgImage);
    localStorage.setItem('theme', theme);
  }, [brandName, logo, categories, cart, user, bannerText, bannerBg, bannerTextColor, btnGlowColor, btnTextColor, bgImage, theme]);

  const handleAdminAccess = (code: string) => {
    if (code === MASTER_CODE) {
      setUser(prev => ({ ...(prev || { id: 'admin', email: 'admin@kmoda.com', name: 'Admin K-MODA' }), isAdmin: true }));
      setAdminModalOpen(false);
      alert("Aksesi u lejua. Mirë se vini!");
    } else {
      alert("Kodi i gabuar!");
    }
  };

  if (loading) return <LoadingScreen brand={brandName} color={btnGlowColor} />;

  return (
    <Router>
      <MagicDust />
      <AdminSecureModal 
        isOpen={isAdminModalOpen} 
        onClose={() => setAdminModalOpen(false)} 
        onConfirm={handleAdminAccess} 
      />
      <Layout 
        cart={cart} 
        user={user} 
        onLogout={() => setUser(null)} 
        isCartOpen={isCartOpen} 
        setCartOpen={setCartOpen}
        removeFromCart={(id, s, c) => setCart(prev => prev.filter(i => !(i.id === id && i.selectedSize === s && i.selectedColor === c)))}
        brandName={brandName}
        brandLogo={logo}
        categories={categories}
        bannerText={bannerText}
        bannerBg={bannerBg}
        bannerTextColor={bannerTextColor}
        accentColor={btnGlowColor}
        theme={theme}
        onToggleTheme={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
        onOpenAdmin={() => setAdminModalOpen(true)}
      >
        <Routes>
          <Route path="/" element={<Home products={products} brandName={brandName} accentColor={btnGlowColor} />} />
          <Route path="/shop" element={<Shop products={products} categories={categories} accentColor={btnGlowColor} />} />
          <Route path="/product/:id" element={<ProductDetail products={products} addToCart={(item) => {
            setCart(prev => {
              const ex = prev.find(i => i.id === item.id && i.selectedSize === item.selectedSize);
              return ex ? prev.map(i => i === ex ? {...i, quantity: i.quantity + item.quantity} : i) : [...prev, item];
            });
            setCartOpen(true);
          }} setCartOpen={setCartOpen} />} />
          <Route path="/cart" element={<CartPage cart={cart} updateQuantity={(id, s, c, d) => setCart(prev => prev.map(i => (i.id === id && i.selectedSize === s && i.selectedColor === c) ? {...i, quantity: Math.max(1, i.quantity + d)} : i))} removeFromCart={(id, s, c) => setCart(prev => prev.filter(i => !(i.id === id && i.selectedSize === s && i.selectedColor === c)))} />} />
          <Route path="/checkout" element={<Checkout cart={cart} clearCart={() => setCart([])} />} />
          <Route path="/admin" element={user?.isAdmin ? (
            <Admin 
              products={products} 
              onAddProduct={async (p) => { await addDoc(productsCol, p); }} 
              onRemoveProduct={async (id) => { await deleteDoc(doc(db, "produket", id)); }} 
              categories={categories}
              onUpdateCategories={setCategories}
              brandName={brandName}
              onUpdateBrandName={setBrandName}
              brandLogo={logo}
              onUpdateLogo={setLogo}
              bannerText={bannerText}
              onUpdateBannerText={setBannerText}
              bannerBg={bannerBg}
              onUpdateBannerBg={setBannerBg}
              bannerTextColor={bannerTextColor}
              onUpdateBannerTextColor={setBannerTextColor}
              btnGlowColor={btnGlowColor}
              onUpdateBtnGlowColor={setBtnGlowColor}
              btnTextColor={btnTextColor}
              onUpdateBtnTextColor={setBtnTextColor}
              bgImage={bgImage}
              onUpdateBgImage={setBgImage}
              theme={theme}
              onUpdateTheme={setTheme}
            />
          ) : <Navigate to="/" />} />
          <Route path="/login" element={<Auth onLogin={setUser} />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
