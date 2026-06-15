import React from 'react';
import { useLoaderData, Link } from 'react-router-dom';

const StatCard = ({ label, value, icon, accent }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 h-full">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${accent}`}>
      {icon}
    </div>
    <div>
      <p className="text-xs text-gray-400 uppercase tracking-widest font-medium">{label}</p>
      <p className="text-3xl font-bold text-[#0F2D52] mt-0.5">{value}</p>
    </div>
  </div>
);

const Dashboard = () => {
  // 🌟 سحب البيانات المحملة مسبقاً من الـ Loader مباشرة
  const { services = [], testimonials = [], faqs = [], contacts = [] } = useLoaderData() || {};

  // حساب عدد الرسائل غير المقروءة بناءً على البيانات الحية
  const unreadContactsCount = contacts.filter(c => !c.isRead).length;

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-[#0F2D52] mb-2">Dashboard</h1>
      <p className="text-gray-400 text-sm mb-8">Welcome back, here's what's happening.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {/* قراءة الـ length مباشرة من المصفوفات الجاهزة */}
        <StatCard label="Services" value={services.length} icon="🛎️" accent="bg-[#e8f4fd]" />
        <StatCard label="Testimonials" value={testimonials.length} icon="⭐" accent="bg-[#fff8e1]" />
        <StatCard label="FAQs" value={faqs.length} icon="❓" accent="bg-[#f0fdf4]" />
        <StatCard label="Unread Messages" value={unreadContactsCount} icon="✉️" accent="bg-[#fef2f2]" />
        
        {/* كارت إعدادات الـ WhatsApp والدردشة الحية */}
        <Link 
          to="/admin/whatsapp-sync" 
          className="block group hover:scale-[1.02] transition-transform duration-200"
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 h-full group-hover:border-blue-400 transition-colors duration-200">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-[#f3e8ff] text-purple-600 flex-shrink-0">
              💬
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-medium group-hover:text-purple-600 transition-colors">
                Live Chat
              </p>
              <p className="text-base font-bold text-[#0F2D52] mt-1 flex items-center gap-1 whitespace-nowrap">
                Sync Chat <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
