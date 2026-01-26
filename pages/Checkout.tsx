
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../types';

interface CheckoutProps {
  cart: CartItem[];
  clearCart: () => void;
}

const CITY_DATA: any = {
  'Kosovë': ['Prishtinë', 'Prizren', 'Pejë', 'Gjakovë', 'Mitrovicë', 'Ferizaj', 'Gjilan', 'Vushtrri', 'Podujevë'],
  'Shqipëri': ['Tiranë', 'Durrës', 'Vlorë', 'Shkodër', 'Elbasan', 'Fier', 'Korçë', 'Berat', 'Lushnjë'],
  'Maqedoni e Veriut': ['Shkup', 'Tetovë', 'Gostivar', 'Kumanovë', 'Ohër', 'Strugë', 'Dibër', 'Prilep']
};

const Checkout: React.FC<CheckoutProps> = ({ cart, clearCart }) => {
  const navigate = useNavigate();
  const [country, setCountry] = useState('Kosovë');
  const [city, setCity] = useState(CITY_DATA['Kosovë'][0]);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const transporti = 2.00;

  const handleFinalOrder = () => {
    alert('Porosia u bë me sukses! Faleminderit.');
    clearCart();
    navigate('/');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col lg:flex-row gap-16 fade-in">
      {/* Form Section */}
      <div className="flex-grow">
        <h1 className="text-xl font-black uppercase mb-8 tracking-tight">ADRESA E FATURIMIT DHE E TRANSPORTIT</h1>
        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-gray-400">Emri <span className="text-red-500">*</span></label>
              <input type="text" className="w-full border p-3 bg-white text-black font-semibold focus:outline-blue-500" required />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-gray-400">Mbiemri <span className="text-red-500">*</span></label>
              <input type="text" className="w-full border p-3 bg-white text-black font-semibold focus:outline-blue-500" required />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-gray-400">Shteti <span className="text-red-500">*</span></label>
            <select className="w-full border p-3 bg-white text-black font-semibold" value={country} onChange={e => {setCountry(e.target.value); setCity(CITY_DATA[e.target.value][0])}}>
              {Object.keys(CITY_DATA).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-gray-400">Qyteti <span className="text-red-500">*</span></label>
            <select className="w-full border p-3 bg-white text-black font-semibold" value={city} onChange={e => setCity(e.target.value)}>
              {CITY_DATA[country].map((c: string) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-gray-400">Adresa <span className="text-red-500">*</span></label>
            <input type="text" className="w-full border p-3 bg-white text-black font-semibold" required />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-gray-400">Telefoni <span className="text-red-500">*</span></label>
            <input type="tel" className="w-full border p-3 bg-white text-black font-semibold" required />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase text-gray-400">E-mail <span className="text-red-500">*</span></label>
            <input type="email" className="w-full border p-3 bg-white text-black font-semibold" required />
          </div>
        </form>
      </div>

      {/* Summary Section */}
      <div className="w-full lg:w-[450px]">
        <div className="bg-white text-black border p-8">
          <h2 className="text-lg font-black uppercase text-center mb-8 italic">POROSIA JUAJ</h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between text-[10px] font-black uppercase text-gray-400 border-b pb-2">
              <span>PRODUKTET</span>
              <span>NËNTOTALI</span>
            </div>
            {cart.map(item => (
              <div key={item.id} className="flex items-center gap-4">
                <img src={item.images[0]} className="w-12 h-16 object-cover border" alt="" />
                <div className="flex-grow">
                  <p className="text-[10px] font-black uppercase">{item.name}</p>
                  <p className="text-[10px] text-gray-500 mt-1">{item.quantity} x {item.price.toFixed(2)} €</p>
                </div>
                <span className="font-black text-xs">{(item.price * item.quantity).toFixed(2)} €</span>
              </div>
            ))}
          </div>

          <div className="space-y-3 py-6 border-t border-b">
            <div className="flex justify-between text-xs font-bold uppercase">
              <span>Nëntotali</span>
              <span>{subtotal.toFixed(2)} €</span>
            </div>
            <div className="flex justify-between text-xs font-bold uppercase">
              <span>Transporti</span>
              <span className="text-gray-400 font-medium">Posta: <span className="text-black font-bold">{transporti.toFixed(2)} €</span></span>
            </div>
          </div>

          <div className="flex justify-between items-center py-6">
            <span className="font-black text-sm uppercase">Totali</span>
            <span className="font-black text-lg">{(subtotal + transporti).toFixed(2)} €</span>
          </div>

          <div className="bg-gray-50 border p-4 mb-8">
             <p className="font-black text-[10px] uppercase mb-1 italic">Pagesa pas pranimit</p>
             <p className="text-[10px] text-gray-500 uppercase font-bold">Paguani me para në dorë kur produkti vjen te ju.</p>
          </div>

          <button 
            onClick={() => setShowConfirm(true)} 
            className="w-full py-5 bg-black text-white font-black uppercase text-xs tracking-[0.2em] hover:opacity-90 transition-all"
          >
            BËJE POROSINË
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-[100] modal-overlay flex items-center justify-center p-4">
          <div className="bg-white text-black p-10 max-w-sm w-full rounded-lg shadow-2xl text-center fade-in">
            <h3 className="text-xl font-black uppercase tracking-tighter mb-4 italic">Konfirmimi i Porosisë</h3>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest leading-relaxed mb-8">
              A jeni i sigurt që dëshironi ta kryeni këtë porosi?
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={handleFinalOrder}
                className="btn-glow w-full"
              >
                Po, Vazhdo
              </button>
              <button 
                onClick={() => navigate('/')}
                className="text-[10px] font-black uppercase text-gray-400 py-3 hover:text-black transition-colors"
              >
                Jo, kthehu në ballinë
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
