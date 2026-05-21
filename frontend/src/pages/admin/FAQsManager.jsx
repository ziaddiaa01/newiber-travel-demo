import { useLoaderData, useRevalidator } from 'react-router-dom';
import { useState } from 'react';
import { createAdminFAQ, updateAdminFAQ, deleteAdminFAQ } from '../../services/api';

const FAQsManager = () => {
  const { faqs } = useLoaderData();
  const revalidator = useRevalidator();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ question: '', answer: '', order: 0, isVisible: true });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    editing ? await updateAdminFAQ(editing, form) : await createAdminFAQ(form);
    resetForm();
    revalidator.revalidate();
  };

  const resetForm = () => { setEditing(null); setForm({ question: '', answer: '', order: 0, isVisible: true }); };
  const handleEdit = (f) => { setEditing(f._id); setForm(f); };
  const handleDelete = async (id) => {
    if (window.confirm('Delete this FAQ?')) { await deleteAdminFAQ(id); revalidator.revalidate(); }
  };

  const inputClass = "w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#0184c7] focus:ring-1 focus:ring-[#0184c7] transition";

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-[#0F2D52] mb-8">Manage FAQs</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="text-lg font-semibold text-[#0F2D52] mb-5 pb-3 border-b border-gray-100">
          {editing ? 'Edit' : 'Add'} FAQ
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="question" placeholder="Question" value={form.question} onChange={handleChange} className={`${inputClass} md:col-span-2`} required />
          <textarea name="answer" placeholder="Answer" value={form.answer} onChange={handleChange} className={`${inputClass} md:col-span-2`} rows="3" required />
          <input name="order" type="number" placeholder="Display order" value={form.order} onChange={handleChange} className={inputClass} />
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input type="checkbox" name="isVisible" checked={form.isVisible} onChange={handleChange} className="w-4 h-4 accent-[#0184c7]" />
            Visible on site
          </label>
        </div>
        <div className="mt-5 flex gap-3">
          <button onClick={handleSubmit} className="px-6 py-2.5 bg-[#0184c7] text-white text-sm rounded-lg hover:bg-[#016da5] transition font-medium">
            {editing ? 'Update' : 'Add'} FAQ
          </button>
          {editing && (
            <button onClick={resetForm} className="px-6 py-2.5 bg-gray-100 text-gray-600 text-sm rounded-lg hover:bg-gray-200 transition font-medium">
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-[#0F2D52]">
                {['Order', 'Question', 'Visible', 'Actions'].map(h => (
                  <th key={h} className="px-6 py-4 text-left text-xs font-medium text-white/70 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {faqs.data?.map(f => (
                <tr key={f._id} className="hover:bg-[#f0f7ff] transition">
                  <td className="px-6 py-4 text-sm text-gray-500">{f.order}</td>
                  <td className="px-6 py-4 text-sm text-[#0F2D52] font-medium max-w-xs truncate">{f.question}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${f.isVisible ? 'bg-[#e8f4fd] text-[#0184c7]' : 'bg-gray-100 text-gray-400'}`}>
                      {f.isVisible ? 'Visible' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-3">
                    <button onClick={() => handleEdit(f)} className="text-xs font-medium text-[#0184c7] hover:text-[#016da5]">Edit</button>
                    <button onClick={() => handleDelete(f._id)} className="text-xs font-medium text-red-500 hover:text-red-700">Delete</button>
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

export default FAQsManager;
