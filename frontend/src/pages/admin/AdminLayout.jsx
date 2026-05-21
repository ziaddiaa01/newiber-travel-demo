import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { to: '/admin/services', label: 'Services', icon: '🛎️' },
    { to: '/admin/testimonials', label: 'Testimonials', icon: '⭐' },
    { to: '/admin/faqs', label: 'FAQs', icon: '❓' },
    { to: '/admin/contacts', label: 'Contacts', icon: '✉️' },
  ];

  return (
    <div className="flex min-h-screen bg-[#f0f4f8]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-[#0F2D52] text-white flex flex-col transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-6 border-b border-white/10">
          <span className="text-xl font-bold tracking-widest text-[#2CACE3] uppercase">Newiber</span>
          <p className="text-xs text-white/40 mt-1 tracking-widest uppercase">Admin Panel</p>
        </div>
        <nav className="flex-1 mt-4 px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 mb-1 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#0184c7] text-white shadow-md'
                    : 'text-white/60 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-sm bg-red-500/20 text-red-300 border border-red-500/30 rounded-lg hover:bg-red-500/40 transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar - mobile */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-[#0F2D52] text-white">
          <button onClick={() => setSidebarOpen(true)} className="p-2">
            <div className="space-y-1">
              <span className="block w-5 h-0.5 bg-white" />
              <span className="block w-5 h-0.5 bg-white" />
              <span className="block w-5 h-0.5 bg-white" />
            </div>
          </button>
          <span className="font-bold tracking-widest text-[#2CACE3] uppercase text-sm">Newiber Admin</span>
          <div className="w-9" />
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
