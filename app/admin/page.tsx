'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProtectedRoute } from '../useProtectedRoute';
import api from '../lib/api';
import ReportCharts from '../components/ReportCharts';

export default function AdminPage() {
  const { user, loading } = useProtectedRoute();
  const [dailyFeedback, setDailyFeedback] = useState<any>(null);
  const [topUsers, setTopUsers] = useState<any>(null);
  const [tagFrequency, setTagFrequency] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (user && !loading) {
      const fetchReports = async () => {
        try {
          const dailyFeedbackRes = await api.get('/reports/daily-feedback');
          setDailyFeedback(dailyFeedbackRes.data);

          const topUsersRes = await api.get('/reports/top-users');
          setTopUsers(topUsersRes.data);

          const tagFrequencyRes = await api.get('/reports/tag-frequency');
          setTagFrequency(tagFrequencyRes.data);
        } catch (error) {
          console.error('Error fetching report data:', error);
        }
      };

      fetchReports();
    }
  }, [user, loading]);

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  if (user?.role !== 'admin') {
    router.push('/feedback');
    return <div>Redirecting...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-12 px-4">
      <h1 className="text-4xl font-extrabold text-black mb-8">Admin Dashboard</h1>

      <div className="w-full max-w-5xl bg-white p-12 rounded-lg shadow-xl">
        <ReportCharts />
      </div>

      <div className="flex justify-between gap-8 w-full max-w-5xl mb-8">
        <div className="w-full bg-white p-6 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold text-black mb-4">Daily Feedback</h2>
          <div>
            {dailyFeedback ? (
              <table className="table-auto w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Date</th>
                    <th className="border px-4 py-2">Feedback Count</th>
                  </tr>
                </thead>
                <tbody>
                  {dailyFeedback.map((item: any, index: number) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{item._id}</td>
                      <td className="border px-4 py-2">{item.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Loading daily feedback...</p>
            )}
          </div>
        </div>

        <div className="w-full bg-white p-6 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold text-black mb-4">Top Users</h2>
          <div>
            {topUsers ? (
              <table className="table-auto w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">User Name</th>
                    <th className="border px-4 py-2">Feedback Count</th>
                  </tr>
                </thead>
                <tbody>
                  {topUsers.map((user: any, index: number) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{user._id}</td>
                      <td className="border px-4 py-2">{user.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Loading top users...</p>
            )}
          </div>
        </div>

        <div className="w-full bg-white p-6 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold text-black mb-4">Tag Frequency</h2>
          <div>
            {tagFrequency ? (
              <table className="table-auto w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Tag</th>
                    <th className="border px-4 py-2">Frequency</th>
                  </tr>
                </thead>
                <tbody>
                  {tagFrequency.map((tag: any, index: number) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{tag._id}</td>
                      <td className="border px-4 py-2">{tag.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Loading tag frequency...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
