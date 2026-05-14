import { useLoaderData, useRevalidator } from 'react-router-dom';
import { useState } from 'react';
import { createAdminTestimonial, updateAdminTestimonial, deleteAdminTestimonial } from '../../services/api';

const TestimonialsManager = () => {
  const { testimonials } = useLoaderData();
  const revalidator = useRevalidator();
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    clientName: '', clientTitle: '', content: '', rating: 5, imageUrl: '', isVisible: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await updateAdminTestimonial(editing, form);
    } else {
      await createAdminTestimonial(form);
    }
    resetForm();
    revalidator.revalidate();
  };

  const resetForm = () => {
    setEditing(null);
    setForm({ clientName: '', clientTitle: '', content: '', rating: 5, imageUrl: '', isVisible: true });
  };

  const handleEdit = (testimonial) => {
    setEditing(testimonial._id);
    setForm(testimonial);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this testimonial?')) {
      await deleteAdminTestimonial(id);
      revalidator.revalidate();
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Testimonials</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">{editing ? 'Edit' : 'Add'} Testimonial</h2>
        <div className="grid grid-cols-2 gap-4">
          <input name="clientName" placeholder="Client Name" value={form.clientName} onChange={handleChange} className="border p-2 rounded" required />
          <input name="clientTitle" placeholder="Title (e.g., CEO)" value={form.clientTitle} onChange={handleChange} className="border p-2 rounded" />
          <textarea name="content" placeholder="Testimonial content" value={form.content} onChange={handleChange} className="border p-2 rounded col-span-2" rows="3" required />
          <input name="rating" type="number" min="1" max="5" placeholder="Rating 1-5" value={form.rating} onChange={handleChange} className="border p-2 rounded" />
          <input name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} className="border p-2 rounded" />
          <label className="flex items-center">
            <input type="checkbox" name="isVisible" checked={form.isVisible} onChange={handleChange} className="mr-2" />
            Visible on site
          </label>
        </div>
        <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">{editing ? 'Update' : 'Add'}</button>
        {editing && <button type="button" onClick={resetForm} className="ml-2 bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>}
      </form>

      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Client</th><th className="border p-2">Content</th><th className="border p-2">Rating</th><th className="border p-2">Visible</th><th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {testimonials.data?.map(t => (
            <tr key={t._id}>
              <td className="border p-2">{t.clientName}<br/><span className="text-xs">{t.clientTitle}</span></td>
              <td className="border p-2 max-w-xs truncate">{t.content}</td>
              <td className="border p-2 text-center">{'⭐'.repeat(t.rating)}</td>
              <td className="border p-2 text-center">{t.isVisible ? '✅' : '❌'}</td>
              <td className="border p-2">
                <button onClick={() => handleEdit(t)} className="text-blue-600 mr-2">Edit</button>
                <button onClick={() => handleDelete(t._id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TestimonialsManager;