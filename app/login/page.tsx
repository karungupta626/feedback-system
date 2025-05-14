'use client';
import { useState } from 'react';
import api from '../lib/api';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [userNameOrEmail, setUserNameOrEmail] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserNameOrEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await api.post('/auth/login', { userNameOrEmail });
      localStorage.setItem('token', response.data.token);
      alert('Login successful');
      router.push('/feedback');
    } catch (error) {
      alert('Login failed');
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-black">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="userNameOrEmail" className="block text-lg font-medium text-gray-700">
            Username or Email
          </label>
          <input
            id="userNameOrEmail"
            name="userNameOrEmail"
            value={userNameOrEmail}
            onChange={handleChange}
            placeholder="Enter Username or Email"
            required
            className="input"
          />
        </div>
        <button type="submit" className="btn w-full py-2 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Login
        </button>
      </form>
    </div>
  );
}
