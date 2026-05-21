import { useLoaderData, useRevalidator } from 'react-router-dom';
import { useState } from 'react';
import { createAdminTestimonial, updateAdminTestimonial, deleteAdminTestimonial } from '../../services/api';

const TestimonialsManager = () => {
  const { testimonials } = useLoaderData();
  const revalidator = useRevalidator();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ clientName: '', clientTitle: '', content: '', rating: 5, imageUrl: '', isVisible: true });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    editing ? await updateAdminTestimonial(editing, form) : await createAdminTestimonial(form);
    resetForm();
    revalidator.revalidate();
  };

  const resetForm = () => {
    setEditing(null);
    setForm({ clientName: '', clientTitle: '', content: '', rating: 5, imageUrl: '', isVisible: true });
  };

  const handleEdit = (t) => { setEditing(t._id); setForm(t); };
  const handleDelete = async (id) => {
    if (window.confirm('Delete this testimonial?')) { await deleteAdminTestimonial(id); revalidator.revalidate(); }
  };

  const inputClass = "w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#0184c7] focus:ring-1 focus:ring-[#0184c7] transition";

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-[#0F2D52] mb-8">Manage Testimonials</h1>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="text-lg font-semibold text-[#0F2D52] mb-5 pb-3 border-b border-gray-100">
          {editing ? 'Edit' : 'Add'} Testimonial
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="clientName" placeholder="Client Name" value={form.clientName} onChange={handleChange} className={inputClass} required />
          <input name="clientTitle" placeholder="Title (e.g., CEO)" value={form.clientTitle} onChange={handleChange} className={inputClass} />
          <textarea name="content" placeholder="Testimonial content" value={form.content} onChange={handleChange} className={`${inputClass} md:col-span-2`} rows="3" required />
          <input name="rating" type="number" min="1" max="5" placeholder="Rating 1-5" value={form.rating} onChange={handleChange} className={inputClass} />
          <input name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} className={inputClass} />
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input type="checkbox" name="isVisible" checked={form.isVisible} onChange={handleChange} className="w-4 h-4 accent-[#0184c7]" />
            Visible on site
          </label>
        </div>
        <div className="mt-5 flex gap-3">
          <button onClick={handleSubmit} className="px-6 py-2.5 bg-[#0184c7] text-white text-sm rounded-lg hover:bg-[#016da5] transition font-medium">
            {editing ? 'Update' : 'Add'}
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
                {['Client', 'Content', 'Rating', 'Visible', 'Actions'].map(h => (
                  <th key={h} className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {testimonials.data?.map(t => (
                <tr key={t._id} className="hover:bg-[#f0f7ff] transition">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-[#0F2D52]">{t.clientName}</p>
                    <p className="text-xs text-gray-400">{t.clientTitle}</p>
                  </td>
                  <td className="px-6 py-4 max-w-[200px]">
                    <p className="text-sm text-gray-600 truncate">{t.content}</p>
                  </td>
                  <td className="px-6 py-4 text-sm">{'⭐'.repeat(t.rating)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${t.isVisible ? 'bg-[#e8f4fd] text-[#0184c7]' : 'bg-gray-100 text-gray-400'}`}>
                      {t.isVisible ? 'Visible' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-3">
                    <button onClick={() => handleEdit(t)} className="text-xs font-medium text-[#0184c7] hover:text-[#016da5]">Edit</button>
                    <button onClick={() => handleDelete(t._id)} className="text-xs font-medium text-red-500 hover:text-red-700">Delete</button>
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

export default TestimonialsManager;
