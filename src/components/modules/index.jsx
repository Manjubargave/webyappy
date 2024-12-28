import { Route, Routes } from "react-router-dom";
import Layout from "../../Layout";
import Modules from "./Modules";
import MapDepartments from "./MapDepartments";
import Microapps from "./Microapps";
import MapMicroapps from "./MapMicroapps";
import MapFields from "./MapFields";
import MappingFields from "./MappingFields";
import Map from "./Map";

export default function ModulesPage() {
  return (
    <Routes>
      <Route path="/" element={<Modules />} />
      <Route path="/" element={<Layout />}>
        <Route path="mapdepartments" element={<MapDepartments />} />
        <Route path="map" element={<Map />} />
        <Route path="mapdepartments/microapps" element={<Microapps />} />
        <Route
          path="mapdepartments/microapps/mapmicroapps"
          element={<MapMicroapps />}
        />
        <Route
          path="mapdepartments/microapps/mapmicroapps/mapfields"
          element={<MapFields />}
        />
        <Route
          path="mapdepartments/microapps/mapmicroapps/mapfields/mappingfields"
          element={<MappingFields />}
        />
      </Route>
    </Routes>
  );
}
