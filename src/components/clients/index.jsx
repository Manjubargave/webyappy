import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "../../Layout";
import AddClient from "./AddClient";
import { useAppData } from "../../Providers/AppDataProvider";
import Clients from "./clients";
import ViewClients from "./ViewClients";
import EditClients from "./EditClients";
import View from "./View";

export default function Clientpage() {
  const { getFormattedDepartments } = useAppData();
  const departments = getFormattedDepartments() || {};
  return (
    <Routes>
      <Route path="/" element={<Clients />} />
      <Route path="/" element={<Layout />}>
        <Route path="addclient" element={<AddClient />} />
        <Route
          path="viewclients"
          element={
            departments.some(
              (d) =>
                d.department === "clients" && d.apps.includes("viewClients")
            ) ? (
              <ViewClients />
            ) : (
              <Navigate to="/unauthorized" />
            )
          }
        />
        <Route path="editclients" element={<EditClients />} />
        <Route path="viewclients/view" element={<View />} />
      </Route>
    </Routes>
  );
}
