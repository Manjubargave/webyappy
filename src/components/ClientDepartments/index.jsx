import { Route, Routes } from "react-router-dom";
import Layout from "../../Layout";
import ClientDepartments from "./ClientDepartments";

export default function ClientDepartmentsPage() {
  return (
    <Routes>
      <Route path="/" element={<ClientDepartments />} />
      <Route path="/" element={<Layout />}>
        <Route path="settings" element={<ClientSettings />} />
        <Route path="settings/addclient" element={<SecAddClient />} />
      </Route>
    </Routes>
  );
}
