import { useQuery } from '@tanstack/react-query';
import api from '../lib/axios';

export const useAppointments = () => {
  return useQuery({
    queryKey: ['appointments'],
    queryFn: async () => {
      const { data } = await api.get('/appointments');
      return data;
    },
    // Prevent refetching aggressively for better UX unless absolutely needed
    staleTime: 5000 * 60, 
    retry: 1, // Fail fast on 401s
  });
};
