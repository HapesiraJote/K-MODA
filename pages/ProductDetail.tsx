
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product, CartItem } from '../types';

interface ProductDetailProps {
  products: Product[];
  addToCart: (item: CartItem) => void;
  setCartOpen: (open: boolean) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ products, addToCart, setCartOpen }) => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) return <div className="py-24 text-center">Produkti nuk u gjet.</div>;

  const handleAddToCart = () => {
    addToCart({ ...product, selectedColor: product.colors[0], selectedSize: product.sizes[0], quantity });
    setCartOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 fade-in">
      <nav className="mb-8 flex text-[10px] font-bold uppercase text-gray-400">
        <Link to="/" className="hover:text-black">Ballina</Link>
        <span className="mx-2">/</span>
        <span className="hover:text-black">{product.category}</span>
        <span className="mx-2">/</span>
        <span className="text-black">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex md:flex-col gap-2 order-2 md:order-1">
            {product.images.map((img, idx) => (
              <button key={idx} onClick={() => setActiveImage(idx)} className={`w-16 h-20 border ${activeImage === idx ? 'border-blue-600' : 'border-gray-100'}`}>
                <img src={img} className="w-full h-full object-cover" alt="" />
              </button>
            ))}
          </div>
          <div className="flex-grow order-1 md:order-2 bg-gray-50 border relative group">
             <img src={product.images[activeImage]} className="w-full h-full object-contain" alt="" />
             <div className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg></div>
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tight mb-4">{product.name}</h1>
          <p className="text-2xl font-black text-gray-900 mb-8">{product.price.toFixed(2)} €</p>
          
          <div className="space-y-6 mb-12">
             <div className="text-sm text-gray-600 space-y-4">
               <p className="font-bold text-gray-800 uppercase text-xs">Karakteristikat:</p>
               <ul className="space-y-2 list-disc pl-4 text-xs">
                 <li>Material i jashtëzakonshëm i butë.</li>
                 <li>Dizajn modern dhe unik.</li>
                 <li>Ideal për dhuratë ose dekorim.</li>
               </ul>
             </div>

             <div className="flex items-center gap-4">
                <div className="flex border items-center">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 hover:bg-gray-100">-</button>
                  <span className="px-6 font-bold">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 hover:bg-gray-100">+</button>
                </div>
                <button onClick={handleAddToCart} className="btn-glow flex-grow py-4 px-8 text-xs font-bold uppercase tracking-widest">Shto në shportë</button>
             </div>

             <button className="flex items-center gap-2 text-xs font-bold uppercase text-gray-400 hover:text-red-500">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
               Shto tek të preferuarat
             </button>
          </div>

          <div className="border-t pt-8 space-y-4 text-[11px] font-bold uppercase tracking-wider text-gray-400">
            <p><span className="text-gray-800">SKU:</span> {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            <p><span className="text-gray-800">Kategoria:</span> {product.category}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
