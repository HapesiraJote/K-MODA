
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';

interface AuthProps {
  onLogin: (user: User) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const storedUsers = JSON.parse(localStorage.getItem('fusha_users') || '[]');
    
    // Krijo adminin e parë nëse nuk ekziston
    if (storedUsers.length === 0) {
      const adminUser = { id: 'admin', email: 'admin@fusha.com', password: 'password', name: 'Administrator', isAdmin: true };
      storedUsers.push(adminUser);
      localStorage.setItem('fusha_users', JSON.stringify(storedUsers));
    }

    if (isLogin) {
      const user = storedUsers.find((u: any) => u.email === email && u.password === password);
      if (user) {
        onLogin({ id: user.id, email: user.email, name: user.name, isAdmin: user.isAdmin });
        navigate('/');
      } else {
        setError('Email ose fjalëkalim i gabuar.');
      }
    } else {
      if (storedUsers.some((u: any) => u.email === email)) {
        setError('Ky email është i regjistruar.');
        return;
      }
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        password,
        name,
        isAdmin: false
      };
      storedUsers.push(newUser);
      localStorage.setItem('fusha_users', JSON.stringify(storedUsers));
      onLogin({ id: newUser.id, email: newUser.email, name: newUser.name, isAdmin: false });
      navigate('/');
    }
  };

  return (
    <div className="max-w-md mx-auto py-24 px-4 fade-in">
      <div className="bg-white p-10 rounded-lg shadow-2xl text-black border-t-4 border-purple-600">
        <h1 className="text-3xl font-black uppercase text-center mb-2 tracking-tighter">
          {isLogin ? 'Mirë se vini' : 'Krijo Llogari'}
        </h1>
        <p className="text-center text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-8">
          {isLogin ? 'Hyni në llogarinë tuaj Fusha & Co' : 'Bëhuni pjesë e klubit tonë premium'}
        </p>

        {error && <p className="bg-red-50 text-red-500 p-3 text-xs font-bold rounded mb-6 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-500">Emri i Plotë</label>
              <input 
                type="text" 
                placeholder="Filan Fisteku" 
                className="w-full border p-3 rounded-sm focus:outline-purple-600 bg-gray-50"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-500">Email Adresa</label>
            <input 
              type="email" 
              placeholder="emri@shembull.com" 
              className="w-full border p-3 rounded-sm focus:outline-purple-600 bg-gray-50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-500">Fjalëkalimi</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full border p-3 rounded-sm focus:outline-purple-600 bg-gray-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-glow w-full mt-4">
            {isLogin ? 'Hyr' : 'Regjistrohu'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t text-center">
          <p className="text-xs text-gray-500 mb-2">
            {isLogin ? 'Nuk keni llogari?' : 'Keni një llogari?'}
          </p>
          <button 
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            className="text-purple-600 font-black uppercase text-[10px] tracking-widest hover:underline"
          >
            {isLogin ? 'Krijo Llogari Tani' : 'Hyr në Llogari'}
          </button>
        </div>

        {isLogin && (
          <div className="mt-6 bg-gray-50 p-4 rounded-sm">
            <p className="text-[9px] text-gray-400 font-bold uppercase text-center mb-1">Akses i Shpejtë (Admin)</p>
            <p className="text-[10px] text-gray-600 text-center">admin@fusha.com / password</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
