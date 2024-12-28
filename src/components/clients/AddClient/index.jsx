import Footer from "../../Footer";
import Header from "../../Header";
import "./AddClient.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { fetchMasters } from "../../api";
import AddNewSelect from "../../AddNewSelect";
export default function AddClient() {
  const navigate = useNavigate();
  const token = localStorage.getItem("access");
  const [currentUser, setCurrentUser] = useState(null);
  const [masterid, setMasterid] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [emailExists, setEmailExists] = useState(false);
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [clientData, setClientData] = useState({
    source: "",
    entityName: "",
    gstNumber: "",
    entityType: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
    businessActivity: "",
    turnOver: "",
    employeeSize: "",
    website: "",
    companyLogo: "",
    remarks: "",
    firstname: "",
    lastname: "",
    phoneno: "",
    emailid: undefined,
    profilepic: "",
    addedby: "",
  });
  const [options, setOptions] = useState([{ value: "", text: "--Select--" }]);

  function handleChange(e) {
    const { name, value, id } = e.target;

    setClientData((prevState) => ({ ...prevState, [name]: value }));
    if (name === "source" && value === "add new") {
      console.log("Add New");
      setIsModalOpen(true);
      setMasterid(id);
      console.log("Model should be open", isModalOpen, masterid);
    }
  }

  function handleSelectChange(selectedOption) {
    const selectedValue = selectedOption ? selectedOption.value : "";

    setClientData({
      ...clientData,
      source: selectedValue,
    });
  }

  async function handleEmailChange(e) {
    console.log("Inside handle email change");
    const emailInput = e.target.value;
    console.log("Email,input", emailInput);

    if (emailInput.length > 0) {
      try {
        const response = await axios.get("http://127.0.0.1:8000/checkemail/", {
          params: { email: emailInput },
        });
        console.log(response.data);
        if (response.data.exists) {
          setEmailExists(true);
          console.log("Inside true");
        } else {
          setEmailExists(false);
          console.log("Inside false");
          setEmail(emailInput);
          setClientData({
            ...clientData,
            emailid: emailInput,
          });
        }
      } catch (error) {
        console.error("Error checking email:", error);
      }
    }
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    const name = e.target.name;
    console.log("File", file);
    if (name === "companyLogo") {
      setSelectedImage1(file);
    } else if (name === "profilepic") {
      setSelectedImage2(file);
    }

    setClientData({ ...clientData, [name]: file });
  }

  const handleCloseModal = (newSource) => {
    setIsModalOpen(false);
    setClientData((prevClientData) => ({
      ...prevClientData,
      source: newSource,
    }));
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      console.log("Inside fetch current user");

      try {
        const response = await axios.get("http://127.0.0.1:8000/currentuser/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Full response:", response);
        setCurrentUser(response.data); // Update the state with response data
      } catch (error) {
        console.error("Error fetching the user:", error);
      }
    };
    fetchCurrentUser();
  }, [token]);

  //Retrieving data from masters
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Inside Masters", currentUser.businessId, "source");
        const data = await fetchMasters(
          token,
          currentUser.businessId,
          "source"
        );
        const updatedOptions = data.map((item) => ({
          value: item.fieldValue, // Assuming 'id' is the unique field
          label: item.fieldValue, // Assuming 'name' is the field for text
        }));
        console.log("Updated options", updatedOptions);
        setOptions([
          { value: "", label: "--Select--" },
          ...updatedOptions,
          { value: "add new", label: "+ Add New" },
        ]);
      } catch (e) {
        console.log("Error", e);
      }
    };

    if (currentUser) {
      fetchData();
    }
  }, [currentUser, clientData, token]);

  useEffect(() => {
    console.log("Options updated:", options);
  }, [options]);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(clientData);
    const response = await axios.post(
      "http://127.0.0.1:8000/clientdetails/",
      {
        source: clientData.source,
        entityName: clientData.entityName,
        gstNumber: clientData.gstNumber,
        entityType: clientData.entityType,
        address: clientData.address,
        city: clientData.city,
        state: clientData.state,
        pincode: clientData.pincode,
        landmark: clientData.landmark,
        businessActivity: clientData.businessActivity,
        turnOver: clientData.turnOver,
        employeeSize: clientData.employeeSize,
        website: clientData.website,
        companyLogo: clientData.companyLogo,
        remarks: clientData.remarks,
        firstname: clientData.firstname,
        lastname: clientData.lastname,
        phoneno: clientData.phoneno,
        emailid: clientData.emailid,
        profilepic: clientData.profilepic,
        addedby: currentUser.firstname,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Server response for adding client", response);
    navigate("/departments/recommendations", {
      state: { logincred: response.data },
    });
  }
  return (
    <>
      {isModalOpen && <AddNewSelect onClose={handleCloseModal} id={masterid} />}
      <div className={`main-content ${isModalOpen ? "faded" : ""}`}>
        <div
          class="d-flex flex-column flex-column-fluid content"
          id="kt_content"
          style={{ paddingTop: "80px" }}
        >
          <div class="subheader subheader-transparent" id="kt_subheader">
            <div class="container-fluid">
              <div class="d-flex align-items-baseline flex-wrap mr-1 mt-2 mb-5">
                <div class="d-flex align-items-center text-dark font-weight-bold my-1 mr-3">
                  Department
                </div>

                <ul class="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold my-2 p-0">
                  <li class="breadcrumb-item">
                    <a class="text-muted">Clients</a>
                  </li>
                  <li class="breadcrumb-item">
                    <a class="text-muted">Add Clients</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="d-flex flex-column-fluid">
            <div class="container-fluid">
              <div class="card card-custom gutter-b">
                <div class="d-flex align-items-center justify-content-between flex-wrap p-5 border-bottom">
                  <div class="d-flex align-items-center flex-wrap mr-2">
                    <h5 class="text-dark font-weight-bold mt-2 mb-2 mr-5">
                      Add Client
                    </h5>
                  </div>

                  <div class="d-flex align-items-center">
                    <a
                      onClick={() => navigate("/departments/clients")}
                      class="btn btn-default font-weight-bold"
                    >
                      <FontAwesomeIcon icon={faArrowLeft} /> Back
                    </a>

                    <div class="btn-group ml-2">
                      <a>
                        <button
                          type="button"
                          class="btn btn-primary font-weight-bold"
                          onClick={handleSubmit}
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
                      <div class="row">
                        <div class="col-lg-2 col-md-2 col-12">
                          <div class="form-group mb-3">
                            <label class="lbl-heading">
                              Source<span class="text-danger">*</span>
                            </label>
                            {/* <select onChange={handleChange} name="source" value={clientData.source} class="ctm_select2 form-control select2-hidden-accessible" tabindex="-1" aria-hidden="true" data-select2-id="23">
                                            <option value="" data-select2-id="25">---Select--- </option>
                                            <option value="Online">Online</option>
                                            <option value="Direct Meeting">Direct Meeting</option>
                                            <option value="Social Media">Social Media</option>
                                            <option value="Referral">Referral</option>
                                            <option value="Pre-Sales">Pre-Sales</option>
                                            <option value="">+ Add New</option>
                                        </select> */}
                            <Select
                              name="source"
                              id="source"
                              options={options}
                              onChange={handleSelectChange}
                              value={options.find(
                                (option) => option.value === clientData.source
                              )}
                              isSearchable
                            />
                          </div>
                        </div>
                        <div class="col-lg-4 col-md-4 col-12">
                          <div class="form-group mb-3">
                            <label class="lbl-heading">
                              Entity Name<span class="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              name="entityName"
                              value={clientData.entityName}
                              placeholder="Type here..."
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div class="col-lg-3 col-md-3 col-12">
                          <div class="form-group mb-3">
                            <label class="lbl-heading">GST Number</label>
                            <input
                              type="text"
                              class="form-control"
                              name="gstNumber"
                              value={clientData.gstNumber}
                              placeholder="Type here..."
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div class="col-lg-3 col-md-3 col-12">
                          <div class="form-group mb-3">
                            <label class="lbl-heading">
                              Entity Type<span class="text-danger">*</span>
                            </label>
                            <select
                              onChange={handleChange}
                              value={clientData.entityType}
                              name="entityType"
                              class="ctm_select2 form-control select2-hidden-accessible"
                              tabindex="-1"
                              aria-hidden="true"
                              data-select2-id="35"
                            >
                              <option value="" data-select2-id="37">
                                ---Select---{" "}
                              </option>
                              <option value="Private Limited">
                                Private Limited
                              </option>
                              <option value="Limited Liability Partnership (LLP)">
                                Limited Liability Partnership (LLP)
                              </option>
                              <option value="Partnership">Partnership</option>
                              <option value="Sole Proprietorship">
                                Sole Proprietorship
                              </option>
                              <option value="Corporation">Corporation</option>
                              <option value="Nonprofit Organization">
                                Nonprofit Organization
                              </option>
                              <option value="Cooperative">Cooperative</option>
                              <option value="Franchise">Franchise</option>
                            </select>
                            {/* <span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="36" style={{width: "278.625px"}}><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-country-0e-container"><span class="select2-selection__rendered" id="select2-country-0e-container" role="textbox" aria-readonly="true" title="---Select--- "><span class="select2-selection__clear" title="Remove all items" data-select2-id="38">×</span>---Select--- </span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span> */}
                          </div>
                        </div>
                        <div class="col-lg-4 col-md-4 col-12">
                          <div class="form-group mb-3">
                            <label class="lbl-heading">Address</label>
                            <input
                              type="text"
                              class="form-control"
                              name="address"
                              value={clientData.address}
                              placeholder="Type here..."
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div class="col-lg-2 col-md-2 col-12">
                          <div class="form-group mb-3">
                            <label class="lbl-heading">City</label>
                            <input
                              type="text"
                              class="form-control"
                              name="city"
                              value={clientData.city}
                              placeholder="Type here..."
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div class="col-lg-2 col-md-2 col-12">
                          <div class="form-group mb-3">
                            <label class="lbl-heading">State</label>
                            <input
                              type="text"
                              class="form-control"
                              name="state"
                              value={clientData.state}
                              placeholder="Type here..."
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div class="col-lg-2 col-md-2 col-12">
                          <div class="form-group mb-3">
                            <label class="lbl-heading">Pincode</label>
                            <input
                              type="text"
                              class="form-control"
                              name="pincode"
                              placeholder="Type here..."
                              value={clientData.pincode}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div class="col-lg-2 col-md-2 col-12">
                          <div class="form-group mb-3">
                            <label class="lbl-heading">Landmark</label>
                            <input
                              type="text"
                              class="form-control"
                              value={clientData.landmark}
                              name="landmark"
                              placeholder="Type here..."
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6 col-12">
                          <div class="form-group mb-3">
                            <label class="lbl-heading">Business Activity</label>
                            <input
                              type="text"
                              class="form-control"
                              name="businessActivity"
                              value={clientData.businessActivity}
                              placeholder="Type here..."
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div class="col-lg-2 col-md-2 col-12">
                          <div class="form-group mb-3">
                            <label class="lbl-heading">Turnover</label>
                            <select
                              value={clientData.turnOver}
                              onChange={handleChange}
                              name="turnOver"
                              class="ctm_select2 form-control select2-hidden-accessible"
                              tabindex="-1"
                              aria-hidden="true"
                              data-select2-id="52"
                            >
                              <option value="" data-select2-id="54">
                                ---Select---{" "}
                              </option>
                              <option value="0-1 Cr.">0 - 1 Cr.</option>
                              <option value="1-5 Cr.">1 - 5 Cr.</option>
                              <option value="5-10 Cr.">5 - 10 Cr.</option>
                              <option value="15-20 Cr.">15 - 20 Cr.</option>
                              <option value="25-30 Cr.">25 - 30 Cr.</option>
                              <option value="35-40 Cr.">35 - 40 Cr.</option>
                              <option value="45-50 Cr.">45 - 50 Cr.</option>
                              <option value="55-60 Cr.">55 - 60 Cr.</option>
                              <option value="65-70 Cr.">65 - 70 Cr. </option>
                              <option value="75-80 Cr.">75 - 80 Cr. </option>
                              <option value="85-90 Cr.">85 - 90 Cr. </option>
                              <option value="95-100 Cr.">95 - 100 Cr. </option>
                              <option value="100+ Cr">100+ Cr.</option>
                            </select>
                            {/* <span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="53" style={{width: "177.417px"}}><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-country-l6-container"><span class="select2-selection__rendered" id="select2-country-l6-container" role="textbox" aria-readonly="true" title="---Select--- "><span class="select2-selection__clear" title="Remove all items" data-select2-id="55">×</span>---Select--- </span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span> */}
                          </div>
                        </div>
                        <div class="col-lg-2 col-md-2 col-12">
                          <div class="form-group mb-3">
                            <label class="lbl-heading">Employee Size</label>
                            <select
                              value={clientData.employeeSize}
                              onChange={handleChange}
                              name="employeeSize"
                              class="ctm_select2 form-control select2-hidden-accessible"
                              tabindex="-1"
                              aria-hidden="true"
                              data-select2-id="63"
                            >
                              <option value="" data-select2-id="65">
                                ---Select---{" "}
                              </option>
                              <option value="10-50">10-50</option>
                              <option value="50-100">50-100</option>
                              <option value="100-150">100-150</option>
                              <option value="150-200">150-200</option>
                              <option value="200-250">200-250</option>
                              <option value="250-300">250-300</option>
                              <option value="300+">300+</option>
                            </select>
                            {/* <span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="64" style={{width: "177.417px"}}><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-country-1w-container"><span class="select2-selection__rendered" id="select2-country-1w-container" role="textbox" aria-readonly="true" title="---Select--- "><span class="select2-selection__clear" title="Remove all items" data-select2-id="66">×</span>---Select--- </span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span> */}
                          </div>
                        </div>
                        <div class="col-lg-2 col-md-2 col-12">
                          <div class="form-group mb-3">
                            <label class="lbl-heading">Website</label>
                            <input
                              type="text"
                              class="form-control"
                              name="website"
                              placeholder="Type here..."
                              onChange={handleChange}
                              value={clientData.website}
                            />
                          </div>
                        </div>
                        <div class="col-lg-3 col-md-3 col-12">
                          <div class="form-group mb-3">
                            <label class="lbl-heading">
                              Upload Company Logo
                            </label>
                            <div></div>
                            <div class="custom-file">
                              <input
                                type="file"
                                class="custom-file-input"
                                id="customFile"
                                name="companyLogo"
                                onChange={handleImageChange}
                                accept="image/*"
                              />
                              <label class="custom-file-label" for="customFile">
                                {selectedImage1
                                  ? selectedImage1.name
                                  : "Choose file"}
                              </label>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-9 col-md-9 col-12">
                          <div class="form-group mb-3">
                            <label class="lbl-heading">Remarks</label>
                            <input
                              type="text"
                              class="form-control"
                              name="remarks"
                              placeholder="Type here..."
                              onChange={handleChange}
                              value={clientData.remarks}
                            />
                          </div>
                        </div>
                        <div class="col-12">
                          <div class="form_headers_title">
                            <h5 class="text-dark font-weight-bold mt-2 mb-2 mr-5">
                              Admin
                            </h5>
                          </div>
                        </div>
                        <div class="col-lg-3 col-md-3 col-12">
                          <div class="form-group mb-3">
                            <label class="lbl-heading">
                              First Name<span class="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              name="firstname"
                              placeholder="Type here..."
                              onChange={handleChange}
                              value={clientData.firstname}
                            />
                          </div>
                        </div>
                        <div class="col-lg-3 col-md-3 col-12">
                          <div class="form-group mb-3">
                            <label class="lbl-heading">
                              Last Name<span class="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              name="lastname"
                              placeholder="Type here..."
                              onChange={handleChange}
                              value={clientData.lastname}
                            />
                          </div>
                        </div>
                        <div class="col-lg-3 col-md-3 col-12">
                          <div class="form-group mb-3">
                            <label class="lbl-heading">
                              Mobile Number<span class="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              name="phoneno"
                              placeholder="Type here..."
                              onChange={handleChange}
                              value={clientData.phoneno}
                            />
                          </div>
                        </div>
                        <div class="col-lg-3 col-md-3 col-12">
                          <div class="form-group mb-3">
                            <label class="lbl-heading">
                              Email ID<span class="text-danger">*</span>
                            </label>
                            <input
                              type="email"
                              class="form-control"
                              name="emailid"
                              placeholder="Type here..."
                              onBlur={handleEmailChange}
                              value={clientData.emailid}
                            />

                            {emailExists ? (
                              <p style={{ color: "red" }}>
                                Email already exists!
                              </p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div class="col-lg-3 col-md-3 col-12">
                          <div class="form-group mb-3">
                            <label class="lbl-heading">Profile Pic</label>
                            <div></div>
                            <div class="custom-file">
                              <input
                                type="file"
                                class="custom-file-input"
                                id="customFile"
                                name="profilepic"
                                onChange={handleImageChange}
                                accept="image/*"
                              />
                              <label class="custom-file-label" for="customFile">
                                {selectedImage2
                                  ? selectedImage2.name
                                  : "Choose file"}
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
    </>
  );
}
