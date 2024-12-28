import "./AddUser.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchCurrentUser, fetchMasters } from "../../api";
import AddNewSelect from "../../AddNewSelect";
import Select from "react-select";

export default function AddUser() {
  const option1 = [
    { value: "", text: "--Select--" },
    { value: "superadmin", text: "SuperAdmin" },
    { value: "systemuser", text: "SystemUser" },
    { value: "sales", text: "Sales" },
  ];
  const navigate = useNavigate();
  let token = localStorage.getItem("access");
  const [option2, setOption2] = useState([{ value: "", text: "--Select--" }]);
  const [formData, setFormData] = useState({
    firstname: undefined,
    lastname: undefined,
    phoneno: 0,
    emailid: undefined,
    role: option1[0].value,
    profilepic: "",
    department: option2[0].value,
    designation: undefined,
    addedby: undefined,
    businessid: "",
  });

  const [currentUser, setCurrentUser] = useState(null);
  const [email, setEmail] = useState("");
  const [emailExists, setEmailExists] = useState(false);
  const location = useLocation();
  const [isEdit, setIsEdit] = useState(false);
  const user = location.state?.user;
  const [selectedImage, setSelectedImage] = useState(null);
  const [businessid, setBusinessid] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userDept, setUserDept] = useState([]);
  const [masterid, setMasterid] = useState();

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Inside Masters", currentUser.businessId, "dep_user");
        const data = await fetchMasters(
          token,
          currentUser.businessId,
          "dep_user"
        );
        const updatedOptions = data.map((item) => ({
          value: item.fieldValue, // Assuming 'id' is the unique field
          label: item.fieldValue, // Assuming 'name' is the field for text
        }));
        console.log("Updated options", updatedOptions);
        setOption2([
          { value: "", label: "--Select--" },
          ...updatedOptions,
          { value: "add new", label: "+ Add New" },
        ]);

        setUserDept(data);
      } catch (e) {
        console.log("Error", e);
      }
    };

    if (currentUser) {
      fetchData();
    }
  }, [currentUser, formData, token]);

  useEffect(() => {
    if (user) {
      setFormData(user);
      setIsEdit(true);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, id } = e.target;
    console.log(name, value, id);
    console.log("Form Data", formData);
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    if (name === "department" && value === "add new") {
      console.log("Add New");
      setIsModalOpen(true);
      setMasterid(id);
      console.log("Model should be open", isModalOpen, masterid);
    }
  };
  function handleSelectChange(selectedOption) {
    const selectedValue = selectedOption ? selectedOption.value : "";

    setFormData({
      ...formData,
      department: selectedValue,
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
        }
      } catch (error) {
        console.error("Error checking email:", error);
      }
    }
  }
  function handleProfilePicChange(event) {
    const file = event.target.files[0];
    console.log("Image File", file);
    setSelectedImage(file);
    setFormData({ ...formData, profilepic: file });
  }
  const handleCloseModal = (newDep) => {
    setIsModalOpen(false);
    setFormData((prevFormData) => ({
      ...prevFormData,
      department: newDep,
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

  function handleSubmit(event) {
    event.preventDefault();
    if (isEdit) {
      console.log("Inside Edit");
      const response = axios.post(
        "http://127.0.0.1:8000/updateuser/",
        {
          firstname: formData.firstname,
          lastname: formData.lastname,
          phoneno: formData.phoneno,
          emailid: formData.emailid,
          role: formData.role,
          profilepic: formData.profilepic,
          department: formData.department,
          designation: formData.designation,
          addedby: formData.addedby,
          businessid: currentUser.businessId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsEdit(false);
      navigate("/departments/settings/editusers");
    } else {
      console.log("Inside handle Submit", currentUser, selectedImage);
      let response = axios.post(
        "http://127.0.0.1:8000/userdetails/",
        {
          firstname: formData.firstname,
          lastname: formData.lastname,
          phoneno: formData.phoneno,
          emailid: email,
          role: formData.role,
          profilepic: selectedImage,
          department: formData.department,
          designation: formData.designation,
          addedby: currentUser.firstname,
          businessId: currentUser.businessId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token in header
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      navigate("/departments/settings");
    }
  }
  console.log("IsModelOpen", isModalOpen);
  return (
    <>
      {isModalOpen && <AddNewSelect onClose={handleCloseModal} id={masterid} />}
      <div className={`main-content ${isModalOpen ? "faded" : ""}`}>
        <div className="d-flex flex-column flex-root">
          <div className="d-flex flex-row flex-column-fluid page">
            <div className="d-flex flex-column flex-row-fluid wrapper noprint2">
              <div
                class="d-flex flex-column flex-column-fluid content"
                id="kt_content"
              >
                <div class="subheader subheader-transparent" id="kt_subheader">
                  <div class="container-fluid">
                    <div class="d-flex align-items-baseline flex-wrap mr-1 mt-2 mb-5">
                      <div class="d-flex align-items-center text-dark font-weight-bold my-1 mr-3">
                        Department
                      </div>
                      <ul class="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold my-2 p-0">
                        <li class="breadcrumb-item mr-3">
                          <a
                            onClick={() => {
                              navigate("/departments/settings");
                            }}
                            class="text-muted"
                          >
                            Settings
                          </a>
                        </li>
                        <li class="breadcrumb-item">
                          <a href="#" class="text-muted">
                            Add Users
                          </a>
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
                            Add User
                          </h5>
                        </div>

                        <div class="d-flex align-items-center">
                          <div
                            onClick={() => navigate("/departments/settings")}
                            class="btn btn-default font-weight-bold ml-2"
                          >
                            <FontAwesomeIcon
                              icon={faArrowLeft}
                              className="mr-2"
                            />
                            Back
                          </div>

                          <div class="btn-group ml-2">
                            <a>
                              <button
                                type="button"
                                class="btn btn-primary font-weight-bold"
                                onClick={handleSubmit}
                              >
                                Submit
                              </button>{" "}
                            </a>
                          </div>
                        </div>
                      </div>
                      <div class="card-body p-5">
                        <div class="full_down_forms">
                          <div class="inner_down_forms">
                            <div class="row">
                              <div class="col-lg-6 col-md-6 col-12">
                                <div class="form-group mb-3">
                                  <label class="lbl-heading">
                                    First Name<span class="text-danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    name="firstname"
                                    value={formData.firstname}
                                    onChange={handleChange}
                                    placeholder="Type here..."
                                  />
                                </div>
                              </div>
                              <div class="col-lg-6 col-md-6 col-12">
                                <div class="form-group mb-3">
                                  <label class="lbl-heading">
                                    Last Name<span class="text-danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    name="lastname"
                                    value={formData.lastname}
                                    onChange={handleChange}
                                    placeholder="Type here..."
                                  />
                                </div>
                              </div>
                              <div class="col-lg-6 col-md-6 col-12">
                                <div class="form-group mb-3">
                                  <label class="lbl-heading">
                                    Contact Number
                                    <span class="text-danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    name="phoneno"
                                    value={formData.phoneno}
                                    onChange={handleChange}
                                    placeholder="Type here..."
                                  />
                                </div>
                              </div>
                              <div class="col-lg-6 col-md-6 col-12">
                                <div class="form-group mb-3">
                                  <label class="lbl-heading">
                                    Email ID<span class="text-danger">*</span>
                                  </label>
                                  <input
                                    type="email"
                                    class="form-control"
                                    name="emailid"
                                    readOnly={isEdit}
                                    value={formData.emailid}
                                    onBlur={handleEmailChange}
                                    placeholder="Type here..."
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
                              <div class="col-lg-6 col-md-6 col-12">
                                <div class="form-group mb-3">
                                  <label class="lbl-heading">
                                    Role<span class="text-danger">*</span>
                                  </label>
                                  <select
                                    value={formData.role}
                                    name="role"
                                    class="ctm_select2 form-control select2-hidden-accessible"
                                    tabindex="-1"
                                    aria-hidden="true"
                                    data-select2-id="12"
                                    onChange={handleChange}
                                  >
                                    {option1.map((option) => (
                                      <option
                                        key={option.value}
                                        value={option.value}
                                      >
                                        {option.text}
                                      </option>
                                    ))}
                                  </select>
                                  {/* <span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="13" style={{width: "582.25px"}}>
                                            <span class="selection">
                                            <span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-country-b3-container">
                                                <span class="select2-selection__rendered" id="select2-country-b3-container" role="textbox" aria-readonly="true" title="---Select--- ">
                                                    <span class="select2-selection__clear" title="Remove all items" data-select2-id="15">×</span>---Select--- </span>
                                                <span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span>
                                                <span class="dropdown-wrapper" aria-hidden="true"></span>
                                                </span> */}
                                </div>
                              </div>
                              <div class="col-lg-6 col-md-6 col-12">
                                <div class="form-group mb-3">
                                  <label class="lbl-heading">Profile Pic</label>
                                  <div></div>
                                  <div class="custom-file">
                                    <input
                                      type="file"
                                      class="custom-file-input"
                                      id="customFile"
                                      name="profilepic"
                                      onChange={handleProfilePicChange}
                                      accept="image/*"
                                    />
                                    <label
                                      class="custom-file-label"
                                      for="customFile"
                                    >
                                      {selectedImage
                                        ? selectedImage.name
                                        : "Choose file"}
                                    </label>
                                  </div>
                                  {/* <input type="text" class="form-control" name="profilepic"  value={formData.profilepic} onChange={handleChange} placeholder="Type here..."/> */}
                                </div>
                              </div>
                              <div class="col-lg-6 col-md-6 col-12">
                                <div class="form-group mb-3">
                                  <label class="lbl-heading">
                                    Department<span class="text-danger">*</span>
                                  </label>
                                  {/* <select value={formData.department} id="dep_user" name="department" class="ctm_select2 form-control select2-hidden-accessible" tabindex="-1" aria-hidden="true" data-select2-id="20" onChange={handleChange}>
                                        {option2.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.text}
                                            </option>
                                            ))}
                                        </select> */}
                                  <Select
                                    id="dep_user"
                                    name="department"
                                    options={option2}
                                    onChange={handleSelectChange}
                                    value={option2.find(
                                      (option) =>
                                        option.value === formData.department
                                    )}
                                    isSearchable
                                  />
                                  {/* <span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="21" style="width: 582.25px;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-country-od-container"><span class="select2-selection__rendered" id="select2-country-od-container" role="textbox" aria-readonly="true" title="---Select--- "><span class="select2-selection__clear" title="Remove all items" data-select2-id="23">×</span>---Select--- </span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span> */}
                                </div>
                              </div>
                              <div class="col-lg-6 col-md-6 col-12">
                                <div class="form-group mb-3">
                                  <label class="lbl-heading">
                                    Designation
                                    <span class="text-danger">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleChange}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
