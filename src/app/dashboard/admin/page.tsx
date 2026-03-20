'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight text-slate-800">SYSTEM OVERVIEW</h1>
      
      {/* High Level KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-sky-50 border-sky-100">
          <p className="text-sm font-semibold text-sky-600 uppercase tracking-widest">Total Users</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">1,452</p>
        </Card>
        <Card>
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Appts Today</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">89</p>
        </Card>
        <Card>
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Active Doctors</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">45</p>
        </Card>
        <Card className="bg-rose-50 border-rose-100">
          <p className="text-sm font-semibold text-rose-600 uppercase tracking-widest">Pending Approvals</p>
          <p className="text-3xl font-bold text-rose-600 mt-2">3</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Onboarding */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2">RECENT ONBOARDING (Doctors)</h2>
          <Card className="p-0 overflow-hidden">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Specialty</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">Dr. M. Lee</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">Neurology</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-amber-500 font-semibold">Pending</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="ghost" className="text-sky-600 text-sm">Review</Button>
                  </td>
                </tr>
                <tr className="bg-slate-50/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">Dr. A. Patel</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">Pediatrics</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-emerald-500 font-semibold">Approved</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="ghost" className="text-slate-500 text-sm">Manage</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </Card>
        </div>

        {/* System Alerts */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2">SYSTEM ALERTS</h2>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
            <div className="p-4 flex gap-3 items-start bg-rose-50/30">
              <span className="text-lg">⚠️</span>
              <div>
                <p className="text-sm font-medium text-slate-800">Database connection retry</p>
                <p className="text-xs text-slate-500 mt-0.5">Today at 08:45 AM</p>
              </div>
            </div>
            <div className="p-4 flex gap-3 items-start">
              <span className="text-lg">ℹ️</span>
              <div>
                <p className="text-sm font-medium text-slate-800">System backup completed</p>
                <p className="text-xs text-slate-500 mt-0.5">Today at 02:00 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
