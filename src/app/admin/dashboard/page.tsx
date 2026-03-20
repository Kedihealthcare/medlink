"use client";

import { useQuery } from "@tanstack/react-query";
import api from "../../../lib/axios";

export default function AdminDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-analytics'],
    queryFn: async () => {
      const res = await api.get('/admin/analytics');
      return res.data;
    }
  });

  if (isLoading) return <div className="p-8">Loading analytics...</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Admin Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">User Demographics</h2>
          <ul className="space-y-4 text-lg">
            <li className="flex justify-between"><span>Total Users:</span> <span className="font-bold">{stats?.users.total}</span></li>
            <li className="flex justify-between"><span>Patients:</span> <span className="font-bold text-blue-600">{stats?.users.patients}</span></li>
            <li className="flex justify-between"><span>Doctors:</span> <span className="font-bold text-green-600">{stats?.users.doctors}</span></li>
          </ul>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 border-b pb-2">Appointment Statistics</h2>
          <ul className="space-y-4 text-lg">
            <li className="flex justify-between"><span>Total Appointments:</span> <span className="font-bold">{stats?.appointments.total}</span></li>
            <li className="flex justify-between"><span>Scheduled:</span> <span className="font-bold text-yellow-600">{stats?.appointments.scheduled}</span></li>
            <li className="flex justify-between"><span>Completed:</span> <span className="font-bold text-green-600">{stats?.appointments.completed}</span></li>
            <li className="flex justify-between"><span>Cancelled:</span> <span className="font-bold text-red-600">{stats?.appointments.cancelled}</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
