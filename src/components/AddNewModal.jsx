import React, { useState } from "react";
import axios from "axios";
import Footer from "./Footer";
import Header from "./Header";
import "./AddNewModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { API_BASE_URL } from "../constants/constants";

import { fetchCurrentUser, fetchBusinessData } from "./api";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddNewModal() {
  const [departments, setDepartments] = useState([{ title: "" }]);
  const token = localStorage.getItem("access");
  const [currentUser, setCurrentUser] = useState();
  const [businessid, setBusinessid] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state.id;
  const name = location.state.name;

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const data = await fetchCurrentUser(token);
        console.log("CurrentUser", data);
        setCurrentUser(data);
      } catch (e) {
        console.error("Error fetching the user:", e);
      }
    };
    getCurrentUser();
  }, [token]);

  //Function to handle Input change
  const handleInputChange = (index, event) => {
    const values = [...departments];
    values[index][event.target.name] = event.target.value;
    setDepartments(values);
  };

  const handleAddMore = () => {
    setDepartments([...departments, { title: "" }]);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the departments array to the Django backend
      const response = await axios.post(`${API_BASE_URL}/masters/`, {
        businessid: currentUser.businessId,
        fieldId: id,
        fieldValue: departments,
        addedby: currentUser.firstname,
      });

      console.log("Response from Django:", response.data);
    } catch (error) {
      console.error("Error posting the data to Django:", error);
    }
    navigate("/departments/settings/masters", { state: { id: id } });
  };
  return (
    <>
      <Header />
      <div
        class="d-flex flex-column flex-column-fluid content"
        style={{ paddingTop: "80px" }}
        id="kt_content"
      >
        <div class="subheader subheader-transparent" id="kt_subheader">
          <div class="container-fluid">
            <div class="d-flex align-items-baseline flex-wrap mr-1 mt-2 mb-5">
              <div class="d-flex align-items-center text-dark font-weight-bold my-1 mr-3">
                Department
              </div>

              <ul class="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold my-2 p-0">
                <li class="breadcrumb-item">
                  <a class="text-muted">Settings</a>
                </li>
                <li class="breadcrumb-item">
                  <a class="text-muted">{name + " Master"}</a>
                </li>
                <li class="breadcrumb-item">
                  <a href="#" class="text-muted">
                    Add New
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="d-flex flex-column-fluid">
          <div class="container-fluid">
            <div class="card card-custom gutter-b">
              <div class="d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap p-5 border-bottom">
                <div class="d-flex align-items-center flex-wrap mr-2">
                  <h5 class="text-dark font-weight-bold mt-2 mb-2 mr-5">
                    {"Add " + name}
                  </h5>
                </div>

                <div class="d-flex align-items-center">
                  <a class="btn btn-default font-weight-bold">
                    <i class="la la-arrow-left"></i> Back
                  </a>

                  <div class="btn-group ml-2">
                    <a>
                      <button
                        onClick={handleSubmit}
                        type="button"
                        class="btn btn-primary font-weight-bold"
                      >
                        Submit
                      </button>
                    </a>
                  </div>
                </div>
              </div>
              <div class="card-body p-5">
                <div class="full_down_forms">
                  <div class="inner_down_forms">
                    <div class="ctm_repeater">
                      <div
                        data-repeater-list="category"
                        class="inner_down_forms"
                      >
                        {departments.map((department, index) => (
                          <div
                            data-repeater-item=""
                            class="border-bottom form-group mb-3 row align-items-center parent"
                          >
                            <div class="col-lg-4 col-md-4 col-12">
                              <div key={index} class="form-group">
                                <label class="lbl-heading">
                                  {name + " Title"}{" "}
                                </label>
                                <input
                                  type="text"
                                  name="title"
                                  class="form-control"
                                  value={department.title}
                                  placeholder="Type here..."
                                  onChange={(event) =>
                                    handleInputChange(index, event)
                                  }
                                />
                              </div>
                            </div>
                            <div class="col-lg-1 col-md-1 col-12">
                              <a className="btn btn-light-danger btn-icon">
                                {" "}
                                <FontAwesomeIcon icon={faTrash} />{" "}
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div class="add-more-btn">
                        <button
                          onClick={handleAddMore}
                          class="btn btn-success font-weight-bolder font-size-sm"
                        >
                          <i class="la la-plus icon-md"></i> Add More
                        </button>
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
