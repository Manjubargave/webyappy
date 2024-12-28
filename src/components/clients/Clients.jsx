import Footer from "../Footer";
import Header from "../Header";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppData } from "../../Providers/AppDataProvider";
import { findAssignedDepartmentSections } from "../helper";
import { useEffect, useState } from "react";

const capitalizeWords = (str) => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space before uppercase letters
    .replace(/\b\w/g, (char) => char.toUpperCase());
};
export default function Clients() {
  const navigate = useNavigate();
  const { departments } = useAppData();
  const [formattedArray, setFormattedArray] = useState([]);
  const [clientApps, setClientApps] = useState([]);
  const [results, setResults] = useState([]);
  console.log("departments in client", departments);
  // useEffect(()=>{
  //             if(departments.length > 0){
  //               const transformedData = departments.reduce((result, { department, apps }) => {
  //                 // Check if the department exists in the result
  //                 if (!result[department]) {
  //                   result[department] = { department, apps: [] };
  //                 }
  //                 // Add the app to the department's app list
  //                 result[department].apps.push(apps);
  //                 return result;
  //               }, {});

  //             const array = Object.values(transformedData);
  //             console.log("array",array)
  //         setFormattedArray(array);

  //         const clientAppsList = array.find(item => item.department === "clients")?.apps || [];
  //         console.log("clientAppsList",clientAppsList)
  //         setClientApps(clientAppsList);

  //         // Set results dynamically based on clientApps
  //         const assignedSections = findAssignedDepartmentSections(clientAppsList);
  //         console.log("assignedSections",assignedSections)
  //         setResults(assignedSections);

  //             }

  // },[departments])

  useEffect(() => {
    if (departments.length > 0) {
      // Process and transform departments data
      const transformedData = departments.reduce(
        (result, { department, apps }) => {
          if (!result[department]) {
            result[department] = { department, apps: [] };
          }
          result[department].apps.push(apps);
          return result;
        },
        {}
      );

      const array = Object.values(transformedData);
      console.log("array", array);

      // Derive client-specific apps and results
      const clientAppsList =
        array.find((item) => item.department === "clients")?.apps.flat() || [];
      console.log("clientAppsList", clientAppsList);

      const assignedSections = findAssignedDepartmentSections(clientAppsList);
      console.log("assignedSections", assignedSections);

      // Update all related states together
      setFormattedArray(array);
      setClientApps(clientAppsList);
      setResults(assignedSections);
    }
  }, [departments]);

  console.log("Results outside useEffect", results);

  return (
    <>
      <div
        class="d-flex flex-column flex-column-fluid content"
        id="kt_content"
        style={{ paddingTop: "80px" }}
      >
        <div class="subheader subheader-transparent" id="kt_subheader">
          <div class="container-fluid">
            <div class="d-flex align-items-center mr-1 mt-2 mb-5">
              <div class="d-flex align-items-baseline flex-wrap mr-5">
                <div
                  class="d-flex align-items-center text-dark font-weight-bold my-1 mr-3"
                  style={{ fontSize: "15px" }}
                >
                  Department
                </div>
                <ul class="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold my-2 p-0">
                  <li class="breadcrumb-item">
                    <a class="text-muted">Clients</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex flex-column-fluid">
          <div class="container-fluid">
            <div class="row">
              <div class="col-xl-4">
                <div class="card card-custom gutter-b card-stretch">
                  <div class="card-body">
                    {results.map((result, index) => (
                      <div key={index} className="department-section">
                        {/* Display the department and section names dynamically */}
                        <div className="mt-0">
                          <strong className="text-dark font-weight-bold font-size-h4">
                            {capitalizeWords(result.section)}
                          </strong>
                          <hr />
                        </div>

                        {/* Display each app as a clickable item */}
                        {result.apps.map((app, appIndex) => (
                          <div
                            key={appIndex}
                            className="mt-2"
                            style={{ cursor: "pointer" }}
                          >
                            <div
                              onClick={() =>
                                navigate(
                                  `/departments/${result.department}/${app
                                    .toLowerCase()
                                    .replace(/\s+/g, "")}`
                                )
                              }
                              className="text-dark font-size-h6"
                            >
                              {capitalizeWords(app)}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}
