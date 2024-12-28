import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "../../Layout";
import Department from "./Department";
import { useAppData } from "../../Providers/AppDataProvider";
import ModulesPage from "../modules";
import Clientpage from "../clients";
import SettingsPage from "../settings";

const DepartmentPage = (props) => {
  const { getFormattedDepartments } = useAppData();
  const departments = getFormattedDepartments() || {};
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path=":email" element={<Department />} />

        <Route path="/settings/*" element={<SettingsPage />} />
        <Route path="/clients/*" element={<Clientpage />} />
        <Route path="/modules/*" element={<ModulesPage />} />
      </Route>
    </Routes>
  );
};

export default DepartmentPage;
