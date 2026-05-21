import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo-solid.svg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin/dashboard');
    } catch {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F2D52] px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <img src={logo} alt="NEWIBER" className="h-12 mx-auto mb-4 object-contain" />
          <h2 className="text-2xl font-bold text-[#0F2D52]">Admin Login</h2>
          <p className="text-gray-400 text-sm mt-1">Sign in to manage your content</p>
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-[#0F2D52] mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#0184c7] focus:ring-1 focus:ring-[#0184c7] transition"
            placeholder="admin@newiber.com"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-[#0F2D52] mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#0184c7] focus:ring-1 focus:ring-[#0184c7] transition"
            placeholder="••••••••"
            required
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-[#0184c7] text-white py-3 rounded-lg text-sm font-medium uppercase tracking-widest hover:bg-[#016da5] transition disabled:opacity-60"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </div>
    </div>
  );
};

export default Login;
