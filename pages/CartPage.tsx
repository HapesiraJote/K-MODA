
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartItem } from '../types';

interface CartPageProps {
  cart: CartItem[];
  updateQuantity: (id: string, size: string, color: string, delta: number) => void;
  removeFromCart: (id: string, size: string, color: string) => void;
}

const CartPage: React.FC<CartPageProps> = ({ cart, updateQuantity, removeFromCart }) => {
  const navigate = useNavigate();
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center fade-in">
        <h2 className="text-3xl font-black uppercase mb-6">Shporta juaj është bosh</h2>
        <Link to="/shop" className="bg-black text-white px-10 py-4 text-xs font-bold uppercase">Shko te dyqani</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 fade-in">
      <h1 className="text-4xl font-black uppercase tracking-tighter mb-12">Shporta</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-8">
          {cart.map(item => (
            <div key={`${item.id}-${item.selectedSize}`} className="flex gap-6 pb-8 border-b">
              <img src={item.images[0]} className="w-24 h-32 object-cover bg-gray-100" alt="" />
              <div className="flex-grow">
                <div className="flex justify-between mb-4 font-bold uppercase text-sm">
                  <h3>{item.name}</h3>
                  <p>€{item.price * item.quantity}</p>
                </div>
                <p className="text-xs text-gray-500 uppercase mb-4">{item.selectedColor} | {item.selectedSize}</p>
                <div className="flex items-center gap-4">
                  <div className="flex border h-10 items-center">
                    <button onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, -1)} className="px-3">-</button>
                    <span className="px-3 font-bold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, 1)} className="px-3">+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)} className="text-[10px] font-bold uppercase text-gray-400">Hiqe</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 p-8 h-fit border">
          <h2 className="text-xl font-black uppercase mb-8">Përmbledhja</h2>
          <div className="flex justify-between text-lg font-black border-t pt-4 mb-8">
            <span>TOTALI</span>
            <span>€{subtotal}</span>
          </div>
          <button onClick={() => navigate('/checkout')} className="w-full bg-black text-white py-5 text-xs font-bold uppercase">Vazhdo te Pagesa</button>
          <p className="mt-4 text-[10px] text-center text-gray-400 uppercase tracking-widest">Pagesa bëhet kur pranoni porosinë.</p>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
