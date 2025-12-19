'use client';

import { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaImage, FaEye, FaEyeSlash, FaFilter } from 'react-icons/fa';

export default function AdminGalleryPage() {
  const [galleries, setGalleries] = useState([]);
  const [filteredGalleries, setFilteredGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingGallery, setEditingGallery] = useState(null);
  const [years, setYears] = useState([]);
  const [eventSlugs, setEventSlugs] = useState([]);
  const [events, setEvents] = useState([]);
  
  // Filters
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedEventSlug, setSelectedEventSlug] = useState('');
  const [showPublishedOnly, setShowPublishedOnly] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    eventId: '',
    year: '',
    eventSlug: '',
    eventName: '',
    images: '',
    displayOrder: 0,
    isPublished: true,
  });

  useEffect(() => {
    fetchGalleries();
    fetchEvents();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [galleries, selectedYear, selectedEventSlug, showPublishedOnly]);

  const fetchGalleries = async () => {
    try {
      const res = await fetch('/api/gallery');
      const data = await res.json();
      if (data.success) {
        console.log('Fetched galleries:', data.items); // Debug log
        setGalleries(data.items || []);
        setYears(data.years || []);
        setEventSlugs(data.eventSlugs || []);
      }
    } catch (error) {
      console.error('Failed to fetch galleries', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/events');
      const data = await res.json();
      if (data.success) {
        setEvents(data.events || []);
      }
    } catch (error) {
      console.error('Failed to fetch events', error);
    }
  };

  const applyFilters = () => {
    let filtered = [...galleries];

    if (selectedYear) {
      filtered = filtered.filter(g => g.year === selectedYear);
    }

    if (selectedEventSlug) {
      filtered = filtered.filter(g => g.eventSlug === selectedEventSlug);
    }

    if (showPublishedOnly) {
      filtered = filtered.filter(g => g.isPublished);
    }

    setFilteredGalleries(filtered);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this gallery item?')) return;

    try {
      const res = await fetch(`/api/gallery/${id}`, {
        method: 'DELETE',
      });
      
      if (res.ok) {
        setGalleries(galleries.filter(gallery => gallery._id !== id));
        alert('Gallery item deleted successfully');
      } else {
        alert('Failed to delete gallery item');
      }
    } catch (error) {
      console.error('Error deleting gallery item:', error);
      alert('Error deleting gallery item');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Parse images string (comma or newline separated)
      const imageArray = formData.images
        .split(/[\n,]/)
        .map(img => img.trim())
        .filter(img => img.length > 0);

      const payload = {
        ...formData,
        eventId: formData.eventId || null, // Ensure empty string becomes null
        images: imageArray,
      };

      console.log('Submitting payload:', payload); // Debug log

      const url = editingGallery 
        ? `/api/gallery/${editingGallery._id}`
        : '/api/gallery';
      
      const method = editingGallery ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        alert(editingGallery ? 'Gallery item updated successfully' : 'Gallery item created successfully');
        setShowForm(false);
        setEditingGallery(null);
        resetForm();
        fetchGalleries();
      } else {
        alert(data.error || 'Failed to save gallery item');
      }
    } catch (error) {
      console.error('Error saving gallery item:', error);
      alert('Error saving gallery item');
    }
  };

  const handleEdit = (gallery) => {
    setEditingGallery(gallery);
    setFormData({
      eventId: gallery.eventId || '',
      year: gallery.year || '',
      eventSlug: gallery.eventSlug || '',
      eventName: gallery.eventName || '',
      images: gallery.images ? gallery.images.join('\n') : '',
      displayOrder: gallery.displayOrder || 0,
      isPublished: gallery.isPublished !== undefined ? gallery.isPublished : true,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      eventId: '',
      year: '',
      eventSlug: '',
      eventName: '',
      images: '',
      displayOrder: 0,
      isPublished: true,
    });
  };

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '_') // Replace spaces with underscores
      .replace(/-+/g, '_') // Replace hyphens with underscores
      .replace(/_+/g, '_') // Replace multiple underscores with single
      .trim();
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle event selection - auto-fill year, eventSlug, and eventName
    if (name === 'eventId') {
      if (value) {
        const selectedEvent = events.find(event => event.id === value);
        if (selectedEvent) {
          const eventYear = new Date(selectedEvent.date).getFullYear().toString();
          setFormData(prev => ({
            ...prev,
            eventId: value,
            year: eventYear,
            eventSlug: selectedEvent.id,
            eventName: selectedEvent.name
          }));
        }
      } else {
        // Clear event reference - user can manually enter data
        setFormData(prev => ({
          ...prev,
          eventId: ''
        }));
      }
      return;
    }
    
    // Auto-generate slug when event name changes (only if not editing and no event selected)
    if (name === 'eventName' && !editingGallery && !formData.eventId) {
      const slug = generateSlug(value);
      setFormData(prev => ({
        ...prev,
        eventName: value,
        eventSlug: slug
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading galleries...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Gallery</h1>
        <button 
          onClick={() => {
            setShowForm(!showForm);
            setEditingGallery(null);
            resetForm();
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FaPlus /> Add Gallery Item
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-500" />
            <span className="font-semibold">Filters:</span>
          </div>
          
          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="border rounded px-3 py-1"
          >
            <option value="">All Years</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>

          <select 
            value={selectedEventSlug}
            onChange={(e) => setSelectedEventSlug(e.target.value)}
            className="border rounded px-3 py-1"
          >
            <option value="">All Events</option>
            {eventSlugs.map(slug => (
              <option key={slug} value={slug}>{slug}</option>
            ))}
          </select>

          <label className="flex items-center gap-2">
            <input 
              type="checkbox"
              checked={showPublishedOnly}
              onChange={(e) => setShowPublishedOnly(e.target.checked)}
              className="rounded"
            />
            <span>Published Only</span>
          </label>

          <button
            onClick={() => {
              setSelectedYear('');
              setSelectedEventSlug('');
              setShowPublishedOnly(false);
            }}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">
            {editingGallery ? 'Edit Gallery Item' : 'Add New Gallery Item'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Link to Existing Event (Optional)</label>
              <select
                name="eventId"
                value={formData.eventId}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value="">-- Standalone Gallery (No Event Link) --</option>
                {events.map(event => (
                  <option key={event.id} value={event.id}>
                    {event.name} ({new Date(event.date).getFullYear()})
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Link this gallery to an existing event to auto-fill details, or leave blank for standalone gallery
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Event Name *</label>
              <input
                type="text"
                name="eventName"
                value={formData.eventName}
                onChange={handleInputChange}
                required
                placeholder="e.g., IEEE Day 2025"
                className="w-full border rounded px-3 py-2"
                disabled={!!formData.eventId}
              />
              {formData.eventId && (
                <p className="text-xs text-blue-500 mt-1">Auto-filled from selected event</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Event Slug (Auto-fillable/editable) *</label>
              <input
                type="text"
                name="eventSlug"
                value={formData.eventSlug}
                onChange={handleInputChange}
                required
                placeholder="e.g., ieee_day"
                className="w-full border rounded px-3 py-2"
                disabled={!!formData.eventId}
              />
              {formData.eventId ? (
                <p className="text-xs text-blue-500 mt-1">Auto-filled from selected event</p>
              ) : (
                <p className="text-xs text-gray-500 mt-1">Use lowercase with underscores</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Year *</label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                required
                placeholder="e.g., 2025"
                className="w-full border rounded px-3 py-2"
                disabled={!!formData.eventId}
              />
              {formData.eventId && (
                <p className="text-xs text-blue-500 mt-1">Auto-filled from selected event</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Display Order</label>
              <input
                type="number"
                name="displayOrder"
                value={formData.displayOrder}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Images (one per line or comma separated)</label>
              <textarea
                name="images"
                value={formData.images}
                onChange={handleInputChange}
                rows={8}
                placeholder="/gallery/2025/ieee_day/1.jpg&#10;/gallery/2025/ieee_day/2.jpg&#10;/gallery/2025/ieee_day/3.jpg"
                className="w-full border rounded px-3 py-2 font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">Enter full paths starting with /gallery/</p>
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isPublished"
                  checked={formData.isPublished}
                  onChange={handleInputChange}
                  className="rounded"
                />
                <span className="flex items-center gap-1">
                  <FaEye className="text-green-500" /> Published (visible on gallery page)
                </span>
              </label>
            </div>

            <div className="md:col-span-2 flex gap-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
              >
                {editingGallery ? 'Update Gallery Item' : 'Create Gallery Item'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingGallery(null);
                  resetForm();
                }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Gallery Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-3 bg-gray-50 border-b">
          <p className="text-sm text-gray-600">
            Showing {filteredGalleries.length} of {galleries.length} gallery items
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Slug</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Images</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Linked Event</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredGalleries.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                    No gallery items found. {galleries.length > 0 ? 'Try adjusting your filters.' : 'Add your first gallery item!'}
                  </td>
                </tr>
              ) : (
                filteredGalleries.map((gallery) => (
                  <tr key={gallery._id || gallery.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{gallery.year}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{gallery.eventSlug}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{gallery.eventName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <FaImage /> {gallery.images?.length || 0}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {gallery.eventId ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          Linked
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-600">
                          Standalone
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        gallery.isPublished 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {gallery.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(gallery)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        <FaEdit className="inline" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(gallery._id || gallery.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FaTrash className="inline" /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
