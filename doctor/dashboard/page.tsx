"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../lib/axios";

export default function DoctorDashboard() {
  const queryClient = useQueryClient();

  const { data: appointments, isLoading } = useQuery({
    queryKey: ['doctor-appointments'],
    queryFn: async () => {
      const res = await api.get('/appointments');
      return res.data;
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, status, notes }: any) => {
      const res = await api.put(`/doctors/appointments/${id}`, { status, notes });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctor-appointments'] });
    }
  });

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Doctor Dashboard</h1>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Patient Appointments</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : appointments?.length === 0 ? (
          <p className="text-gray-500">No appointments scheduled.</p>
        ) : (
          <ul className="divide-y text-sm">
            {appointments?.map((apt: any) => (
              <li key={apt.id} className="py-4 flex justify-between items-center">
                <div>
                  <p className="font-medium">Patient: {apt.patient.user.firstName} {apt.patient.user.lastName}</p>
                  <p className="text-gray-500">{new Date(apt.dateTime).toLocaleString()}</p>
                  {apt.notes && <p className="text-gray-400 text-xs mt-1">Notes: {apt.notes}</p>}
                </div>
                <div className="flex gap-2">
                  <select 
                    className="border p-2 rounded"
                    value={apt.status}
                    onChange={(e) => updateMutation.mutate({ id: apt.id, status: e.target.value })}
                    disabled={updateMutation.isPending}
                  >
                    <option value="SCHEDULED">Scheduled</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
