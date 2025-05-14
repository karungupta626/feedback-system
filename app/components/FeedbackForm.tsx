'use client';
import { useState, useEffect } from 'react';
import api from '../lib/api';
import { Feedback } from '../types';
import { decodeJWT } from '../useProtectedRoute';

export default function FeedbackForm() {
  const [feedback, setFeedback] = useState<Feedback>({
    userID: '',
    rating: 5,
    comment: '',
    category: '',
    tags: [],
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = decodeJWT(token);
        setFeedback((prevFeedback) => ({
          ...prevFeedback,
          userID: decodedToken.userID,
        }));
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      setFeedback((prevFeedback) => ({
        ...prevFeedback,
        userID: 'anonymous',
      }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const handleTags = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeedback({ ...feedback, tags: e.target.value.split(',') });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/feedback/submit', feedback);
      alert('Feedback submitted');
      
      setFeedback({
        userID: '',
        rating: 5,
        comment: '',
        category: '',
        tags: [],
      });
    } catch (error) {
      alert('Failed to submit feedback');
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-black">Add Feedback</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
        <div>
          <label htmlFor="userID" className="block text-lg font-medium text-black">User ID</label>
          <input id="userID" name="userID" value={feedback.userID} onChange={handleChange} placeholder="Enter User ID" className="input cursor-not-allowed" required readOnly />
        </div>
        <div>
          <label htmlFor="comment" className="block text-lg font-medium text-black">Comment</label>
          <textarea id="comment" name="comment" value={feedback.comment} onChange={handleChange} placeholder="Enter your feedback" className="input" />
        </div>
        <div>
          <label htmlFor="rating" className="block text-lg font-medium text-black">Rating (1-5)</label>
          <input id="rating" name="rating" type="number" min="1" max="5" value={feedback.rating} onChange={handleChange} className="input" />
        </div>
        <div>
          <label htmlFor="category" className="block text-lg font-medium text-black">Category</label>
          <input id="category" name="category" value={feedback.category} onChange={handleChange} placeholder="Enter category" className="input" />
        </div>
        <div>
          <label htmlFor="tags" className="block text-lg font-medium text-black">Tags (comma-separated)</label>
          <input id="tags" name="tags" value={feedback.tags.join(',')} onChange={handleTags} placeholder="Enter tags" className="input" />
        </div>
        <button type="submit" className="btn w-full py-2 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700" >
          Submit Feedback
        </button>
      </form>
    </div>
  );
}

