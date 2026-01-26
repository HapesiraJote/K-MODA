
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface HomeProps {
  products: Product[];
  brandName: string;
  accentColor: string;
}

const Home: React.FC<HomeProps> = ({ products, brandName, accentColor }) => {
  const featured = products.filter(p => p.featured).slice(0, 12);
  const specialOffers = products.filter(p => p.onSale).slice(0, 4);

  return (
    <div className="py-8">
      <section className="bg-white/5 rounded-xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between mb-20 border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px]" style={{ backgroundColor: `${accentColor}1a` }}></div>
        <div className="max-w-xl text-center md:text-left mb-10 md:mb-0 relative z-10">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 block" style={{ color: accentColor }}>Ekskluzive në {brandName}</span>
          
          {/* Laser Cut Animated Heading */}
          <div className="mb-8">
            <h1 className="laser-cut-container text-5xl md:text-7xl font-black tracking-tighter leading-none italic uppercase">
              <div className="laser-beam"></div>
              <span className="laser-cut-text block">Elegancë</span>
              <span className="laser-cut-text block">& Stil</span>
            </h1>
          </div>

          <p className="text-gray-400 text-xs mb-10 max-w-sm leading-relaxed font-medium">
            Zbuloni koleksionin tonë premium. Çdo produkt është i zgjedhur me kujdes për të ofruar vetëm cilësinë më të lartë dhe dizajnin më modern.
          </p>
          <Link to="/shop" className="btn-glow">Eksploro Dyqanin</Link>
        </div>
        <div className="relative group z-10">
          <div className="absolute -inset-10 rounded-full blur-3xl transition-all duration-1000 group-hover:opacity-100" style={{ backgroundColor: `${accentColor}33` }}></div>
          <img src="https://picsum.photos/seed/lux/600/600" className="w-64 md:w-[450px] h-auto object-contain relative rounded-lg shadow-2xl transition-transform duration-700 group-hover:scale-105" alt="Luxury Product" />
        </div>
      </section>

      <section className="mb-24">
        <div className="flex justify-between items-end mb-12 px-4">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white">PRODUKTET TONA</h2>
            <div className="w-12 h-1 mt-2" style={{ backgroundColor: accentColor }}></div>
          </div>
          <Link to="/shop" className="text-[10px] font-black uppercase hover:underline tracking-widest" style={{ color: accentColor }}>Shiko të gjitha</Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 px-4">
          {featured.map(product => (
            <Link key={product.id} to={`/product/${product.id}`} className="group bg-white/5 p-3 rounded-xl border border-white/5 hover:border-white/20 transition-all duration-500">
              <div className="aspect-[3/4] overflow-hidden rounded-lg mb-4">
                <img src={product.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={product.name} />
              </div>
              <h3 className="text-[9px] font-black uppercase text-gray-300 leading-tight h-6 overflow-hidden mb-2 tracking-tight">{product.name}</h3>
              <p className="font-black text-xs" style={{ color: accentColor }}>€{product.price.toFixed(2)}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
