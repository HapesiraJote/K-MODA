
import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  cart: any[];
  user: any;
  onLogout: () => void;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  removeFromCart: (id: string, size: string, color: string) => void;
  brandName: string;
  brandLogo?: string;
  categories: string[];
  bannerText: string;
  bannerBg: string;
  bannerTextColor: string;
  accentColor: string;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenAdmin: () => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, cart, user, isCartOpen, setCartOpen, removeFromCart, brandName, brandLogo, categories,
  bannerText, bannerBg, bannerTextColor, accentColor, theme, onToggleTheme, onOpenAdmin
}) => {
  const [isCatMenuOpen, setCatMenuOpen] = useState(false);
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const timerRef = useRef<any>(null);

  const startTimer = () => {
    timerRef.current = setTimeout(() => {
      onOpenAdmin();
    }, 2000);
  };

  const clearTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <div 
        className="py-2 text-[10px] font-black uppercase tracking-[0.3em] text-center overflow-hidden h-10 flex items-center justify-center"
        style={{ backgroundColor: bannerBg, color: bannerTextColor }}
      >
        <span className="fade-move-text">{bannerText}</span>
      </div>

      <header className={`border-b sticky top-0 z-[60] transition-colors duration-300 ${theme === 'dark' ? 'bg-white/95 text-black' : 'bg-gray-900/95 text-white'}`}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center gap-4">
          <Link to="/" className="flex items-center">
            {brandLogo ? (
              <img src={brandLogo} alt={brandName} className="h-12 w-auto object-contain hover:scale-105 transition-transform" />
            ) : (
              <span className="text-xl font-black italic tracking-tighter uppercase" style={{ color: accentColor }}>{brandName}</span>
            )}
          </Link>

          <div className="flex items-center space-x-4">
            <button onClick={onToggleTheme} className="p-2 hover:opacity-70">
              {theme === 'dark' ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg> : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>}
            </button>
            <Link to="/login" className="hover:opacity-70"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg></Link>
            <button onClick={() => setCartOpen(true)} className="relative hover:opacity-70">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
              {cart.length > 0 && <span className="absolute -top-2 -right-2 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold" style={{ backgroundColor: accentColor }}>{cart.length}</span>}
            </button>
            {user?.isAdmin && <Link to="/admin" className="text-[10px] font-black uppercase px-3 py-1 rounded border animate-pulse" style={{ color: accentColor, borderColor: accentColor }}>Admin Online</Link>}
          </div>
        </div>
      </header>

      <nav className="text-white sticky top-[54px] z-50 shadow-lg" style={{ backgroundColor: accentColor }}>
        <div className="max-w-7xl mx-auto px-4 flex items-center h-12">
          <button 
            onClick={() => setCatMenuOpen(!isCatMenuOpen)}
            className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest h-full px-6 hover:brightness-90 transition-all bg-black/10"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            Kategoritë
          </button>
          <div className="flex space-x-8 px-8 font-black text-[9px] uppercase tracking-[0.2em]">
            <Link to="/" className="hover:opacity-80">Ballina</Link>
            <Link to="/shop" className="hover:opacity-80">Dyqani</Link>
          </div>
        </div>
        {isCatMenuOpen && (
          <div className="absolute top-12 left-0 w-64 bg-white text-black shadow-2xl border-b z-[100] animate-in slide-in-from-top duration-200">
            {categories.map(cat => (
              <Link key={cat} to={`/shop?category=${cat}`} onClick={() => setCatMenuOpen(false)} className="block px-6 py-3 text-[10px] font-black uppercase text-gray-700 hover:bg-gray-50 border-b last:border-0">{cat}</Link>
            ))}
          </div>
        )}
      </nav>

      <main className="flex-grow z-10">{children}</main>

      <footer className="py-12 px-4 border-t border-white/5 bg-black/20 text-center">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
          © Të drejtat e rezervuara {brandName} <span 
            onMouseDown={startTimer} 
            onMouseUp={clearTimer} 
            onTouchStart={startTimer} 
            onTouchEnd={clearTimer}
            className="cursor-pointer hover:text-white transition-colors select-none"
          >2026</span>
        </p>
      </footer>

      {isCartOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 z-[100]" onClick={() => setCartOpen(false)}></div>
          <div className="fixed top-0 right-0 h-full w-full sm:w-[380px] bg-white text-black z-[101] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-lg font-black uppercase italic">Shporta</h2>
              <button onClick={() => setCartOpen(false)} className="text-gray-400 font-black text-[10px] uppercase">Mbyll</button>
            </div>
            <div className="flex-grow overflow-y-auto p-6 space-y-4">
              {cart.map(item => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4 p-3 border rounded">
                  <img src={item.images[0]} className="w-16 h-16 object-cover rounded bg-gray-100" alt="" />
                  <div className="flex-grow">
                    <h3 className="font-black text-[9px] uppercase leading-tight">{item.name}</h3>
                    <p className="text-[11px] font-black" style={{ color: accentColor }}>{item.quantity} × {item.price.toFixed(2)} €</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)} className="text-red-500 font-bold">×</button>
                </div>
              ))}
            </div>
            <div className="p-6 border-t bg-gray-50">
              <div className="flex justify-between items-center mb-6">
                <span className="font-black uppercase text-xs text-gray-400">Totali</span>
                <span className="font-black text-xl">{subtotal.toFixed(2)} €</span>
              </div>
              <Link to="/checkout" onClick={() => setCartOpen(false)} className="btn-glow w-full text-center">Vazhdo te Pagesa</Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Layout;
