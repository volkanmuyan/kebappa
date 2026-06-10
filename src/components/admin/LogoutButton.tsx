'use client';
import { getBrowserClient } from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = getBrowserClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-gray-400 hover:text-white border border-[#26282b] px-3 py-1.5 rounded-lg transition-colors"
    >
      Déconnexion
    </button>
  );
}
