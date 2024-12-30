
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import { API_BASE_URL } from '../constants/constants';

export const isTokenExpired = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // current time in seconds
    return decodedToken.exp < currentTime;
  } catch (error) {
    return true; // if decoding fails, assume the token is expired
  }
};

export async function renewAccessToken() {
    const refreshToken = localStorage.getItem('refresh');
  
    if (refreshToken) {
      try {
        const response = await axios.post(`${API_BASE_URL}/api/token/refresh/`, {
          refresh: refreshToken
        });
  
        // Store the new access token in localStorage
        localStorage.setItem('access', response.data.access);
        console.log("Access token renewed successfully");
  
        return response.data.access; // Return the new access token
      } catch (error) {
        console.error("Error renewing access token:", error);
        alert("Session expired. Please login again.");
        // Optionally, you can redirect the user to the login page here
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
      }
    } else {
      console.error("No refresh token available");
      alert("Please login again.");
    }
  }