import { useEffect, useState } from 'react';
import { getAdminServices, getAdminTestimonials, getAdminFAQs, getAdminContacts } from '../../services/api';

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
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow"><h2>Services</h2><p className="text-2xl">{stats.services}</p></div>
        <div className="bg-white p-4 rounded shadow"><h2>Testimonials</h2><p className="text-2xl">{stats.testimonials}</p></div>
        <div className="bg-white p-4 rounded shadow"><h2>FAQs</h2><p className="text-2xl">{stats.faqs}</p></div>
        <div className="bg-white p-4 rounded shadow"><h2>Unread Messages</h2><p className="text-2xl text-red-600">{stats.unreadContacts}</p></div>
      </div>
    </div>
  );
};

export default Dashboard;