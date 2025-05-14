'use client';
import { useState } from 'react';
import api from '../lib/api';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ userID: '', userName: '', userEmail: '', role: 'user' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', formData);
      alert('User Registered successfully');

      setFormData({ userID: '', userName: '', userEmail: '', role: 'user' });
    } catch (error) {
      alert('Registration failed, please try again');
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-black">Register New User</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="userID" className="block text-lg font-medium text-gray-700">User ID</label>
          <input id="userID" name="userID" value={formData.userID} onChange={handleChange} placeholder="Enter User ID" required className="input"/>
        </div>
        <div>
          <label htmlFor="userName" className="block text-lg font-medium text-gray-700">Username</label>
          <input id="userName" name="userName" value={formData.userName} onChange={handleChange} placeholder="Enter Username" required className="input"/>
        </div>
        <div>
          <label htmlFor="userEmail" className="block text-lg font-medium text-gray-700">Email</label>
          <input id="userEmail" name="userEmail" value={formData.userEmail} onChange={handleChange} placeholder="Enter Email" required className="input" />
        </div>
        <div>
          <label htmlFor="role" className="block text-lg font-medium text-gray-700">Role</label>
          <select id="role" name="role" value={formData.role} onChange={handleChange} className="input">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="btn w-full py-2 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Register
        </button>
      </form>
    </div>
  );
}
