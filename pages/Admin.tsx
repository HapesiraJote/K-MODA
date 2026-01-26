
import React, { useState } from 'react';
import { Product } from '../types';
import { geminiService } from '../services/geminiService';
import { INITIAL_PRODUCTS } from '../constants';

interface AdminProps {
  products: Product[];
  onAddProduct: (p: Omit<Product, 'id'>) => Promise<void>;
  onRemoveProduct: (id: string) => Promise<void>;
  categories: string[];
  onUpdateCategories: (cats: string[]) => void;
  brandName: string;
  onUpdateBrandName: (name: string) => void;
  brandLogo: string;
  onUpdateLogo: (val: string) => void;
  bannerText: string;
  onUpdateBannerText: (val: string) => void;
  bannerBg: string;
  onUpdateBannerBg: (val: string) => void;
  bannerTextColor: string;
  onUpdateBannerTextColor: (val: string) => void;
  btnGlowColor: string;
  onUpdateBtnGlowColor: (val: string) => void;
  btnTextColor: string;
  onUpdateBtnTextColor: (val: string) => void;
  bgImage: string;
  onUpdateBgImage: (val: string) => void;
  theme: 'light' | 'dark';
  onUpdateTheme: (val: 'light' | 'dark') => void;
}

const Admin: React.FC<AdminProps> = ({ 
  products, onAddProduct, onRemoveProduct, 
  categories, onUpdateCategories, 
  brandName, onUpdateBrandName,
  brandLogo, onUpdateLogo,
  bannerText, onUpdateBannerText,
  bannerBg, onUpdateBannerBg,
  bannerTextColor, onUpdateBannerTextColor,
  btnGlowColor, onUpdateBtnGlowColor,
  btnTextColor, onUpdateBtnTextColor,
  bgImage,
  onUpdateBgImage,
  theme, onUpdateTheme
}) => {
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '', price: 0, description: '', category: categories[0] as any,
    images: [], colors: ['Standard'], sizes: ['Standard'], featured: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingDefaults, setIsLoadingDefaults] = useState(false);

  const handleLogoFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => onUpdateLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleProductFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setNewProduct(prev => ({ ...prev, images: [reader.result as string] }));
      reader.readAsDataURL(file);
    }
  };

  const handleLoadDefaults = async () => {
    if (!window.confirm("Kjo do të shtojë 30 produkte demo në dyqanin tuaj. Vazhdoni?")) return;
    setIsLoadingDefaults(true);
    try {
      for (const prod of INITIAL_PRODUCTS) {
        const { id, ...rest } = prod;
        await onAddProduct(rest);
      }
      alert("Produktet demo u ngarkuan me sukses!");
    } catch (error) {
      console.error(error);
      alert("Gabim gjatë ngarkimit.");
    }
    setIsLoadingDefaults(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price && !isSubmitting) {
      setIsSubmitting(true);
      const p: Omit<Product, 'id'> = {
        name: newProduct.name,
        price: Number(newProduct.price),
        description: newProduct.description || 'Produkt cilësor K-MODA.',
        category: (newProduct.category || categories[0]) as any,
        images: newProduct.images?.length ? newProduct.images : ['https://picsum.photos/seed/default/800/1000'],
        colors: newProduct.colors || ['Standard'],
        sizes: newProduct.sizes || ['Standard'],
        featured: newProduct.featured || false
      };
      await onAddProduct(p);
      setNewProduct({ name: '', price: 0, description: '', category: categories[0] as any, images: [], colors: ['Standard'], sizes: ['Standard'], featured: false });
      setIsSubmitting(false);
      alert('Produkti u shtua me sukses në Firestore!');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 fade-in">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 border-b border-white/10 pb-8">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter italic mb-2">K-MODA Admin</h1>
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Menaxhimi i Dyqanit tuaj Premium</p>
        </div>
        <div className="flex flex-wrap gap-4">
           <button 
             onClick={handleLoadDefaults}
             disabled={isLoadingDefaults}
             className="px-6 py-3 bg-blue-600/20 text-blue-400 border border-blue-600/30 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-600/40 transition-all"
           >
             {isLoadingDefaults ? 'Duke ngarkuar...' : 'Ngarko Produkte Demo'}
           </button>
           <button 
             onClick={() => onUpdateTheme(theme === 'dark' ? 'light' : 'dark')} 
             className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest"
           >
             Mënyra: {theme === 'dark' ? 'Errët' : 'Dritë'}
           </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="space-y-8">
          <div className="product-card p-6">
            <h2 className="text-[11px] font-black uppercase text-purple-400 mb-6 tracking-widest border-b border-white/5 pb-2">Identiteti i Markës</h2>
            <div className="space-y-6">
              <div>
                <label className="text-[9px] font-bold uppercase text-gray-500 block mb-2 tracking-widest">Logo Kryesore</label>
                <input type="file" onChange={handleLogoFile} className="admin-input w-full p-3 rounded-lg text-[10px]" />
                {brandLogo && <img src={brandLogo} className="mt-4 h-12 w-auto object-contain mx-auto opacity-50" alt="Preview" />}
              </div>
              <div>
                <label className="text-[9px] font-bold uppercase text-gray-500 block mb-2 tracking-widest">Sfondi i Faqes (Bg)</label>
                <input type="file" onChange={(e) => {
                  const f = e.target.files?.[0];
                  if(f) { const r = new FileReader(); r.onload = () => onUpdateBgImage(r.result as string); r.readAsDataURL(f); }
                }} className="admin-input w-full p-3 rounded-lg text-[10px]" />
              </div>
            </div>
          </div>

          <div className="product-card p-6">
            <h2 className="text-[11px] font-black uppercase text-purple-400 mb-6 tracking-widest border-b border-white/5 pb-2">Njoftimet (Banner)</h2>
            <div className="space-y-4">
              <input type="text" className="admin-input w-full p-3 rounded-lg text-xs" value={bannerText} onChange={e => onUpdateBannerText(e.target.value)} placeholder="Teksti i bannerit..." />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] font-bold uppercase text-gray-500 block mb-1">Mbartësi</label>
                  <input type="color" className="w-full h-12 rounded cursor-pointer" value={bannerBg} onChange={e => onUpdateBannerBg(e.target.value)} />
                </div>
                <div>
                  <label className="text-[9px] font-bold uppercase text-gray-500 block mb-1">Teksti</label>
                  <input type="color" className="w-full h-12 rounded cursor-pointer" value={bannerTextColor} onChange={e => onUpdateBannerTextColor(e.target.value)} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-10">
           <div className="product-card p-8">
              <h2 className="text-[11px] font-black uppercase text-purple-400 mb-8 tracking-widest border-b border-white/5 pb-2">Shto Produkt të Ri</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase text-gray-500 tracking-widest">Emri</label>
                    <input type="text" placeholder="Psh: Fustan Mbretëror" className="admin-input w-full p-4 rounded-xl text-sm" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} required />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase text-gray-500 tracking-widest">Çmimi (€)</label>
                    <input type="number" placeholder="0.00" className="admin-input w-full p-4 rounded-xl text-sm" value={newProduct.price || ''} onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})} required />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase text-gray-500 tracking-widest">Kategoria</label>
                    <select className="admin-input w-full p-4 rounded-xl text-sm appearance-none" value={newProduct.category as string} onChange={e => setNewProduct({...newProduct, category: e.target.value as any})}>
                      {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase text-gray-500 tracking-widest">Imazhi (Kliko për të zgjedhur)</label>
                    <input type="file" accept="image/*" onChange={handleProductFile} className="admin-input w-full p-3 rounded-xl text-[10px]" />
                  </div>
                </div>
                <button type="submit" disabled={isSubmitting} className="btn-glow w-full py-5 text-sm">
                  {isSubmitting ? 'Duke u ruajtur...' : 'Konfirmo dhe Shpërndaj'}
                </button>
              </form>
           </div>

           <div className="product-card p-8">
              <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                <h2 className="text-[11px] font-black uppercase text-purple-400 tracking-widest">Inventari ({products.length})</h2>
                <div className="text-[9px] font-bold uppercase opacity-30">Firestore Realtime</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {products.length === 0 ? (
                  <div className="col-span-full py-12 text-center text-gray-500 text-[10px] font-black uppercase">Nuk ka produkte në Cloud.</div>
                ) : products.map(p => (
                  <div key={p.id} className="flex justify-between items-center p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all group">
                    <div className="flex items-center gap-4 truncate">
                      <div className="w-12 h-14 bg-gray-800 rounded-lg overflow-hidden shrink-0">
                         <img src={p.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt="" />
                      </div>
                      <div className="truncate">
                        <p className="text-[10px] font-black uppercase truncate text-white">{p.name}</p>
                        <p className="text-[9px] font-bold text-purple-400">€{p.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <button onClick={() => { if(window.confirm('A jeni të sigurt që dëshironi ta fshini këtë produkt nga Cloud?')) onRemoveProduct(p.id) }} className="text-red-500/50 hover:text-red-500 text-[9px] font-black uppercase px-3 py-2 border border-red-500/10 hover:border-red-500/30 rounded-full transition-all shrink-0">Fshi</button>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
