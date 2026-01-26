
import React, { useState } from 'react';
import { Product } from '../types';
import { geminiService } from '../services/geminiService';

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
  const [newCat, setNewCat] = useState('');

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
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
        <h1 className="text-4xl font-black uppercase tracking-tighter italic">K-MODA Admin Control</h1>
        <div className="flex gap-4">
           <button 
             onClick={() => onUpdateTheme(theme === 'dark' ? 'light' : 'dark')} 
             className="px-4 py-2 border border-white/20 rounded text-[10px] font-black uppercase"
           >
             Mënyra: {theme === 'dark' ? 'Errët' : 'Dritë'}
           </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="space-y-8">
          <div className="product-card p-6 rounded-lg">
            <h2 className="text-xs font-black uppercase text-purple-400 mb-6 tracking-widest">Marka & Sfondi</h2>
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-bold uppercase text-gray-500 block mb-2">Logo K-MODA</label>
                <input type="file" onChange={handleLogoFile} className="admin-input w-full p-2 rounded text-[10px] border border-white/10" />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-gray-500 block mb-2">Sfondi Faqes</label>
                <input type="file" onChange={(e) => {
                  const f = e.target.files?.[0];
                  if(f) { const r = new FileReader(); r.onload = () => onUpdateBgImage(r.result as string); r.readAsDataURL(f); }
                }} className="admin-input w-full p-2 rounded text-[10px] border border-white/10" />
              </div>
            </div>
          </div>

          <div className="product-card p-6 rounded-lg">
            <h2 className="text-xs font-black uppercase text-purple-400 mb-6 tracking-widest">Banneri</h2>
            <input type="text" className="admin-input w-full p-3 mb-4 rounded text-xs border border-white/10" value={bannerText} onChange={e => onUpdateBannerText(e.target.value)} />
            <div className="grid grid-cols-2 gap-4">
              <input type="color" className="w-full h-10" value={bannerBg} onChange={e => onUpdateBannerBg(e.target.value)} />
              <input type="color" className="w-full h-10" value={bannerTextColor} onChange={e => onUpdateBannerTextColor(e.target.value)} />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
           <div className="product-card p-8 rounded-lg">
              <h2 className="text-xs font-black uppercase text-purple-400 mb-8 tracking-widest">Shto Produkt në Cloud</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input type="text" placeholder="Emri Produktit" className="admin-input w-full p-3 rounded text-sm border border-white/10" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} required />
                  <input type="number" placeholder="Çmimi (€)" className="admin-input w-full p-3 rounded text-sm border border-white/10" value={newProduct.price || ''} onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})} required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <select className="admin-input w-full p-3 rounded text-sm border border-white/10" value={newProduct.category as string} onChange={e => setNewProduct({...newProduct, category: e.target.value as any})}>
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                  <input type="file" accept="image/*" onChange={handleProductFile} className="admin-input w-full p-2 rounded text-xs border border-white/10" />
                </div>
                <button type="submit" disabled={isSubmitting} className="btn-glow w-full">
                  {isSubmitting ? 'Duke u ruajtur...' : 'Ruaj në Firestore'}
                </button>
              </form>
           </div>

           <div className="product-card p-6 rounded-lg">
              <h2 className="text-[10px] font-black uppercase text-purple-400 mb-4 tracking-widest">Lista e Produkteve ({products.length})</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-2">
                {products.map(p => (
                  <div key={p.id} className="flex justify-between items-center p-3 bg-white/5 border border-white/5 rounded">
                    <div className="flex items-center gap-3 truncate">
                      <img src={p.images[0]} className="w-10 h-10 object-cover rounded" alt="" />
                      <span className="text-[10px] font-black uppercase truncate">{p.name}</span>
                    </div>
                    <button onClick={() => { if(window.confirm('Fshije?')) onRemoveProduct(p.id) }} className="text-red-500 text-[9px] font-black uppercase">Fshi</button>
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
