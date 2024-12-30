import axios from 'axios';
import { API_BASE_URL } from '../constants/constants';

// Add the interceptor

const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) return null;

  try {
    const response = await axios.post(`${API_BASE_URL}/api/token/refresh/`, {
      refresh: refreshToken,
    });
    console.log("New Access Token:", response.data.access);
    return response.data.access;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
};

// Setup Axios Interceptor for 401 errors
export const setupInterceptors = (navigate) => {
  axios.interceptors.response.use(
    (response) => response, // Return response if it's successful

    async (error) => {
      const originalRequest = error.config;

      // Check if the error status is 401 and hasn't been retried yet
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const refreshToken = localStorage.getItem('refresh');
        const newAccessToken = await refreshAccessToken(refreshToken);

        if (newAccessToken) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
          localStorage.setItem('access', newAccessToken);
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

          // Retry the original request with the new access token
          return axios(originalRequest);
        } else {
          // If refreshing the token fails, clear tokens and redirect to login
          localStorage.removeItem('access');
          localStorage.removeItem('refresh');
          navigate('/');
          return Promise.reject(error);
        }
      }

      return Promise.reject(error);
    }
  );
};
