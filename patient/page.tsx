'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useAppointments } from '@/hooks/useAppointments';
import { useAuth } from '@/hooks/useAuth';

export default function PatientDashboard() {
  const { user } = useAuth();
  
  // React Query Fetch Integration!
  const { data: appointments, isLoading, isError, error } = useAppointments();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">
            Good Morning, {user?.firstName || 'Patient'}!
          </h1>
          <p className="text-base text-slate-500 mt-1">Here is your health overview for today.</p>
        </div>
        <Button variant="primary" className="shadow-sm">
          + Book New Appointment
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2">UPCOMING APPOINTMENTS</h2>
          
          {/* React Query States Handled Here */}
          {isLoading && (
             <div className="animate-pulse flex space-x-4 bg-white p-6 rounded-xl border border-sky-100">
               <div className="flex-1 space-y-4 py-1">
                 <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                 <div className="space-y-2">
                   <div className="h-4 bg-slate-200 rounded"></div>
                   <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                 </div>
               </div>
             </div>
          )}

          {isError && (
            <Card className="bg-rose-50 border-rose-200">
              <p className="text-rose-600 font-medium text-center">
                Failed to load appointments. Please check your connection or login status.
              </p>
            </Card>
          )}

          {/* Success State */}
          {!isLoading && !isError && appointments?.length === 0 && (
             <p className="text-slate-500 italic">No upcoming appointments scheduled.</p>
          )}

          {!isLoading && !isError && appointments?.map((apt: any) => (
             <Card key={apt.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 border-l-sky-500 mb-4">
               <div>
                 <p className="text-sm font-semibold text-sky-600 mb-1">📅 {new Date(apt.dateTime).toLocaleString()}</p>
                 <h3 className="text-xl font-bold text-slate-800">Appointment ID: {apt.id}</h3>
                 <p className="text-sm text-slate-500">Status: {apt.status}</p>
               </div>
               <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                 <Button variant="ghost" className="w-full sm:w-auto text-sm">Reschedule</Button>
                 <Button variant="secondary" className="w-full sm:w-auto text-sm">View Details</Button>
               </div>
             </Card>
          ))}
        </div>

        {/* Sidebar Activity */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2">RECENT ACTIVITY</h2>
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-4 shadow-sm">
            <p className="text-sm text-slate-500 italic">No recent activity detected.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
