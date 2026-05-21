import { useEffect, useState } from 'react';
import { getAdminServices, getAdminTestimonials, getAdminFAQs, getAdminContacts } from '../../services/api';

const StatCard = ({ label, value, icon, accent }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
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
  const [stats, setStats] = useState({ services: 0, testimonials: 0, faqs: 0, unreadContacts: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [services, testimonials, faqs, contacts] = await Promise.all([
        getAdminServices(), getAdminTestimonials(), getAdminFAQs(), getAdminContacts()
      ]);
      setStats({
        services: services.data.length,
        testimonials: testimonials.data.length,
        faqs: faqs.data.length,
        unreadContacts: contacts.data.filter(c => !c.isRead).length,
      });
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-[#0F2D52] mb-2">Dashboard</h1>
      <p className="text-gray-400 text-sm mb-8">Welcome back, here's what's happening.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Services" value={stats.services} icon="🛎️" accent="bg-[#e8f4fd]" />
        <StatCard label="Testimonials" value={stats.testimonials} icon="⭐" accent="bg-[#fff8e1]" />
        <StatCard label="FAQs" value={stats.faqs} icon="❓" accent="bg-[#f0fdf4]" />
        <StatCard label="Unread Messages" value={stats.unreadContacts} icon="✉️" accent="bg-[#fef2f2]" />
      </div>
    </div>
  );
};

export default Dashboard;
