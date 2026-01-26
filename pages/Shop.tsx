
import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Product } from '../types';

// Fixed: Added accentColor to ShopProps interface to resolve TypeScript error in App.tsx
interface ShopProps {
  products: Product[];
  categories: string[];
  accentColor: string;
}

const Shop: React.FC<ShopProps> = ({ products, categories, accentColor }) => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'Të gjitha');
  const [sortBy, setSortBy] = useState('default');

  const allCategories = ['Të gjitha', ...categories];

  const filteredProducts = useMemo(() => {
    let result = products;
    if (selectedCategory !== 'Të gjitha') result = result.filter(p => p.category === selectedCategory);
    if (sortBy === 'low') result = [...result].sort((a, b) => a.price - b.price);
    if (sortBy === 'high') result = [...result].sort((a, b) => b.price - a.price);
    return result;
  }, [products, selectedCategory, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 fade-in">
      <div className="flex flex-col md:flex-row justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-white">Dyqani</h1>
          <p className="text-gray-400 text-xs font-bold uppercase">{filteredProducts.length} Produkte</p>
        </div>
        <select className="bg-black border border-white/20 p-3 rounded text-[10px] font-black uppercase text-white" onChange={e => setSortBy(e.target.value)}>
          <option value="default">Renditja Standarde</option>
          <option value="low">Çmimi: Më i ulëti</option>
          <option value="high">Çmimi: Më i larti</option>
        </select>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        <aside className="lg:w-48 flex-shrink-0">
          {/* Fixed: Use dynamic accentColor for side menu heading */}
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-6" style={{ color: accentColor }}>Kategoritë</h3>
          <div className="space-y-4">
            {allCategories.map(cat => (
              <button 
                key={cat} 
                onClick={() => setSelectedCategory(cat)} 
                className={`block text-[10px] font-black uppercase tracking-wider text-left transition-all ${selectedCategory === cat ? 'text-white border-l-2 pl-4' : 'text-gray-500 hover:text-white'}`}
                style={selectedCategory === cat ? { borderColor: accentColor } : {}}
              >
                {cat}
              </button>
            ))}
          </div>
        </aside>

        <div className="flex-grow grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-8">
          {filteredProducts.map(product => (
            <Link key={product.id} to={`/product/${product.id}`} className="group bg-white/5 p-3 rounded-lg border border-white/5 hover:border-white/20 transition-all">
              <div className="product-img-container mb-4">
                <img src={product.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
              </div>
              <h3 className="font-black text-[9px] uppercase text-gray-300 leading-tight h-8 overflow-hidden mb-2">{product.name}</h3>
              {/* Fixed: Use dynamic accentColor for price label */}
              <p className="text-xs font-black" style={{ color: accentColor }}>€{product.price.toFixed(2)}</p>
            </Link>
          ))}
          {filteredProducts.length === 0 && (
            <div className="col-span-full py-24 text-center text-gray-500 font-black uppercase text-xs italic">Nuk u gjet asnjë produkt.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
