import AdminLoginForm from '@/components/admin/AdminLoginForm';

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#060709] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-2xl font-black tracking-widest text-[#f5f5f5]">KEBAPPA</div>
          <div className="text-[#EC6603] text-xs font-bold uppercase tracking-[0.25em] mt-1">Admin</div>
        </div>
        <AdminLoginForm />
      </div>
    </div>
  );
}
