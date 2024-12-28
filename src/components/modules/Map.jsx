import Header from "../Header";
import Footer from "../Footer";
import "./Map.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useAppData } from "../../Providers/AppDataProvider";

export default function Map() {
  const [departments, setDepartments] = useState({
    settings: false,
    scoreboard: false,
    salesboard: false,
  });
  const location = useLocation();
  const client = location.state?.details;
  const token = localStorage.getItem("access");
  const { currentUser } = useAppData();
  console.log("Token in map", token);
  console.log("Client in map", client);
  console.log("Current User in map", currentUser);
  async function handleMapDepartments() {
    console.log("departments in map", departments);

    try {
      console.log("Inside try");
      const response = await axios.post(
        "http://127.0.0.1:8000/clientmicroapps/",
        {
          emailid: client.emailid,
          departments: departments,
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
    Navigate("/departments/modules/mapdepartments");
  }
  function handleCheckbox(value) {
    setDepartments((prev) => ({
      ...prev,
      [value]: !prev[value], // Toggle the current value
    }));
  }

  return (
    <>
      <Header />
      <div
        class="d-flex flex-column flex-column-fluid content"
        id="kt_content"
        style={{ paddingTop: "80px" }}
      >
        <div class="subheader subheader-transparent " id="kt_subheader">
          <div class="container-fluid">
            <div class="d-flex align-items-center mr-1 mt-2 mb-5">
              <div class="d-flex align-items-baseline flex-wrap mr-5">
                <div class="d-flex align-items-center text-dark font-weight-bold my-1 mr-3">
                  Department
                </div>

                <ul class="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold my-2 p-0">
                  <li class="breadcrumb-item">
                    <a
                      href="https://demolook.in/clarityboard/home/modules_super"
                      class="text-muted"
                    >
                      Modules
                    </a>
                  </li>
                  <li class="breadcrumb-item">
                    <a
                      href="https://demolook.in/clarityboard/home/mapdepartment"
                      class="text-muted"
                    >
                      Map Department
                    </a>
                  </li>
                  <li class="breadcrumb-item">
                    <a href="#" class="text-muted">
                      ABC Pvt. Ltd.
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
                    ABC Pvt. Ltd.{" "}
                  </h5>
                </div>
                <div class="d-flex align-items-center">
                  <a
                    href="https://demolook.in/clarityboard/home/mapdepartment"
                    class="btn btn-default ml-5 font-weight-bold"
                  >
                    <i class="la la-arrow-left"></i> Back
                  </a>
                  <div class="btn-group ml-2">
                    <a>
                      <button
                        type="button"
                        class="btn btn-primary font-weight-bold"
                        onClick={handleMapDepartments}
                      >
                        Map Departments
                      </button>
                    </a>
                  </div>
                </div>
              </div>
              <div class="card-body p-5">
                <div class="row">
                  <div class="col-lg-6 col-lg-6 col-12">
                    <div class="row">
                      <div class="col-lg-3 col-lg-3 col-4 pt-4">
                        <label class="checkbox checkbox-square">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckbox("settings")}
                          />
                          <span></span>
                          <h5 class="mt-2 p-5">Settings</h5>
                        </label>
                      </div>
                      <div class="col-lg-6 col-lg-6 col-8">
                        <div class="form-group mb-3">
                          <label class="lbl-heading">
                            Display Name<span class="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            name="address1"
                            placeholder="Type here..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 col-lg-6 col-12">
                    <div class="row">
                      <div class="col-lg-3 col-lg-3 col-4 pt-4">
                        <label class="checkbox checkbox-square">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckbox("scoreboard")}
                          />
                          <span></span>
                          <h5 class="mt-2 p-5">Scoreboard</h5>
                        </label>
                      </div>
                      <div class="col-lg-6 col-lg-6 col-8">
                        <div class="form-group mb-3">
                          <label class="lbl-heading">
                            Display Name<span class="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            name="address1"
                            placeholder="Type here..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-6 col-lg-6 col-12">
                    <div class="row">
                      <div class="col-lg-3 col-lg-3 col-4 pt-4">
                        <label class="checkbox checkbox-square">
                          <input
                            type="checkbox"
                            onChange={() => handleCheckbox("salesboard")}
                          />
                          <span></span>
                          <h5 class="mt-2 p-5">Salesboard</h5>
                        </label>
                      </div>
                      <div class="col-lg-6 col-lg-6 col-8">
                        <div class="form-group mb-3">
                          <label class="lbl-heading">
                            Display Name<span class="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            name="address1"
                            placeholder="Type here..."
                          />
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
      <Footer />
    </>
  );
}
