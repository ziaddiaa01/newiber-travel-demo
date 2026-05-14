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
    if (editing) {
      await updateAdminFAQ(editing, form);
    } else {
      await createAdminFAQ(form);
    }
    resetForm();
    revalidator.revalidate();
  };

  const resetForm = () => {
    setEditing(null);
    setForm({ question: '', answer: '', order: 0, isVisible: true });
  };

  const handleEdit = (faq) => {
    setEditing(faq._id);
    setForm(faq);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this FAQ?')) {
      await deleteAdminFAQ(id);
      revalidator.revalidate();
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage FAQs</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">{editing ? 'Edit' : 'Add'} FAQ</h2>
        <div className="grid grid-cols-2 gap-4">
          <input name="question" placeholder="Question" value={form.question} onChange={handleChange} className="border p-2 rounded col-span-2" required />
          <textarea name="answer" placeholder="Answer" value={form.answer} onChange={handleChange} className="border p-2 rounded col-span-2" rows="3" required />
          <input name="order" type="number" placeholder="Display order" value={form.order} onChange={handleChange} className="border p-2 rounded" />
          <label className="flex items-center">
            <input type="checkbox" name="isVisible" checked={form.isVisible} onChange={handleChange} className="mr-2" />
            Visible
          </label>
        </div>
        <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">{editing ? 'Update' : 'Add'}</button>
        {editing && <button type="button" onClick={resetForm} className="ml-2 bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>}
      </form>

      <table className="min-w-full bg-white border">
        <thead>
          <tr><th className="border p-2">Order</th><th className="border p-2">Question</th><th className="border p-2">Visible</th><th className="border p-2">Actions</th></tr>
        </thead>
        <tbody>
          {faqs.data?.map(f => (
            <tr key={f._id}>
              <td className="border p-2 text-center">{f.order}</td>
              <td className="border p-2">{f.question}</td>
              <td className="border p-2 text-center">{f.isVisible ? '✅' : '❌'}</td>
              <td className="border p-2">
                <button onClick={() => handleEdit(f)} className="text-blue-600 mr-2">Edit</button>
                <button onClick={() => handleDelete(f._id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FAQsManager;