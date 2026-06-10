'use client';
import { useState } from 'react';
import { getBrowserClient } from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation';

export default function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const supabase = getBrowserClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      setError('Email ou mot de passe incorrect');
      setLoading(false);
      return;
    }
    router.push('/admin/orders');
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#141517] border border-[#26282b] rounded-xl p-6 space-y-4">
      <h1 className="text-lg font-bold text-center">Connexion</h1>

      <div className="space-y-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full bg-[#060709] border border-[#26282b] rounded-lg px-3 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#EC6603]"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full bg-[#060709] border border-[#26282b] rounded-lg px-3 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#EC6603]"
        />
      </div>

      {error && <p className="text-red-400 text-sm text-center">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#EC6603] hover:bg-[#C9550A] disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-colors"
      >
        {loading ? '...' : 'Se connecter'}
      </button>
    </form>
  );
}
