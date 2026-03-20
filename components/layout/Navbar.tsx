import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export const Navbar = () => {
  const { user, logout } = useAuth(); // Assuming this hook manages auth state

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        
        {/* Brand */}
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500 bg-opacity-20 text-sky-600">
              <span className="font-bold text-xl">+</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">MedLink</span>
          </Link>
        </div>

        {/* Global Search Bar (Placeholder) */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full text-slate-400 focus-within:text-slate-600">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
              </svg>
            </div>
            <input 
              type="text" 
              placeholder="Search doctors, clinics, specialties..." 
              className="block w-full rounded-full border-0 py-1.5 pl-10 pr-3 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6" 
            />
          </div>
        </div>

        {/* User / Actions */}
        <div className="flex items-center gap-4">
          <button className="text-slate-400 hover:text-slate-500">
            <span className="sr-only">Notifications</span>
            {/* Bell Icon Placeholder */}
            🔔
          </button>
          
          <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
            <div className="hidden text-right md:block">
              <span className="block text-sm font-semibold text-slate-700">
                {user ? `${user.firstName} ${user.lastName}` : 'Guest User'}
              </span>
              <span className="block text-xs font-medium text-slate-500">
                {user ? user.role : 'Please login'}
              </span>
            </div>
            {user ? (
               <button onClick={logout} className="text-sm font-medium text-rose-500 hover:text-rose-600">Logout</button>
            ) : (
               <Link href="/login" className="text-sm font-medium text-sky-500 hover:text-sky-600">Login</Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
