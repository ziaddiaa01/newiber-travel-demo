import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

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
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-gray-700">NEWIBER Admin</div>
        <nav className="flex-1 mt-6">
          <ul>
            {navItems.map((item) => (
              <li key={item.to} className="mb-2">
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center px-6 py-3 text-sm transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`
                  }
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <button
          onClick={handleLogout}
          className="m-4 px-4 py-2 text-sm bg-red-600 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </aside>

      {/* Main content – where child routes render */}
      <main className="flex-1 p-8 overflow-auto">
        <Outlet /> {/* This is crucial – without it, child routes won't appear */}
      </main>
    </div>
  );
};

export default AdminLayout; // make sure default export exists