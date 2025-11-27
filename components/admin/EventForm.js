'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EventForm({ initialData = {}, isEdit = false }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: initialData.id || '',
    name: initialData.name || '',
    date: initialData.date ? new Date(initialData.date).toISOString().split('T')[0] : '',
    image: initialData.image || '',
    description: initialData.description || '',
    featured: initialData.featured || false,
    upcoming: initialData.upcoming !== undefined ? initialData.upcoming : true,
    details: initialData.details || {},
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Helper for dynamic details
  const [detailKey, setDetailKey] = useState('');
  const [detailValue, setDetailValue] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      };

      // Auto-update upcoming status when date changes
      if (name === 'date') {
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            newData.upcoming = false;
        } else {
            newData.upcoming = true;
        }
      }
      
      return newData;
    });
  };

  const handleAddDetail = () => {
    if (detailKey && detailValue) {
      setFormData(prev => ({
        ...prev,
        details: {
          ...prev.details,
          [detailKey]: detailValue
        }
      }));
      setDetailKey('');
      setDetailValue('');
    }
  };

  const handleRemoveDetail = (key) => {
    const newDetails = { ...formData.details };
    delete newDetails[key];
    setFormData(prev => ({ ...prev, details: newDetails }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const url = isEdit ? `/api/events/${formData.id}` : '/api/events';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Something went wrong');
      }

      router.push('/admin/events');
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">{isEdit ? 'Edit Event' : 'Create New Event'}</h2>
      
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Event ID (Unique)</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            disabled={isEdit}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline disabled:bg-gray-200"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Event Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            placeholder="/events/2025/image.jpg"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
          required
        />
      </div>

      <div className="flex gap-6 mb-6">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2 text-gray-700">Featured Event</span>
        </label>

        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="upcoming"
            checked={formData.upcoming}
            onChange={handleChange}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2 text-gray-700">Upcoming Event</span>
        </label>
      </div>

      <div className="mb-6 border-t pt-4">
        <h3 className="text-lg font-semibold mb-3">Additional Details</h3>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Key (e.g. venue)"
            value={detailKey}
            onChange={(e) => setDetailKey(e.target.value)}
            className="shadow appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <input
            type="text"
            placeholder="Value (e.g. RUET Auditorium)"
            value={detailValue}
            onChange={(e) => setDetailValue(e.target.value)}
            className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          <button
            type="button"
            onClick={handleAddDetail}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add
          </button>
        </div>

        <div className="bg-gray-50 p-4 rounded">
          {Object.entries(formData.details).length === 0 && <p className="text-gray-500 text-sm">No details added yet.</p>}
          {Object.entries(formData.details).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center border-b py-2 last:border-0">
              <div>
                <span className="font-semibold capitalize">{key}:</span> {value}
              </div>
              <button
                type="button"
                onClick={() => handleRemoveDetail(key)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
        >
          {loading ? 'Saving...' : (isEdit ? 'Update Event' : 'Create Event')}
        </button>
      </div>
    </form>
  );
}
