
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
      {/* Banneri lart - Ngjyrë hiri e mbyllt */}
      <div 
        className="py-2 text-[10px] font-black uppercase tracking-[0.3em] text-center overflow-hidden h-9 flex items-center justify-center border-b border-black/10"
        style={{ backgroundColor: bannerBg, color: bannerTextColor }}
      >
        <span className="fade-move-text">{bannerText}</span>
      </div>

      {/* Header & Navigimi i Integruar - "Drejt" dhe me Ikona */}
      <header className="sticky top-0 z-[60] bg-white text-black border-b shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-24 md:h-28">
          
          {/* Logo majtas */}
          <Link to="/" className="flex items-center shrink-0">
            {brandLogo ? (
              <img src={brandLogo} alt={brandName} className="h-20 md:h-24 w-auto object-contain hover:scale-105 transition-transform duration-300" />
            ) : (
              <span className="text-3xl font-black italic tracking-tighter uppercase" style={{ color: accentColor }}>{brandName}</span>
            )}
          </Link>

          {/* Navigimi Qendror me Ikona */}
          <nav className="hidden md:flex items-center space-x-8 font-black text-[11px] uppercase tracking-widest">
            <Link to="/" className="flex items-center gap-2 hover:opacity-60 transition-opacity">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
              Ballina
            </Link>
            <Link to="/shop" className="flex items-center gap-2 hover:opacity-60 transition-opacity">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
              Dyqani
            </Link>
            <button 
              onClick={() => setCatMenuOpen(!isCatMenuOpen)}
              className="flex items-center gap-2 hover:opacity-60 transition-opacity uppercase"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
              Kategoritë
            </button>
          </nav>

          {/* Veglat djathtas (User, Cart, Admin) */}
          <div className="flex items-center space-x-6">
            <button onClick={onToggleTheme} className="p-2 hover:scale-110 transition-transform">
              {theme === 'dark' ? <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg> : <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>}
            </button>
            <Link to="/login" className="hover:scale-110 transition-transform"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg></Link>
            <button onClick={() => setCartOpen(true)} className="relative hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
              {cart.length > 0 && <span className="absolute -top-2 -right-2 text-white text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-bold" style={{ backgroundColor: accentColor }}>{cart.length}</span>}
            </button>
          </div>
        </div>

        {/* Menuja e Kategorive (Dropdown) */}
        {isCatMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white text-black shadow-2xl border-t z-[100] animate-in slide-in-from-top duration-200">
            <div className="max-w-7xl mx-auto p-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {categories.map(cat => (
                <Link key={cat} to={`/shop?category=${cat}`} onClick={() => setCatMenuOpen(false)} className="px-4 py-3 text-[10px] font-black uppercase text-gray-600 hover:text-black hover:bg-gray-50 rounded transition-all">{cat}</Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Navigimi Mobile */}
      <div className="md:hidden flex justify-around bg-white py-3 border-b border-gray-100 font-black text-[9px] uppercase tracking-widest text-black sticky top-[132px] z-[55]">
        <Link to="/" className="flex flex-col items-center gap-1">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
          Ballina
        </Link>
        <Link to="/shop" className="flex flex-col items-center gap-1">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
          Dyqani
        </Link>
        <button onClick={() => setCatMenuOpen(!isCatMenuOpen)} className="flex flex-col items-center gap-1 uppercase">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
          Menu
        </button>
      </div>

      <main className="flex-grow z-10">{children}</main>

      <footer className="py-16 px-4 border-t border-white/5 bg-black/40 text-center">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
           <img src={brandLogo} alt="" className="h-16 w-auto opacity-30 grayscale hover:opacity-100 transition-all duration-500" />
           <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">
            © {new Date().getFullYear()} Të drejtat e rezervuara {brandName} <span 
              onMouseDown={startTimer} 
              onMouseUp={clearTimer} 
              onTouchStart={startTimer} 
              onTouchEnd={clearTimer}
              className="cursor-pointer hover:text-white transition-colors select-none ml-1"
            >2026</span>
          </p>
        </div>
      </footer>

      {isCartOpen && (
        <>
          <div className="fixed inset-0 bg-black/60 z-[100]" onClick={() => setCartOpen(false)}></div>
          <div className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white text-black z-[101] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-8 border-b flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-black uppercase italic tracking-tighter">Shporta JUAJ</h2>
              <button onClick={() => setCartOpen(false)} className="text-gray-400 hover:text-black transition-colors font-black text-[12px] uppercase">Mbyll</button>
            </div>
            <div className="flex-grow overflow-y-auto p-8 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                   <p className="text-gray-400 font-bold uppercase text-xs mb-4">Shporta është bosh</p>
                   <Link to="/shop" onClick={() => setCartOpen(false)} className="text-[10px] font-black underline uppercase tracking-widest">Shko te dyqani</Link>
                </div>
              ) : cart.map(item => (
                <div key={`${item.id}-${item.selectedSize}`} className="flex gap-6 p-4 border rounded-xl hover:shadow-md transition-shadow group">
                  <div className="w-24 h-28 overflow-hidden rounded-lg">
                    <img src={item.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 bg-gray-50" alt="" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-black text-[11px] uppercase leading-tight mb-2">{item.name}</h3>
                    <p className="text-sm font-black" style={{ color: accentColor }}>{item.quantity} × {item.price.toFixed(2)} €</p>
                    <p className="text-[9px] text-gray-400 mt-2 uppercase font-bold tracking-widest">{item.selectedSize} / {item.selectedColor}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)} className="text-red-500 font-bold text-2xl hover:scale-125 transition-transform self-start">×</button>
                </div>
              ))}
            </div>
            <div className="p-8 border-t bg-gray-50">
              <div className="flex justify-between items-center mb-10">
                <span className="font-black uppercase text-xs text-gray-400 tracking-[0.2em]">Nëntotali</span>
                <span className="font-black text-3xl">{subtotal.toFixed(2)} €</span>
              </div>
              <Link to="/checkout" onClick={() => setCartOpen(false)} className="btn-glow w-full text-center py-6 text-sm">Vazhdo te Pagesa</Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Layout;
