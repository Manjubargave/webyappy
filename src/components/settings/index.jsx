import Settings from "./Settings";
import Layout from "../../Layout";
import AddUser from "./AddUser";
import ViewUsers from "./ViewUsers";
import EditUsers from "./EditUsers";
import Masters from "./Masters";
import AddMicroapps from "./AssignMicroapps/AddMicroapps";
import AssignMicroapps from "./AssignMicroapps";
import AddNewModal from "../AddNewModal";
import { Route, Routes } from "react-router-dom";

export default function SettingsPage() {
  return (
    <Routes>
      <Route path="/" element={<Settings />} />
      <Route path="/" element={<Layout />}>
        <Route path="adduser" element={<AddUser />} />
        <Route path="viewusers" element={<ViewUsers />} />
        <Route path="editusers" element={<EditUsers />} />
        <Route path="addmicroapps" element={<AddMicroapps />} />
        <Route
          path="addmicroapps/assignmicroapps"
          element={<AssignMicroapps />}
        />
        <Route path="masters" element={<Masters />} />
        <Route path="masters/addnew" element={<AddNewModal />} />
      </Route>
    </Routes>
  );
}
