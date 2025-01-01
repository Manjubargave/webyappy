import React, { createContext, useState, useContext, useEffect } from "react";
import { fetchCurrentUser } from "../components/api";
import axios from "axios";
import { API_BASE_URL } from "../constants/constants";

const AppDataContext = createContext();

export const AppDataProvider = ({ children }) => {
  const [departments, setDepartments] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("access"));
  const [isClient, setIsClient] = useState(false);
  const [content, setContent] = useState("");
  const refreshToken = localStorage.getItem("refresh");

  useEffect(() => {
    console.log("Inside current user");

    const getCurrentUser = async () => {
      try {
        const data = await fetchCurrentUser(token);
        console.log("CurrentUser", data);
        setCurrentUser(data);
      } catch (e) {
        console.error("Error fetching the user:", e);
      }
    };
    if (token) {
      getCurrentUser();
    }
  }, [token]);

  useEffect(() => {
    const fetchClientDetails = async () => {
      const clientResponse = await axios.get(`${API_BASE_URL}/clientdetails/`, {
        params: { emailid: currentUser.username },
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Client Response", clientResponse);
      setIsClient(clientResponse.data.exists);
    };
    fetchClientDetails();
  }, [currentUser]);

  useEffect(() => {
    console.log("Inside departments useeffect");
    const fetchDepartments = async () => {
      if (currentUser) {
        console.log("Inside current user", isClient);
        if (!isClient) {
          console.log("Inside isClient is false");
          try {
            const response = await axios.get(
              "http://127.0.0.1:8000/assignmicroapps/",
              {
                params: { emailid: currentUser.username },
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            console.log("setting the departments");
            setDepartments(response.data); // Save the fetched departments
          } catch (error) {
            console.error("Error fetching departments:", error);
          }
        } else {
          console.log("inside isclient is true");
          try {
            const response = await axios.get(
              "http://127.0.0.1:8000/clientmicroapps/",
              {
                params: { emailid: currentUser.username },
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            console.log("setting the departments", response);
            setDepartments(response.data); // Save the fetched departments
          } catch (error) {
            console.error("Error fetching departments:", error);
          }
        }
      }
    };

    fetchDepartments();
  }, [currentUser, isClient]);
  // Empty dependency array ensures this runs once when the app loads
  const getFormattedDepartments = () => {
    if (departments) {
      const transformedData = departments.reduce(
        (result, { department, apps }) => {
          // Check if the department exists in the result
          if (!result[department]) {
            result[department] = { department, apps: [] };
          }
          // Add the app to the department's app list
          result[department].apps.push(apps);
          return result;
        },
        {}
      );

      return Object.values(transformedData);
    }
  };

  return (
    <AppDataContext.Provider
      value={{
        departments,
        setDepartments,
        currentUser,
        setCurrentUser,
        setToken,
        isClient,
        content,
        setContent,
        getFormattedDepartments,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => useContext(AppDataContext);
