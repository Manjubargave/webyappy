import Footer from "../Footer";
import Header from "../Header";
import "./MappingFields.css";
import { useState } from "react";
import { useAppData } from "../../Providers/AppDataProvider";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function MappingFields() {
  const location = useLocation();
  const microapp = location.state?.item;
  const details = location.state?.details;
  const token = localStorage.getItem("access");
  console.log("microapp", microapp, "Details", details);

  const fields = [
    { id: "client_id", label: "Client ID" },
    { id: "source", label: "Source" },
    { id: "comp_name", label: "Company Name" },
    { id: "gst_no", label: "GST Number" },
    { id: "ent_type", label: "EntityType" },
    { id: "address", label: "Address" },
    { id: "city", label: "City" },
    { id: "state", label: "State" },
    { id: "pincode", label: "Pincode" },
    { id: "country", label: "Country" },
    { id: "country_code", label: "Country Code" },
    { id: "bus_activity", label: "Business Activity" },
    { id: "turnover", label: "Turn Over" },
    { id: "emp_size", label: "Employee Size" },
    { id: "website", label: "Website" },
    { id: "est_year", label: "Established Year" },
    { id: "type", label: "Type" },
    { id: "lists", label: "Lists" },
    { id: "zone", label: "Zone" },
    { id: "acc_man", label: "Account Manager" },
    { id: "comp_logo", label: "Company Logo" },
    { id: "lead_stage", label: "Lead Stage" },
    { id: "gst_type", label: "GST Type" },
    { id: "firstname", label: "Firstname" },
    { id: "lastname", label: "Lastname" },
    { id: "contactno", label: "Contact No" },
    { id: "alt_contactno", label: "Alt.Contact No" },
    { id: "email", label: "Email" },
    { id: "alt_email", label: "Alt.Email" },
    { id: "designation", label: "Designation" },
    { id: "department", label: "Department" },
    { id: "hierarchy", label: "Hierarchy" },
    { id: "dob", label: "Date of Birth" },
    { id: "anniversary_date", label: "Anniversary Date" },
  ];
  const [selectedFields, setSelectedFields] = useState([]);
  const { currentUser } = useAppData();

  const handleCheckboxChange = (fieldId) => {
    setSelectedFields((prevSelectedFields) =>
      prevSelectedFields.includes(fieldId)
        ? prevSelectedFields.filter((field) => field !== fieldId)
        : [...prevSelectedFields, fieldId]
    );
  };

  const handleMapFields = async (event) => {
    event.preventDefault();

    try {
      const payload = {
        emailid: details.emailid, // Replace with dynamic email ID
        apps: microapp.apps, // Replace with the current app
        fields: selectedFields,
      };

      // Send data to the backend
      const response = await axios.post(
        "http://127.0.0.1:8000/updateclientmicroapps/",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Update successful:", response.data);
    } catch (error) {
      console.error("Error updating fields:", error);
    }
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
            <div class="d-flex align-items-center mr-1 mt-2 mb-5">
              <div class="d-flex align-items-baseline flex-wrap mr-5">
                <h6 class="d-flex align-items-center text-dark font-weight-bold my-1 mr-3">
                  Department
                </h6>

                <ul class="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold my-2 p-0">
                  <li class="breadcrumb-item">
                    <a class="text-muted">Modules</a>
                  </li>
                  <li class="breadcrumb-item">
                    <a class="text-muted">Map Fields/Columns</a>
                  </li>
                  <li class="breadcrumb-item">
                    <a class="text-muted">ABC Pvt. Ltd.</a>
                  </li>

                  <li class="breadcrumb-item">
                    <a class="text-muted">Salesboard</a>
                  </li>
                  <li class="breadcrumb-item">
                    <a href="#" class="text-muted">
                      Add Lead
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
              <div class="d-flex align-items-center justify-content-between flex-wrap  p-5 border-bottom">
                <div class="d-flex align-items-center flex-wrap mr-2">
                  <h5 class="text-dark font-weight-bold mb-0">
                    ABC Pvt. Ltd. - Salesboard - Add Client
                  </h5>
                </div>
                <div class="d-flex align-items-center">
                  <a class="btn btn-default ml-5 font-weight-bold">
                    <i class="la la-arrow-left"></i> Back
                  </a>
                  <div class="btn-group ml-2">
                    <a>
                      <button
                        type="button"
                        class="btn btn-primary font-weight-bold"
                        onClick={(e) => handleMapFields(e)}
                      >
                        Map Fields
                      </button>
                    </a>
                  </div>
                </div>
              </div>
              <div class="card-body p-5">
                <div class="row">
                  {fields.map((field) => (
                    <div class="col-lg-6 col-lg-6 col-12" id={field.label}>
                      <div class="row border-bottom">
                        <div class="col-lg-4 col-lg-4 col-12 pt-4">
                          <label class="checkbox checkbox-square">
                            <input
                              type="checkbox"
                              checked={selectedFields.includes(field.label)}
                              onChange={() => handleCheckboxChange(field.label)}
                            />
                            <span></span>
                            <h6 class="mt-2 pt-5 pb-5 pr-2 pl-5">
                              {field.label}
                            </h6>
                          </label>
                        </div>
                        <div class="col-lg-4 col-lg-4 col-12">
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
                        <div class="col-lg-4 col-lg-4 col-12">
                          <div class="form-group">
                            <label class="lbl-heading">
                              Compulsory<span class="text-danger">*</span>
                            </label>
                            <div class="radio-inline">
                              <label class="radio radio-lg radio-success">
                                <input
                                  type="radio"
                                  value="Male"
                                  name="g_locations"
                                />
                                <span></span>Yes
                              </label>
                              <label class="radio radio-lg radio-success">
                                <input
                                  type="radio"
                                  value="Female"
                                  name="g_locations"
                                  checked=""
                                />
                                <span></span>No
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div class="col-12 mt-3">
                    <div class="row border-bottom">
                      <div class="col-12 text-center">
                        <h4>+ Add Fields</h4>
                      </div>
                      <div class="col-12">
                        <div class="card-body p-5">
                          <div class="ctm_repeater">
                            <div
                              data-repeater-list="category"
                              class="inner_down_forms mt-5"
                            >
                              <div
                                data-repeater-item=""
                                class="form-group row align-items-center parent"
                              >
                                <div class="col-lg-3 col-md-3 col-12">
                                  <div class="form-group mb-3">
                                    <label class="lbl-heading">
                                      Field Title
                                    </label>
                                    <input
                                      type="text"
                                      class="form-control"
                                      name="category[0][address1]"
                                      placeholder="Type here..."
                                    />
                                  </div>
                                </div>
                                <div class="col-lg-3 col-md-3 col-12">
                                  <div class="form-group mb-3">
                                    <label class="lbl-heading">Type</label>
                                    <select
                                      class="form-control ctm_select2 select2-hidden-accessible"
                                      name="category[0][param]"
                                      tabindex="-1"
                                      aria-hidden="true"
                                      data-select2-id="9"
                                    >
                                      <option value="AZ" data-select2-id="11">
                                        Text Input
                                      </option>
                                      <option value="CO">Number</option>
                                      <option value="ID">Textarea</option>
                                      <option value="ID">Radio</option>
                                      <option value="MT">Dropdown</option>
                                      <option value="NE">Checkbox</option>
                                      <option value="NM">Date</option>
                                    </select>
                                  </div>
                                </div>
                                <div class="col-lg-5 col-md-5 col-12">
                                  <div class="form-group">
                                    <label class="lbl-heading">
                                      Is Mandatory
                                      <span class="text-danger">*</span>
                                    </label>
                                    <div class="radio-inline">
                                      <label class="radio radio-lg radio-success">
                                        <input
                                          type="radio"
                                          value="Male"
                                          name="category[0][g_locations]"
                                        />
                                        <span></span>Yes
                                      </label>
                                      <label class="radio radio-lg radio-success">
                                        <input
                                          type="radio"
                                          value="Female"
                                          name="category[0][g_locations]"
                                        />
                                        <span></span>No
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <div class="col-lg-1 col-md-1 col-12">
                                  <a
                                    href="javascript:;"
                                    data-repeater-delete=""
                                    class="btn btn-light-danger btn-icon"
                                  >
                                    <i class="far fa-trash-alt"></i>
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div class="ctm_repeater border-bottom">
                              <div
                                data-repeater-list="category"
                                class="inner_down_forms mt-5"
                              >
                                <div
                                  data-repeater-item=""
                                  class="form-group row col-lg-10 mx-auto align-items-center parent"
                                >
                                  <div class="col-lg-6 col-md-6 col-12">
                                    <div class="form-group mb-3">
                                      <label class="lbl-heading">
                                        Options (In Case of Dropdown, Radio
                                        &amp; Checkboxes)
                                      </label>
                                      <input
                                        type="text"
                                        class="form-control"
                                        name="category[0][address1]"
                                        placeholder="Type here..."
                                      />
                                    </div>
                                  </div>

                                  <div class="col-lg-3 col-md-3 col-12">
                                    <a
                                      href="javascript:;"
                                      data-repeater-delete=""
                                      class="btn btn-light-danger btn-icon"
                                    >
                                      <i class="far fa-trash-alt"></i>
                                    </a>
                                  </div>
                                  <div class="col-lg-3 text-right">
                                    <div class="add-more-btn">
                                      <a
                                        href="javascript:;"
                                        data-repeat-create=""
                                      >
                                        <button class="btn btn-success font-weight-bolder font-size-sm">
                                          <i class="la la-plus icon-md"></i> Add
                                          Option
                                        </button>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div class="add-more-btn mt-3">
                              <a href="javascript:;" data-repeat-create="">
                                <button class="btn btn-success font-weight-bolder font-size-sm">
                                  <i class="la la-plus icon-md"></i> + Add New
                                  Field
                                </button>
                              </a>
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
      <Footer />
    </>
  );
}
