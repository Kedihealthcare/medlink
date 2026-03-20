"use client";

import { useQuery } from "@tanstack/react-query";
import api from "../../../lib/axios";

export default function PatientDashboard() {
  const { data: appointments, isLoading } = useQuery({
    queryKey: ['appointments'],
    queryFn: async () => {
      const res = await api.get('/appointments');
      return res.data;
    }
  });

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Patient Dashboard</h1>
        <a href="/patient/booking" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Book Appointment
        </a>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Your Upcoming Appointments</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : appointments?.length === 0 ? (
          <p className="text-gray-500">No appointments scheduled.</p>
        ) : (
          <ul className="divide-y">
            {appointments?.map((apt: any) => (
              <li key={apt.id} className="py-4">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium">Dr. {apt.doctor.user.lastName}</p>
                    <p className="text-sm text-gray-500">{new Date(apt.dateTime).toLocaleString()}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${apt.status === 'SCHEDULED' ? 'bg-green-100 text-green-800' : 'bg-gray-100'}`}>
                    {apt.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
