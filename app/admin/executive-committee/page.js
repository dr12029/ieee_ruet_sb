'use client';

import { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaEye, FaEyeSlash, FaStar, FaFilter } from 'react-icons/fa';

export default function AdminExecutiveCommitteePage() {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  
  // Filters
  const [selectedSession, setSelectedSession] = useState('');
  const [selectedOrganization, setSelectedOrganization] = useState('');
  const [showActiveOnly, setShowActiveOnly] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    organization: 'IEEE RUET SB',
    session: '',
    designation: '',
    department: '',
    university: 'Rajshahi University of Engineering & Technology',
    email: '',
    phone: '',
    linkedin: '',
    facebook: '',
    website: '',
    image: '',
    displayOrder: 0,
    featured_member: false,
    isActive: true,
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [members, selectedSession, selectedOrganization, showActiveOnly]);

  const fetchMembers = async () => {
    try {
      const res = await fetch('/api/executive-committee');
      const data = await res.json();
      if (data.success) {
        setMembers(data.members || []);
        setSessions(data.sessions || []);
        setOrganizations(data.organizations || []);
      }
    } catch (error) {
      console.error('Failed to fetch members', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...members];

    if (selectedSession) {
      filtered = filtered.filter(m => m.session === selectedSession);
    }

    if (selectedOrganization) {
      filtered = filtered.filter(m => m.organization === selectedOrganization);
    }

    if (showActiveOnly) {
      filtered = filtered.filter(m => m.isActive);
    }

    setFilteredMembers(filtered);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this member?')) return;

    try {
      const res = await fetch(`/api/executive-committee/${id}`, {
        method: 'DELETE',
      });
      
      if (res.ok) {
        setMembers(members.filter(member => member._id !== id));
        alert('Member deleted successfully');
      } else {
        alert('Failed to delete member');
      }
    } catch (error) {
      console.error('Error deleting member:', error);
      alert('Error deleting member');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = editingMember 
        ? `/api/executive-committee/${editingMember._id}`
        : '/api/executive-committee';
      
      const method = editingMember ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        alert(editingMember ? 'Member updated successfully' : 'Member created successfully');
        setShowForm(false);
        setEditingMember(null);
        resetForm();
        fetchMembers();
      } else {
        alert(data.error || 'Failed to save member');
      }
    } catch (error) {
      console.error('Error saving member:', error);
      alert('Error saving member');
    }
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name || '',
      position: member.position || '',
      organization: member.organization || 'IEEE RUET SB',
      session: member.session || '',
      designation: member.designation || '',
      department: member.department || '',
      university: member.university || 'Rajshahi University of Engineering & Technology',
      email: member.email || '',
      phone: member.phone || '',
      linkedin: member.linkedin || '',
      facebook: member.facebook || '',
      website: member.website || '',
      image: member.image || '',
      displayOrder: member.displayOrder || 0,
      featured_member: member.featured_member || false,
      isActive: member.isActive !== undefined ? member.isActive : true,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      position: '',
      organization: 'IEEE RUET SB',
      session: '',
      designation: '',
      department: '',
      university: 'Rajshahi University of Engineering & Technology',
      email: '',
      phone: '',
      linkedin: '',
      facebook: '',
      website: '',
      image: '',
      displayOrder: 0,
      featured_member: false,
      isActive: true,
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading members...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Executive Committee</h1>
        <button 
          onClick={() => {
            setShowForm(!showForm);
            setEditingMember(null);
            resetForm();
          }}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FaPlus /> Add Member
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
            value={selectedSession}
            onChange={(e) => setSelectedSession(e.target.value)}
            className="border rounded px-3 py-1"
          >
            <option value="">All Sessions</option>
            {sessions.map(session => (
              <option key={session} value={session}>{session}</option>
            ))}
          </select>

          <select 
            value={selectedOrganization}
            onChange={(e) => setSelectedOrganization(e.target.value)}
            className="border rounded px-3 py-1"
          >
            <option value="">All Organizations</option>
            {organizations.map(org => (
              <option key={org} value={org}>{org}</option>
            ))}
          </select>

          <label className="flex items-center gap-2">
            <input 
              type="checkbox"
              checked={showActiveOnly}
              onChange={(e) => setShowActiveOnly(e.target.checked)}
              className="rounded"
            />
            <span>Active Members Only</span>
          </label>

          <button
            onClick={() => {
              setSelectedSession('');
              setSelectedOrganization('');
              setShowActiveOnly(false);
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
            {editingMember ? 'Edit Member' : 'Add New Member'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Basic Information */}
            <div>
              <label className="block text-sm font-medium mb-1">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Position *</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                required
                placeholder="e.g., Chair, Secretary, Advisor"
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Organization *</label>
              <select
                name="organization"
                value={formData.organization}
                onChange={handleInputChange}
                required
                className="w-full border rounded px-3 py-2"
              >
                <option value="IEEE RUET SB">IEEE RUET SB</option>
                <option value="IEEE RUET IAS SB Chapter">IEEE RUET IAS SB Chapter</option>
                <option value="IEEE RUET RAS SB Chapter">IEEE RUET RAS SB Chapter</option>
                <option value="IEEE CS RUET SB Chapter">IEEE CS RUET SB Chapter</option>
                <option value="IEEE RUET WIE SB AG">IEEE RUET WIE SB AG</option>
                <option value="IEEE RUET SPS SB Chapter">IEEE RUET SPS SB Chapter</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Session *</label>
              <input
                type="text"
                name="session"
                value={formData.session}
                onChange={handleInputChange}
                required
                placeholder="e.g., 2024-25"
                className="w-full border rounded px-3 py-2"
              />
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

            {/* Academic Information */}
            <div>
              <label className="block text-sm font-medium mb-1">Designation</label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
                placeholder="e.g., Associate Professor, 3rd Year Undergraduate Student etc."
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                placeholder="e.g., Dept. of EEE"
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">University</label>
              <input
                type="text"
                name="university"
                value={formData.university}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            {/* Contact & Social */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="e.g., +880..."
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">LinkedIn</label>
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleInputChange}
                placeholder="https://linkedin.com/in/username"
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Facebook</label>
              <input
                type="url"
                name="facebook"
                value={formData.facebook}
                onChange={handleInputChange}
                placeholder="https://facebook.com/username"
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Website</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="https://example.com"
                className="w-full border rounded px-3 py-2"
              />
            </div>

            {/* Image */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Image URL</label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="/team/member-name.jpg"
                className="w-full border rounded px-3 py-2"
              />
            </div>

            {/* Checkboxes */}
            <div className="md:col-span-2 flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="featured_member"
                  checked={formData.featured_member}
                  onChange={handleInputChange}
                  className="rounded"
                />
                <span className="flex items-center gap-1">
                  <FaStar className="text-yellow-500" /> Featured Member
                </span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="rounded"
                />
                <span className="flex items-center gap-1">
                  Active Member (Current Committee)
                </span>
              </label>
            </div>

            {/* Buttons */}
            <div className="md:col-span-2 flex gap-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
              >
                {editingMember ? 'Update Member' : 'Create Member'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingMember(null);
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

      {/* Members Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-3 bg-gray-50 border-b">
          <p className="text-sm text-gray-600">
            Showing {filteredMembers.length} of {members.length} members
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Organization</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Session</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No members found. {members.length > 0 ? 'Try adjusting your filters.' : 'Add your first member!'}
                  </td>
                </tr>
              ) : (
                filteredMembers.map((member) => (
                  <tr key={member._id || member.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                          {member.name}
                          {member.featured_member && <FaStar className="text-yellow-500 text-xs" />}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{member.position}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{member.organization}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{member.session}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        member.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {member.isActive ? 'Active' : 'Hall of Fame'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(member)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        <FaEdit className="inline" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(member._id || member.id)}
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
