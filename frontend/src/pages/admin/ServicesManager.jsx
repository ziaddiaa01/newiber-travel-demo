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
    if (editing) {
      await updateAdminService(editing, form);
    } else {
      await createAdminService(form);
    }
    resetForm();
    revalidator.revalidate();
  };

  const resetForm = () => {
    setEditing(null);
    setForm({ title: '', description: '', icon: '', isVip: false, order: 0 });
  };

  const handleEdit = (service) => {
    setEditing(service._id);
    setForm(service);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      await deleteAdminService(id);
      revalidator.revalidate();
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Services</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">{editing ? 'Edit Service' : 'Add New Service'}</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="icon"
            placeholder="Icon (e.g., fa-ship)"
            value={form.icon}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="border p-2 rounded col-span-2"
            rows="4"
            required
          />
          <input
            type="number"
            name="order"
            placeholder="Order"
            value={form.order}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isVip"
              checked={form.isVip}
              onChange={handleChange}
              className="mr-2"
            />
            VIP Service
          </label>
        </div>
        <div className="mt-4">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {editing ? 'Update' : 'Add'} Service
          </button>
          {editing && (
            <button type="button" onClick={resetForm} className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Services List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">VIP</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {services.data.map(service => (
              <tr key={service._id}>
                <td className="px-6 py-4 whitespace-nowrap">{service.order}</td>
                <td className="px-6 py-4 whitespace-nowrap">{service.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{service.isVip ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button onClick={() => handleEdit(service)} className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                  <button onClick={() => handleDelete(service._id)} className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServicesManager;