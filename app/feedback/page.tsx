'use client';

import FeedbackForm from "../components/FeedbackForm";
import FeedbackList from "../components/FeedbackList";

export default function FeedbackPage() {
  return (
    <div className="flex space-x-8">
      <div className="flex-1">
        <FeedbackForm />
      </div>
      
      <div className="flex-1 max-h-screen overflow-y-scroll">
        <FeedbackList />
      </div>
    </div>
  );
}