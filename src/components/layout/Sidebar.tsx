import React from 'react';
import Link from 'next/link';

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: '📊' },
  { label: 'My Appointments', href: '/dashboard/appointments', icon: '📅' },
  { label: 'Medical Records', href: '/dashboard/records', icon: '📋' },
  { label: 'Prescriptions', href: '/dashboard/prescriptions', icon: '💊' },
  { label: 'Settings', href: '/dashboard/settings', icon: '⚙️' },
];

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-slate-50 border-r border-slate-200 hidden md:block min-h-[calc(100vh-65px)]">
      <div className="p-4">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
          Navigation
        </p>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <Link 
              key={item.label} 
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors"
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-slate-200">
        <div className="bg-white p-4 rounded-lg border border-sky-100 shadow-sm">
          <p className="text-sm font-semibold text-slate-800 mb-1">Need help?</p>
          <p className="text-xs text-slate-500 mb-3">Contact MedLink support for assistance.</p>
          <button className="w-full text-xs font-medium bg-sky-50 text-sky-600 py-2 rounded-md hover:bg-sky-100">
            Support Center
          </button>
        </div>
      </div>
    </aside>
  );
};
