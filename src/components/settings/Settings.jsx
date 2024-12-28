import "./settings.css";
import Header from "../Header";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
export default function Settings() {
  const navigate = useNavigate();
  return (
    <div className="d-flex flex-column flex-root">
      <div className="d-flex flex-row flex-column-fluid page">
        <div className="d-flex flex-column flex-row-fluid wrapper noprint2">
          <Header />
          <div
            class="d-flex flex-column flex-column-fluid content_settings"
            id="kt_content"
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
                <div class="row">
                  <div class="col-xl-4">
                    <div class="card card-custom gutter-b card-stretch">
                      <div class="card-body">
                        <div class="mt-0">
                          <strong class="text-dark font-weight-bold font-size-h4">
                            User Management
                          </strong>
                          <hr />
                        </div>
                        <div class="mt-2">
                          <div
                            onClick={() => {
                              navigate("/departments/settings/adduser");
                            }}
                            style={{ cursor: "pointer" }}
                          >
                            <a class="text-dark font-size-h6"> Add User</a>
                          </div>
                        </div>
                        <div class="mt-2">
                          <a
                            onClick={() => {
                              navigate("/departments/settings/viewusers");
                            }}
                            style={{ cursor: "pointer" }}
                            class="text-dark font-size-h6"
                          >
                            {" "}
                            <span>View Users</span>
                          </a>
                        </div>
                        <div class="mt-2">
                          <a
                            onClick={() => {
                              navigate("/departments/settings/editusers");
                            }}
                            style={{ cursor: "pointer" }}
                            class="text-dark font-size-h6"
                          >
                            {" "}
                            <span>Edit Users</span>
                          </a>
                        </div>
                        <div class="mt-2">
                          <a
                            onClick={() => {
                              navigate("/departments/settings/addmicroapps");
                            }}
                            style={{ cursor: "pointer" }}
                            class="text-dark font-size-h6"
                          >
                            {" "}
                            <span>Assign Microapps</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-4">
                    <div class="card card-custom gutter-b card-stretch">
                      <div class="card-body">
                        <div class="mt-0">
                          <strong class="text-dark font-weight-bold font-size-h4">
                            Masters
                          </strong>
                          <hr />
                        </div>
                        <div class="mt-2">
                          <a
                            onClick={() => {
                              navigate("/departments/settings/masters", {
                                state: { id: "dep_user" },
                              });
                            }}
                            class="text-dark font-size-h6"
                          >
                            {" "}
                            User Department
                          </a>
                        </div>
                        <div class="mt-2">
                          <a
                            onClick={() => {
                              navigate("/departments/settings/masters", {
                                state: { id: "source" },
                              });
                            }}
                            class="text-dark font-size-h6"
                          >
                            Source
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
