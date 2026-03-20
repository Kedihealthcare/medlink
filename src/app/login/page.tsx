'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const [email, setEmail] = useState('doctor@medlink.com');
  const [password, setPassword] = useState('password');
  const [formError, setFormError] = useState('');
  
  // React Query Integration!
  const { loginMutation } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!email || !password) {
      setFormError('Please fill out all fields.');
      return;
    }

    loginMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="mt-2 text-center text-3xl font-extrabold tracking-tight text-slate-900">
          Sign in to MedLink
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="px-4 py-8 sm:px-10 shadow-lg border-none ring-1 ring-slate-200">
          <form className="space-y-6" onSubmit={handleLogin}>
            <Input 
              label="Email address" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <Input 
              label="Password" 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {formError && (
              <p className="text-sm text-rose-600 font-medium">{formError}</p>
            )}
            
            {/* Show API Error state handled automatically by React Query */}
            {loginMutation.isError && (
              <div className="bg-rose-50 border border-rose-200 rounded-md p-3">
                <p className="text-sm text-rose-600 font-medium">
                  {/* Safely extract Axios err message */}
                  {(loginMutation.error as any)?.response?.data?.message || 'Invalid credentials'}
                </p>
              </div>
            )}

            <Button 
              type="submit" 
              variant="primary" 
              fullWidth 
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? 'Authenticating...' : 'Sign in'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
