import Footer from "../Footer";
import Header from "../Header";
import { useLocation } from "react-router-dom";
import {
  faArrowLeft,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { client_department_microapps } from "../CardData";
import axios from "axios";
import { useAppData } from "../../Providers/AppDataProvider";
import { useNavigate } from "react-router-dom";
export default function MapMicroapps() {
  const location = useLocation();
  const details = location.state?.details;
  const token = localStorage.getItem("access");
  const depdetails = location.state?.depdetails;
  const [data, setData] = useState({ [depdetails?.department]: [] });
  const { currentUser } = useAppData();
  const navigate = useNavigate();

  const filteredData = client_department_microapps.find(
    (item) => item.departments === depdetails.department
  );

  console.log("In Map MicroApps", depdetails, filteredData);
  function toggleMicroapp(microapp, isChecked) {
    const department = depdetails?.department; // Get the current department
    if (!department) return; // Ensure department is valid

    setData((prevData) => {
      const existingMicroapps = prevData[department] || [];
      if (isChecked) {
        // Add the microapp if it's not already in the array
        return {
          ...prevData,
          [department]: [...existingMicroapps, microapp],
        };
      } else {
        // Remove the microapp from the array
        return {
          ...prevData,
          [department]: existingMicroapps.filter((app) => app !== microapp),
        };
      }
    });
  }

  function handleCheckboxChange(event, microapp) {
    toggleMicroapp(microapp, event.target.checked);
  }
  useEffect(() => {
    console.log("Data in Client Microapps", data);
  }, [data]);

  async function handleMapMicroapps() {
    try {
      console.log("Inside try");
      const response = await axios.post(
        "http://127.0.0.1:8000/clientmicroapps/",
        {
          emailid: details.emailid,
          apps: data,
          updatedby: currentUser.firstname,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Attach token in header
          },
        }
      );
      console.log("response in map", response);
    } catch (e) {}
    navigate("/departments/modules/mapdepartments/microapps", {
      state: { details: details },
    });
  }
  return (
    <>
      <Header />
      <div
        class="d-flex flex-column flex-column-fluid content"
        id="kt_content"
        style={{ paddingTop: "80px" }}
      >
        <div class="subheader subheader-transparent" id="kt_subheader">
          <div class="container-fluid">
            <div class="d-flex align-items-center mr-1 mt-2 mb-5">
              <div class="d-flex align-items-baseline flex-wrap mr-5">
                <div class="d-flex align-items-center text-dark font-weight-bold my-1 mr-3">
                  Department
                </div>

                <ul class="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold my-2 p-0">
                  <li class="breadcrumb-item">
                    <a class="text-muted">Modules</a>
                  </li>
                  <li class="breadcrumb-item">
                    <a class="text-muted">Map Microapp</a>
                  </li>
                  <li class="breadcrumb-item">
                    <a class="text-muted">{details.entityName}</a>
                  </li>
                  <li class="breadcrumb-item">
                    <a href="#" class="text-muted">
                      Settings
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="d-flex flex-column-fluid">
          <div class="container-fluid">
            <div class="card card-custom gutter-b">
              <div class="d-flex align-items-center justify-content-between flex-wrap p-5 border-bottom">
                <div class="d-flex align-items-center flex-wrap mr-2">
                  <h5 class="text-dark font-weight-bold mb-0">
                    {details.entityName} - Clients
                  </h5>
                </div>
                <div class="d-flex align-items-center">
                  <a
                    href="https://demolook.in/clarityboard/home/superadminclient"
                    class="btn btn-default ml-5 font-weight-bold"
                  >
                    <FontAwesomeIcon icon={faArrowLeft} />
                    Back
                  </a>
                  <div class="btn-group ml-2">
                    <a>
                      <button
                        type="button"
                        class="btn btn-primary font-weight-bold"
                        onClick={handleMapMicroapps}
                      >
                        Map Microapps
                      </button>
                    </a>
                  </div>
                </div>
              </div>
              <div class="card-body p-5">
                <div class="row">
                  {/* <div class="col-lg-6 col-lg-6 col-12">
                        <div class="row">
                            <div class="col-lg-4 col-lg-4 col-4 pt-4">
                                <label class="checkbox checkbox-square"> 
                                    <input type="checkbox"  onChange={(e) => handleCheckboxChange(e, "AddUser")}/><span></span>
                                    <h5 class="mt-2 p-5">Add Users</h5> 
                                </label>
                           </div>
                           <div class="col-lg-6 col-lg-6 col-8">
                                <div class="form-group mb-3">
                                    <label class="lbl-heading">Display Name<span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" name="address1" placeholder="Type here..."/>
                                </div>
                            </div>
                        </div>
                       </div> 
                       <div class="col-lg-6 col-lg-6 col-12">
                        <div class="row">
                           <div class="col-lg-4 col-lg-4 col-4 pt-4">
                                <label class="checkbox checkbox-square"> 
                                    <input type="checkbox"  onChange={(e) => handleCheckboxChange(e, "ViewUsers")}/><span></span>
                                    <h5 class="mt-2 p-5">View Users</h5> 
                                </label>
                           </div>
                           <div class="col-lg-6 col-lg-6 col-8">
                                <div class="form-group mb-3">
                                    <label class="lbl-heading">Display Name<span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" name="address1" placeholder="Type here..."/>
                                </div>
                            </div>
                        </div>
                       </div>
                       <div class="col-lg-6 col-lg-6 col-12">
                        <div class="row">
                           <div class="col-lg-4 col-lg-4 col-4 pt-4">
                                <label class="checkbox checkbox-square"> 
                                    <input type="checkbox"  onChange={(e) => handleCheckboxChange(e, "EditUsers")}/><span></span>
                                    <h5 class="mt-2 p-5">Edit Users</h5> 
                                </label>
                           </div>
                           <div class="col-lg-6 col-lg-6 col-8">
                                <div class="form-group mb-3">
                                    <label class="lbl-heading">Display Name<span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" name="address1" placeholder="Type here..."/>
                                </div>
                            </div>
                        </div>
                       </div>
                       <div class="col-lg-6 col-lg-6 col-12">
                        <div class="row">
                           <div class="col-lg-4 col-lg-4 col-4 pt-4">
                                <label class="checkbox checkbox-square"> 
                                    <input type="checkbox"  onChange={(e) => handleCheckboxChange(e, "AssignMicroapp")}/><span></span>
                                    <h5 class="mt-2 p-5">Assign Microapp</h5> 
                                </label>
                           </div>
                           <div class="col-lg-6 col-lg-6 col-8">
                                <div class="form-group mb-3">
                                    <label class="lbl-heading">Display Name<span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" name="address1" placeholder="Type here..."/>
                                </div>
                            </div>
                        </div>
                       </div>
                       <div class="col-lg-6 col-lg-6 col-12">
                        <div class="row">
                           <div class="col-lg-4 col-lg-4 col-4 pt-4">
                                <label class="checkbox checkbox-square"> 
                                    <input type="checkbox"  onChange={(e) => handleCheckboxChange(e, "CreateFormat")}/><span></span>
                                    <h5 class="mt-2 p-5">Create Format</h5> 
                                </label>
                           </div>
                           <div class="col-lg-6 col-lg-6 col-8">
                                <div class="form-group mb-3">
                                    <label class="lbl-heading">Display Name<span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" name="address1" placeholder="Type here..."/>
                                </div>
                            </div>
                        </div>
                       </div>
                       <div class="col-lg-6 col-lg-6 col-12">
                        <div class="row">
                           <div class="col-lg-4 col-lg-4 col-4 pt-4">
                                <label class="checkbox checkbox-square"> 
                                    <input type="checkbox"  onChange={(e) => handleCheckboxChange(e, "ViewFormat")}/><span></span>
                                    <h5 class="mt-2 p-5">View Format</h5> 
                                </label>
                           </div>
                           <div class="col-lg-6 col-lg-6 col-8">
                                <div class="form-group mb-3">
                                    <label class="lbl-heading">Display Name<span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" name="address1" placeholder="Type here..."/>
                                </div>
                            </div>
                        </div>
                       </div>
                       <div class="col-lg-6 col-lg-6 col-12">
                        <div class="row">
                           <div class="col-lg-4 col-lg-4 col-4 pt-4">
                                <label class="checkbox checkbox-square"> 
                                    <input type="checkbox"  onChange={(e) => handleCheckboxChange(e, "EditFormat")}/><span></span>
                                    <h5 class="mt-2 p-5">Edit Format</h5> 
                                </label>
                           </div>
                           <div class="col-lg-6 col-lg-6 col-8">
                                <div class="form-group mb-3">
                                    <label class="lbl-heading">Display Name<span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" name="address1" placeholder="Type here..."/>
                                </div>
                            </div>
                        </div>
                       </div>
                       <div class="col-lg-6 col-lg-6 col-12">
                        <div class="row">
                           <div class="col-lg-4 col-lg-4 col-4 pt-4">
                                <label class="checkbox checkbox-square"> 
                                    <input type="checkbox"  onChange={(e) => handleCheckboxChange(e, "Activate/DeactivateUser")}/><span></span>
                                    <h5 class="mt-2 p-5">Active / Deactive User</h5> 
                                </label>
                           </div>
                           <div class="col-lg-6 col-lg-6 col-8">
                                <div class="form-group mb-3">
                                    <label class="lbl-heading">Display Name<span class="text-danger">*</span></label>
                                    <input type="text" class="form-control" name="address1" placeholder="Type here..."/>
                                </div>
                            </div>
                        </div>
                       </div> */}
                  {Object.entries(filteredData)
                    .filter(([category]) => category !== "departments") // Exclude "departments"
                    .flatMap(([_, items]) =>
                      (Array.isArray(items) ? items : [items]).map((item) => (
                        <div className="col-lg-6 col-12" key={item}>
                          <div className="row">
                            <div className="col-lg-4 col-4 pt-4">
                              <label className="checkbox checkbox-square">
                                <input
                                  type="checkbox"
                                  onChange={(e) =>
                                    handleCheckboxChange(e, item)
                                  }
                                />
                                <span></span>
                                <h5 className="mt-2 p-5">
                                  {item.replace(/([A-Z])/g, " $1")}
                                </h5>
                              </label>
                            </div>
                            <div className="col-lg-6 col-8">
                              <div className="form-group mb-3">
                                <label className="lbl-heading">
                                  Display Name
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name={item}
                                  placeholder={`Enter ${item.replace(
                                    /([A-Z])/g,
                                    " $1"
                                  )}...`}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
