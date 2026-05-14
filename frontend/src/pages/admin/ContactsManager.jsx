import { useLoaderData, useRevalidator } from 'react-router-dom';
import { useState } from 'react';
import { markContactRead, deleteAdminContact } from '../../services/api';

const ContactsManager = () => {
  const { contacts } = useLoaderData();
  const revalidator = useRevalidator();
  const [filter, setFilter] = useState('all'); // 'all', 'read', 'unread'

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
    if (window.confirm('Delete this message?')) {
      await deleteAdminContact(id);
      revalidator.revalidate();
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Contact Submissions</h1>
      <div className="mb-4 flex gap-2">
        <button onClick={() => setFilter('all')} className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>All</button>
        <button onClick={() => setFilter('unread')} className={`px-3 py-1 rounded ${filter === 'unread' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>Unread</button>
        <button onClick={() => setFilter('read')} className={`px-3 py-1 rounded ${filter === 'read' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>Read</button>
      </div>

      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border p-2">Date</th><th className="border p-2">Name</th><th className="border p-2">Email</th><th className="border p-2">Message</th><th className="border p-2">Status</th><th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts?.map(c => (
            <tr key={c._id} className={!c.isRead ? 'bg-yellow-50' : ''}>
              <td className="border p-2 text-sm">{new Date(c.createdAt).toLocaleDateString()}</td>
              <td className="border p-2">{c.name}</td>
              <td className="border p-2">{c.email}</td>
              <td className="border p-2 max-w-xs truncate">{c.message}</td>
              <td className="border p-2 text-center">{c.isRead ? 'Read' : 'Unread'}</td>
              <td className="border p-2">
                <button onClick={() => handleMarkRead(c._id, c.isRead)} className="text-green-600 mr-2">{c.isRead ? 'Mark Unread' : 'Mark Read'}</button>
                <button onClick={() => handleDelete(c._id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactsManager;