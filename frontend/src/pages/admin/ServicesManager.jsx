import { useLoaderData, useRevalidator } from 'react-router-dom';
import { useState } from 'react';
import { createAdminService, updateAdminService, deleteAdminService } from '../../services/api';

const ServicesManager = () => {
  const { services } = useLoaderData();
  const revalidator = useRevalidator();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', icon: '', isVip: false, order: 0 });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    editing ? await updateAdminService(editing, form) : await createAdminService(form);
    resetForm();
    revalidator.revalidate();
  };

  const resetForm = () => {
    setEditing(null);
    setForm({ title: '', description: '', icon: '', isVip: false, order: 0 });
  };

  const handleEdit = (service) => { setEditing(service._id); setForm(service); };
  const handleDelete = async (id) => {
    if (window.confirm('Delete this service?')) { await deleteAdminService(id); revalidator.revalidate(); }
  };

  const inputClass = "w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#0184c7] focus:ring-1 focus:ring-[#0184c7] transition";

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-[#0F2D52] mb-8">Manage Services</h1>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="text-lg font-semibold text-[#0F2D52] mb-5 pb-3 border-b border-gray-100">
          {editing ? 'Edit Service' : 'Add New Service'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} className={inputClass} required />
          <input type="text" name="icon" placeholder="Icon (e.g., fa-ship)" value={form.icon} onChange={handleChange} className={inputClass} />
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className={`${inputClass} md:col-span-2`} rows="4" required />
          <input type="number" name="order" placeholder="Order" value={form.order} onChange={handleChange} className={inputClass} />
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input type="checkbox" name="isVip" checked={form.isVip} onChange={handleChange} className="w-4 h-4 accent-[#0184c7]" />
            VIP Service
          </label>
        </div>
        <div className="mt-5 flex gap-3">
          <button onClick={handleSubmit} className="px-6 py-2.5 bg-[#0184c7] text-white text-sm rounded-lg hover:bg-[#016da5] transition font-medium">
            {editing ? 'Update' : 'Add'} Service
          </button>
          {editing && (
            <button onClick={resetForm} className="px-6 py-2.5 bg-gray-100 text-gray-600 text-sm rounded-lg hover:bg-gray-200 transition font-medium">
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-[#0F2D52]">
                <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Order</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Title</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">VIP</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {services.data.map(service => (
                <tr key={service._id} className="hover:bg-[#f0f7ff] transition">
                  <td className="px-6 py-4 text-sm text-gray-500">{service.order}</td>
                  <td className="px-6 py-4 text-sm font-medium text-[#0F2D52]">{service.title}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${service.isVip ? 'bg-[#e8f4fd] text-[#0184c7]' : 'bg-gray-100 text-gray-400'}`}>
                      {service.isVip ? 'VIP' : 'Standard'}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-3">
                    <button onClick={() => handleEdit(service)} className="text-xs font-medium text-[#0184c7] hover:text-[#016da5] transition">Edit</button>
                    <button onClick={() => handleDelete(service._id)} className="text-xs font-medium text-red-500 hover:text-red-700 transition">Delete</button>
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

export default ServicesManager;
