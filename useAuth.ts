import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import api from '../lib/axios';

export const useAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: async (credentials: any) => {
      const { data } = await api.post('/auth/login', credentials);
      return data;
    },
    onSuccess: (data) => {
      // 1. Store the token securely
      localStorage.setItem('medlink_token', data.access_token);
      localStorage.setItem('medlink_user', JSON.stringify(data.user));
      
      // 2. Invalidate overarching caching scopes
      queryClient.invalidateQueries({ queryKey: ['user'] });
      
      // 3. Re-route appropriately
      const dashRoute = data.user.role === 'DOCTOR' ? '/dashboard/doctor' : '/dashboard/patient';
      router.push(dashRoute);
    },
  });

  const logout = () => {
    localStorage.removeItem('medlink_token');
    localStorage.removeItem('medlink_user');
    queryClient.clear();
    router.push('/');
  };

  const getUser = () => {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('medlink_user');
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  };

  return {
    loginMutation,
    logout,
    user: getUser(),
  };
};
