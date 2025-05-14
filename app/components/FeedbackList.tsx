'use client';
import { useEffect, useState } from 'react';
import api from '../lib/api';
import { Feedback } from '../types';
export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get('/feedback');
      setFeedbacks(res.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">All Feedback</h2>
      <ul className="space-y-2">
        {feedbacks.map((fb, index) => (
          <li key={index} className="border p-4 rounded shadow">
            <p><strong>User:</strong> {fb.userID}</p>
            <p><strong>Comment:</strong> {fb.comment}</p>
            <p><strong>Rating:</strong> {fb.rating}</p>
            <p><strong>Category:</strong> {fb.category}</p>
            <p><strong>Tags:</strong> {fb.tags?.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}