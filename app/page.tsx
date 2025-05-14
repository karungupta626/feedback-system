'use client';

export default function HomePage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Feedback Management Platform
        </h1>
        <p className="text-lg mb-6">
          Navigate using the links above to register, submit feedback, or view reports.
        </p>
        <div className="space-x-4">
          <a
            href="/register"
            className="inline-block bg-blue-700 text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-blue-800 transition duration-300"
          >
            Register
          </a>
          <a
            href="/login"
            className="inline-block bg-blue-700 text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-blue-800 transition duration-300"
          >
            Login
          </a>
          <a
            href="/feedback"
            className="inline-block bg-green-700 text-white py-2 px-6 rounded-lg text-lg font-semibold hover:bg-green-800 transition duration-300"
          >
            Submit Feedback
          </a>
        </div>
      </div>
    </div>
  );
}
