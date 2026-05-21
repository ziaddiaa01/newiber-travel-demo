import { useLoaderData, useRevalidator } from 'react-router-dom';
import { useState } from 'react';
import { markContactRead, deleteAdminContact } from '../../services/api';

const ContactsManager = () => {
  const { contacts } = useLoaderData();
  const revalidator = useRevalidator();
  const [filter, setFilter] = useState('all');

  const filteredContacts = contacts.data?.filter(c => {
    if (filter === 'read') return c.isRead;
    if (filter === 'unread') return !c.isRead;
    return true;
  });

  const handleMarkRead = async (id, currentStatus) => {
    await markContactRead(id, { isRead: !currentStatus });
    revalidator.revalidate();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this message?')) { await deleteAdminContact(id); revalidator.revalidate(); }
  };

  const filterBtn = (val, label) => (
    <button
      onClick={() => setFilter(val)}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filter === val ? 'bg-[#0184c7] text-white' : 'bg-white text-gray-500 border border-gray-200 hover:border-[#0184c7] hover:text-[#0184c7]'}`}
    >
      {label}
    </button>
  );

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-[#0F2D52] mb-8">Contact Submissions</h1>

      <div className="flex gap-2 mb-6">
        {filterBtn('all', 'All')}
        {filterBtn('unread', 'Unread')}
        {filterBtn('read', 'Read')}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-[#0F2D52]">
                {['Date', 'Name', 'Email', 'Message', 'Status', 'Actions'].map(h => (
                  <th key={h} className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredContacts?.map(c => (
                <tr key={c._id} className={`transition ${!c.isRead ? 'bg-[#fffbeb] hover:bg-[#fff8d6]' : 'hover:bg-[#f0f7ff]'}`}>
                  <td className="px-6 py-4 text-xs text-gray-400 whitespace-nowrap">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-[#0F2D52] whitespace-nowrap">{c.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{c.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-[200px] truncate">{c.message}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${c.isRead ? 'bg-gray-100 text-gray-400' : 'bg-yellow-100 text-yellow-700'}`}>
                      {c.isRead ? 'Read' : 'Unread'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex gap-3">
                    <button onClick={() => handleMarkRead(c._id, c.isRead)} className="text-xs font-medium text-[#2CACE3] hover:text-[#0184c7] transition">
                      {c.isRead ? 'Unread' : 'Read'}
                    </button>
                    <button onClick={() => handleDelete(c._id)} className="text-xs font-medium text-red-500 hover:text-red-700 transition">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContactsManager;
