'use client';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import api from '../lib/api';
import { ReportData } from '../types';

export default function ReportCharts() {
  const [data, setData] = useState<ReportData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get('/reports/category-count');
      setData(res.data);
    };
    fetchData();
  }, []);

  return (
    <BarChart width={900} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="_id" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  );
}
