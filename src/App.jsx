import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import DepartmentPage from "./components/Department";

import Profile from "./components/Profile";

import ChangePassword from "./components/ChangePassword";

import QuickActions from "./components/QuickActions";

import Recommendations from "./components/Recommendations";

import { setupInterceptors } from "./components/axiosSetup";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Unauthorized from "./components/Unauthorized";
import { useAppData } from "./Providers/AppDataProvider";

import ClientDepartments from "./components/ClientDepartments/ClientDepartments";
import ClientSettings from "./components/ClientDepartments/ClientSettings";

import SecAddClient from "./components/secclients/SecAddClient";
import ClientDepartmentsPage from "./components/ClientDepartments";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    setupInterceptors(navigate); // Pass navigate to setupInterceptors
  }, [navigate]);
  console.log("***App***");

  const appData = useAppData();
  console.log("appData", appData);
  const { isClient } = useAppData();
  let formattedArray = [];

  return (
    <Routes>
      <Route exact path="/" element={<Login />}></Route>
      <Route path="/departments/*" element={<DepartmentPage />}></Route>

      <Route path="/profile" element={<Profile />} />
      <Route path="/quickactions" element={<QuickActions />} />
      <Route path="/changepassword" element={<ChangePassword />} />

      <Route
        path="/departments/recommendations"
        element={<Recommendations />}
      />

      <Route path="/clientdepartments/*" element={<ClientDepartmentsPage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
}

export default App;
