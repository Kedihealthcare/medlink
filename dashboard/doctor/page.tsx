'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';

export default function DoctorDashboard() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Navigation & Header */}
      <button className="text-sm font-medium text-slate-500 hover:text-sky-600 transition-colors flex items-center gap-1">
        &larr; Back to Schedule
      </button>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight text-slate-800 uppercase">Appointment Details</h1>
        <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-600 ring-1 ring-inset ring-emerald-500/20">
          ACTIVE
        </span>
      </div>

      <Card className="space-y-4 bg-slate-50">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-500">Patient</p>
            <p className="font-semibold text-slate-800">John Doe (DOB: 05/12/1980)</p>
          </div>
          <div>
            <p className="text-sm text-slate-500">Time</p>
            <p className="font-semibold text-slate-800">10:00 AM - 10:30 AM</p>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200">
          <p className="text-sm text-slate-500 mb-1">REASON FOR VISIT</p>
          <p className="text-base text-slate-800 bg-white p-3 rounded-md border border-slate-200 italic">
            "Experiencing mild chest pain when jogging"
          </p>
        </div>
      </Card>

      {/* Medical Record Entry Form */}
      <h2 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2 mt-8">MEDICAL RECORD ENTRY</h2>
      
      <Card className="space-y-4">
        <Input label="Diagnosis" placeholder="Enter findings here..." />
        <Input label="Treatment Plan" placeholder="Enter prescribed treatments..." />
        
        <div className="w-full mb-4">
          <label className="block text-sm font-semibold text-slate-700 mb-1">Clinical Notes</label>
          <textarea 
            rows={4} 
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            placeholder="Additional observations..."
          ></textarea>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
          <Button variant="secondary">Save Draft Notes</Button>
          <Button variant="primary">Complete Appointment</Button>
        </div>
      </Card>
    </div>
  );
}
