import "./AssignMicroapps.css";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AssignMicroapps() {
  const navigate = useNavigate();
  const [checkboxes, setCheckboxes] = useState({
    clients: {
      checked: false,
      microapps: { addClient: false, viewClients: false, editClients: false },
    },
    modules: {
      checked: false,
      microapps: {
        mapDepartments: false,
        mapMicroapps: false,
        mapFields: false,
        mapRecommendations: false,
        viewDetailPageFormats: false,
        quotationFormats: false,
      },
    },
    settings: {
      checked: false,
      microapps: {
        addUser: false,
        viewUsers: false,
        editUsers: false,
      },
    },
  });

  const updateCheckboxes = (data) => {
    const updatedCheckboxes = { ...checkboxes };

    data.forEach((item) => {
      if (updatedCheckboxes[item.department]) {
        updatedCheckboxes[item.department].checked = true;
        updatedCheckboxes[item.department].microapps[item.apps] = true;
      }
    });

    console.log("UC", updatedCheckboxes);
    setCheckboxes(updatedCheckboxes);
  };

  //const [microapps,setMicroapps]=useState([])
  const [isChecked, setIsChecked] = useState(false);
  const [isAssign, setIsAssign] = useState(false);
  const [selectedMicroapps, setSelectedMicroapps] = useState([]);
  const location = useLocation();
  const user = location.state?.user;
  const token = localStorage.getItem("access");

  function formattedValue(obj) {
    const formattedMicroapps = [];
    const keys = Object.keys(obj);
    keys.forEach((depkey) => {
      const department = depkey;
      const microapps = obj[depkey].microapps;
      const trueMicroapps = Object.keys(microapps).filter(
        (microappKey) => microapps[microappKey]
      );
      trueMicroapps.forEach((key) => {
        formattedMicroapps.push({ department: depkey, microapps: key });
      });
    });
    return formattedMicroapps;
  }
  const handleParentChange = (section) => {
    console.log("Inside handle parentchange");
    // console.log(parentCheckboxes[section])
    const isChecked = !checkboxes[section].checked;
    setCheckboxes({
      ...checkboxes,
      [section]: {
        ...checkboxes[section],
        checked: isChecked,
      },
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/assignmicroapps/",
          {
            params: { emailid: user.emailid },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach token in header
            },
          }
        );

        //setSelectedMicroapps(response.data);
        //setMicroapps(response.data)
        updateCheckboxes(response.data);
        console.log("Selected Microapps", response.data);
        // console.log(selectedMicroapps[0].emailid)
        // console.log(selectedMicroapps.some((obj)=>obj.emailid === user.emailid && obj.apps ==="Add Clients")) // Adjust based on your API response structure
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleCheckboxChange = (parent, microapp) => {
    setIsAssign(true);

    setCheckboxes({
      ...checkboxes,
      [parent]: {
        ...checkboxes[parent],
        microapps: {
          ...checkboxes[parent].microapps,
          [microapp]: !checkboxes[parent].microapps[microapp],
        },
      },
    });

    console.log("After action", checkboxes[parent]);
  };
  async function handleAssign() {
    console.log("Assign", checkboxes);
    const data = formattedValue(checkboxes);
    console.log("Datat", data);
    try {
      await axios.post(
        "http://127.0.0.1:8000/assignmicroapps/",
        {
          emailid: user.emailid,
          data: data,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token in header
          },
        }
      );
    } catch (error) {
      console.error("Error saving options:", error);
    }
    navigate("/departments/settings/addmicroapps");
  }
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
                <div class="d-flex align-items-center text-dark font-weight-bold my-1 mr-3">
                  Department
                </div>

                <ul class="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold my-2 p-0">
                  <li class="breadcrumb-item">
                    <a
                      href="https://demolook.in/clarityboard/home/settings_super"
                      class="text-muted"
                    >
                      Setting
                    </a>
                  </li>
                  <li class="breadcrumb-item">
                    <a
                      href="https://demolook.in/clarityboard/home/assignmicroapp_super"
                      class="text-muted"
                    >
                      Assign Microapp
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="d-flex flex-column-fluid">
          <div class="container-fluid">
            <div class="card card-custom bg_trans">
              <div class="d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap p-5 border-bottom">
                <div class="d-flex align-items-center flex-wrap mr-2">
                  <h5 class="text-dark font-weight-bold mt-2 mb-2 mr-5">
                    Assign Micro App
                  </h5>
                </div>

                <div class="d-flex align-items-center">
                  <a class="btn btn-default font-weight-bold">
                    <i class="la la-arrow-left"></i> Back
                  </a>
                  <div class="btn-group ml-2">
                    <a>
                      <button
                        type="button"
                        class="btn btn-primary font-weight-bold"
                        onClick={handleAssign}
                      >
                        Assign
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="cards card-customd gutter-b">
              <div class="card-bodys pt-5">
                <div class="row">
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                    <div
                      class="card card-custom gutter-b card-stretch"
                      style={{
                        backgroundPosition: "right top",
                        backgroundSize: "30% auto",
                        backgroundRepeat: "no-repeat",
                        backgroundImage:
                          "url(assets/media/svg/shapes/abstract-4.svg)",
                      }}
                    >
                      <div class="card-body">
                        <div class="mt-0">
                          <div class="checkbox-inline">
                            <label class="checkbox checkbox-square">
                              <input
                                type="checkbox"
                                name="Checkboxes13_1"
                                onChange={() => handleParentChange("clients")}
                                checked={checkboxes["clients"].checked}
                              />
                              <span></span>
                              <strong class="text-dark font-weight-bold text-hover-primary font-size-h4">
                                Clients
                              </strong>
                            </label>
                          </div>
                          <hr />

                          <div class="row">
                            <div class="col-lg-4 col-md-4 col-sm-12">
                              <div class="checkbox-inline">
                                <label class="checkbox checkbox-square">
                                  <input
                                    type="checkbox"
                                    name="Checkboxes13_1"
                                    checked={
                                      checkboxes["clients"]["microapps"]
                                        .addClient
                                    }
                                    value="Add Clients"
                                    onChange={() =>
                                      handleCheckboxChange(
                                        "clients",
                                        "addClient"
                                      )
                                    }
                                    disabled={!checkboxes["clients"].checked}
                                  />
                                  <span></span>
                                  <p class="text-dark font-size-h6 mb-0">
                                    Add Clients
                                  </p>
                                </label>
                              </div>
                            </div>

                            <div class="col-lg-4 col-md-4 col-sm-12">
                              <div class="checkbox-inline">
                                <label class="checkbox checkbox-square">
                                  <input
                                    type="checkbox"
                                    name="Checkboxes13_1"
                                    value="View Clients"
                                    checked={
                                      checkboxes["clients"]["microapps"]
                                        .viewClients
                                    }
                                    onChange={() =>
                                      handleCheckboxChange(
                                        "clients",
                                        "viewClients"
                                      )
                                    }
                                    disabled={!checkboxes["clients"].checked}
                                  />
                                  <span></span>
                                  <p class="text-dark font-size-h6 mb-0">
                                    View Clients
                                  </p>
                                </label>
                              </div>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-12">
                              <div class="checkbox-inline">
                                <label class="checkbox checkbox-square">
                                  <input
                                    type="checkbox"
                                    name="Checkboxes13_1"
                                    checked={
                                      checkboxes["clients"]["microapps"]
                                        .editClients
                                    }
                                    onChange={() =>
                                      handleCheckboxChange(
                                        "clients",
                                        "editClients"
                                      )
                                    }
                                    value="Edit Clients"
                                    disabled={!checkboxes["clients"].checked}
                                  />
                                  <span></span>
                                  <p class="text-dark font-size-h6 mb-0">
                                    Edit Clients
                                  </p>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                    <div
                      class="card card-custom gutter-b card-stretch"
                      style={{
                        backgroundPosition: "right top",
                        backgroundSize: "30% auto",
                        backgroundRepeat: "no-repeat",
                        backgroundImage:
                          "url(assets/media/svg/shapes/abstract-4.svg)",
                      }}
                    >
                      <div class="card-body">
                        <div class="mt-0">
                          <div class="checkbox-inline">
                            <label class="checkbox checkbox-square">
                              <input
                                type="checkbox"
                                name="Checkboxes13_1"
                                onChange={() => handleParentChange("modules")}
                                checked={checkboxes["modules"].checked}
                              />
                              <span></span>
                              <strong class="text-dark font-weight-bold text-hover-primary font-size-h4">
                                Modules
                              </strong>
                            </label>
                          </div>
                          <hr />

                          <div class="row">
                            <div class="col-lg-4 col-md-4 col-sm-12">
                              <div class="checkbox-inline">
                                <label class="checkbox checkbox-square">
                                  <input
                                    type="checkbox"
                                    name="Checkboxes13_1"
                                    value="Map Department"
                                    checked={
                                      checkboxes["modules"]["microapps"]
                                        .mapDepartments
                                    }
                                    onChange={() =>
                                      handleCheckboxChange(
                                        "modules",
                                        "mapDepartments"
                                      )
                                    }
                                    disabled={!checkboxes["modules"].checked}
                                  />
                                  <span></span>
                                  <p class="text-dark font-size-h6 mb-0">
                                    Map Department
                                  </p>
                                </label>
                              </div>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-12">
                              <div class="checkbox-inline">
                                <label class="checkbox checkbox-square">
                                  <input
                                    type="checkbox"
                                    name="Checkboxes13_1"
                                    value="Map Microapp"
                                    checked={
                                      checkboxes["modules"]["microapps"]
                                        .mapMicroapps
                                    }
                                    onChange={() =>
                                      handleCheckboxChange(
                                        "modules",
                                        "mapMicroapps"
                                      )
                                    }
                                    disabled={!checkboxes["modules"].checked}
                                  />
                                  <span></span>
                                  <p class="text-dark font-size-h6 mb-0">
                                    Map Microapp
                                  </p>
                                </label>
                              </div>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-12">
                              <div class="checkbox-inline">
                                <label class="checkbox checkbox-square">
                                  <input
                                    type="checkbox"
                                    name="Checkboxes13_1"
                                    onChange={() =>
                                      handleCheckboxChange(
                                        "modules",
                                        "mapFields"
                                      )
                                    }
                                    checked={
                                      checkboxes["modules"]["microapps"]
                                        .mapFields
                                    }
                                    value="Map Fields/Cols"
                                    disabled={!checkboxes["modules"].checked}
                                  />
                                  <span></span>
                                  <p class="text-dark font-size-h6 mb-0">
                                    Map Fields/Cols
                                  </p>
                                </label>
                              </div>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-12">
                              <div class="checkbox-inline">
                                <label class="checkbox checkbox-square">
                                  <input
                                    type="checkbox"
                                    name="Checkboxes13_1"
                                    onChange={() =>
                                      handleCheckboxChange(
                                        "modules",
                                        "mapRecommendations"
                                      )
                                    }
                                    checked={
                                      checkboxes["modules"]["microapps"]
                                        .mapRecommendations
                                    }
                                    value="Map Recommendations"
                                    disabled={!checkboxes["modules"].checked}
                                  />
                                  <span></span>
                                  <p class="text-dark font-size-h6 mb-0">
                                    Map Recommendations
                                  </p>
                                </label>
                              </div>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-12">
                              <div class="checkbox-inline">
                                <label class="checkbox checkbox-square">
                                  <input
                                    type="checkbox"
                                    name="Checkboxes13_1"
                                    onChange={() =>
                                      handleCheckboxChange(
                                        "modules",
                                        "viewDetailPageFormats"
                                      )
                                    }
                                    checked={
                                      checkboxes["modules"]["microapps"]
                                        .viewDetailPageFormats
                                    }
                                    value="View Detail Page Formats"
                                    disabled={!checkboxes["modules"].checked}
                                  />
                                  <span></span>
                                  <p class="text-dark font-size-h6 mb-0">
                                    View Details Page Formats
                                  </p>
                                </label>
                              </div>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-12">
                              <div class="checkbox-inline">
                                <label class="checkbox checkbox-square">
                                  <input
                                    type="checkbox"
                                    name="Checkboxes13_1"
                                    onChange={() =>
                                      handleCheckboxChange(
                                        "modules",
                                        "quotationFormats"
                                      )
                                    }
                                    checked={
                                      checkboxes["modules"]["microapps"]
                                        .quotationFormats
                                    }
                                    value="Quotation Formats"
                                    disabled={!checkboxes["modules"].checked}
                                  />
                                  <span></span>
                                  <p class="text-dark font-size-h6 mb-0">
                                    Quotation Formats
                                  </p>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                    <div
                      class="card card-custom gutter-b card-stretch"
                      style={{
                        backgroundPosition: "right top",
                        backgroundSize: "30% auto",
                        backgroundRepeat: "no-repeat",
                        backgroundImage:
                          "url(assets/media/svg/shapes/abstract-4.svg)",
                      }}
                    >
                      <div class="card-body">
                        <div class="mt-0">
                          <div class="checkbox-inline">
                            <label class="checkbox checkbox-square">
                              <input
                                type="checkbox"
                                name="Checkboxes13_1"
                                onChange={() => handleParentChange("settings")}
                                checked={checkboxes["settings"].checked}
                              />
                              <span></span>
                              <strong class="text-dark font-weight-bold text-hover-primary font-size-h4">
                                Settings
                              </strong>
                            </label>
                          </div>
                          <hr />

                          <div class="row">
                            <div class="col-lg-4 col-md-4 col-sm-12">
                              <div class="checkbox-inline">
                                <label class="checkbox checkbox-square">
                                  <input
                                    type="checkbox"
                                    name="Checkboxes13_1"
                                    onChange={() =>
                                      handleCheckboxChange(
                                        "settings",
                                        "addUser"
                                      )
                                    }
                                    checked={
                                      checkboxes["settings"]["microapps"]
                                        .addUser
                                    }
                                    value="Add User"
                                    disabled={!checkboxes["settings"].checked}
                                  />
                                  <span></span>
                                  <p class="text-dark font-size-h6 mb-0">
                                    Add Users
                                  </p>
                                </label>
                              </div>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-12">
                              <div class="checkbox-inline">
                                <label class="checkbox checkbox-square">
                                  <input
                                    type="checkbox"
                                    name="Checkboxes13_1"
                                    onChange={() =>
                                      handleCheckboxChange(
                                        "settings",
                                        "viewUsers"
                                      )
                                    }
                                    checked={
                                      checkboxes["settings"]["microapps"]
                                        .viewUsers
                                    }
                                    value="Map "
                                    disabled={!checkboxes["settings"].checked}
                                  />
                                  <span></span>
                                  <p class="text-dark font-size-h6 mb-0">
                                    View Users
                                  </p>
                                </label>
                              </div>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-12">
                              <div class="checkbox-inline">
                                <label class="checkbox checkbox-square">
                                  <input
                                    type="checkbox"
                                    name="Checkboxes13_1"
                                    onChange={() =>
                                      handleCheckboxChange(
                                        "settings",
                                        "editUsers"
                                      )
                                    }
                                    checked={
                                      checkboxes["settings"]["microapps"]
                                        .editUsers
                                    }
                                    value="Map Recommendations"
                                    disabled={!checkboxes["settings"].checked}
                                  />
                                  <span></span>
                                  <p class="text-dark font-size-h6 mb-0">
                                    Edit Users
                                  </p>
                                </label>
                              </div>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-12">
                              <div class="checkbox-inline">
                                <label class="checkbox checkbox-square">
                                  <input
                                    type="checkbox"
                                    name="Checkboxes13_1"
                                  />
                                  <span></span>
                                  <p class="text-dark font-size-h6 mb-0">
                                    Assign Microapp
                                  </p>
                                </label>
                              </div>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-12">
                              <div class="checkbox-inline">
                                <label class="checkbox checkbox-square">
                                  <input
                                    type="checkbox"
                                    name="Checkboxes13_1"
                                  />
                                  <span></span>
                                  <p class="text-dark font-size-h6 mb-0">
                                    Source Master
                                  </p>
                                </label>
                              </div>
                            </div>
                            <div class="col-lg-4 col-md-4 col-sm-12">
                              <div class="checkbox-inline">
                                <label class="checkbox checkbox-square">
                                  <input
                                    type="checkbox"
                                    name="Checkboxes13_1"
                                  />
                                  <span></span>
                                  <p class="text-dark font-size-h6 mb-0">
                                    User Department Master
                                  </p>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
