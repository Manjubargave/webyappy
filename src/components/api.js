import axios from 'axios';
import { API_BASE_URL } from '../constants/constants';

// const API_BASE_URL = 'http://127.0.0.1:8000';


export const fetchCurrentUser = async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/currentuser/`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching the user:", error);
      throw error;
    }
  };

// Function to fetch business data by email ID
export const fetchBusinessData = async (token, emailid) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/businessid/`, {
        params: { emailid },
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log("res",response.data)
      return response.data;
    } catch (error) {
      console.error('Error fetching business data:', error);
      throw error;
    }
  };

  export const fetchMasters=async(token,businessid,mastersid)=>{
    
        try {
            const response = await axios.get(`${API_BASE_URL}/masters/`, {
              params: { businessid,mastersid },
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            });
           
            return response.data;
          } catch (error) {
            console.error('Error fetching business data:', error);
            throw error;
          }
    
  }
 