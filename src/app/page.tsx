import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Simple Header */}
      <header className="w-full bg-white border-b border-slate-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500 bg-opacity-20 text-sky-600">
              <span className="font-bold text-xl">+</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">MedLink</span>
          </div>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link href="/register">
              <Button variant="primary">Sign up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl text-center space-y-8">
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
            Modern Healthcare, <span className="text-sky-500">Simplified.</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600 max-w-2xl mx-auto">
            MedLink seamlessly connects patients with world-class specialists. Book appointments effortlessly, access your medical records securely, and manage your health journey in one intuitive platform.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/register">
              <Button variant="primary" className="px-8 py-3 text-lg">Get Started</Button>
            </Link>
            <Link href="/login">
              <Button variant="secondary" className="px-8 py-3 text-lg">Clinician Portal &rarr;</Button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center">
        <p className="text-sm text-slate-500">© 2026 MedLink Healthcare Systems. All rights reserved.</p>
      </footer>
    </div>
  );
}
