"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import api from "../../../lib/axios";

export default function BookingPage() {
  const [doctorId, setDoctorId] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [notes, setNotes] = useState("");

  const bookMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post('/appointments', data);
      return res.data;
    },
    onSuccess: () => {
      alert("Appointment booked successfully!");
      window.location.href = "/patient/dashboard";
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    bookMutation.mutate({ doctorId, dateTime, notes });
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Book an Appointment</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow rounded p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Select Doctor</label>
          <select 
            className="w-full border rounded p-2"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            required
          >
            <option value="">Select a doctor...</option>
            <option value="doctor-123">Dr. Smith (Cardiology)</option>
            <option value="doctor-456">Dr. Jones (Pediatrics)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Date & Time</label>
          <input 
            type="datetime-local" 
            className="w-full border rounded p-2"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Notes (Optional)</label>
          <textarea 
            className="w-full border rounded p-2" 
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
        <button 
          type="submit" 
          disabled={bookMutation.isPending}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
        >
          {bookMutation.isPending ? "Booking..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
}
