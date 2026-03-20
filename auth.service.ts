import api from '../lib/axios';

export const authService = {
  login: async (credentials: any) => {
    const { data } = await api.post('/auth/login', credentials);
    if (data.token) {
      localStorage.setItem('medlink_token', data.token);
      localStorage.setItem('medlink_user', JSON.stringify(data.user));
    }
    return data;
  },
  register: async (userData: any) => {
    const { data } = await api.post('/auth/register', userData);
    if (data.token) {
      localStorage.setItem('medlink_token', data.token);
      localStorage.setItem('medlink_user', JSON.stringify(data.user));
    }
    return data;
  },
  logout: () => {
    localStorage.removeItem('medlink_token');
    localStorage.removeItem('medlink_user');
    window.location.href = '/login';
  }
};
