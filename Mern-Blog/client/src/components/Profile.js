import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/Profile.css';
import { useAuth } from './AuthContext';

const Profile = () => {
  const { authState } = useAuth();
  const [user, setUser] = useState({
    name: '',
    email: '',
    bio: '',
    linkedIn: '',
    github: '',
    portfolio: '',
    phone: '',
    location: '',
  });

  const [editMode, setEditMode] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const name = authState.user?.username || localStorage.getItem('name');
  const email = authState.user?.email || localStorage.getItem('email');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${email}`);
        setUser(res.data || { name, email });
      } catch (err) {
        console.error('Error fetching profile:', err);
        setUser({ name, email });
      }
    };

    if (email) {
      fetchUser();
    }
  }, [email, name]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, email, ...updatableData } = user;
      const res = await axios.put(`http://localhost:5000/api/users/${email}`, updatableData);
      setSuccessMessage('Saved successfully');
      setUser(res.data);
      setEditMode(false);
      

      setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 sec
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-md rounded-xl p-6">
      <h2 className="text-3xl font-bold mb-4">My Profile</h2>

      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 border border-green-300 rounded">
          {successMessage}
        </div>
      )}

      {editMode ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: 'Name', name: 'name', disabled: true },
            { label: 'Email', name: 'email', disabled: true },
            { label: 'Bio', name: 'bio', type: 'textarea' },
            { label: 'LinkedIn', name: 'linkedIn' },
            { label: 'GitHub', name: 'github' },
            { label: 'Portfolio', name: 'portfolio' },
            { label: 'Phone', name: 'phone' },
            { label: 'Location', name: 'location' },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-semibold">{field.label}</label>
              {field.type === 'textarea' ? (
                <textarea
                  name={field.name}
                  value={user[field.name]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  rows="3"
                  disabled={field.disabled}
                />
              ) : (
                <input
                  name={field.name}
                  value={user[field.name]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  disabled={field.disabled}
                />
              )}
            </div>
          ))}

          <div className="flex gap-3">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-2">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Bio:</strong> {user.bio}</p>
          <p><strong>LinkedIn:</strong> <a href={user.linkedIn} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{user.linkedIn}</a></p>
          <p><strong>GitHub:</strong> <a href={user.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{user.github}</a></p>
          <p><strong>Portfolio:</strong> <a href={user.portfolio} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{user.portfolio}</a></p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Location:</strong> {user.location}</p>

          <button
            onClick={() => setEditMode(true)}
            className="edit-profile-btn"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
