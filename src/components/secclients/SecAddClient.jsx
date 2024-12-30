import { useEffect, useState } from "react";
import Footer from "../Footer";
import Header from "../Header";
import "./SecAddClient.css";
import axios from "axios";
import { useAppData } from "../../Providers/AppDataProvider";
import { API_BASE_URL } from "../../constants/constants";
export default function SecAddClient() {
  const [formData, setFormData] = useState();
  const { currentUser } = useAppData();
  const token = localStorage.getItem("access");
  useEffect(() => {
    const fetchData = async () => {
      console.log("Inside fetchData secaddclient");

      try {
        const response = await axios.get(
          `${API_BASE_URL}/clientformfields/`,
          {
            params: {
              emailid: currentUser.username,
              apps: "addClients",
            },
          },

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("ClientFormFields", response.data.fields);
        setFormData(response.data.fields);
      } catch (e) {}
    };

    fetchData();
  }, [currentUser]);
  const renderForm = (formData) => {
    console.log("Inside renderForm");
    if (formData) {
      return Object.entries(formData).map(([key, fieldConfig]) => {
        switch (fieldConfig.type) {
          case "TEXT":
            return (
              <div className={fieldConfig.classname}>
                <div key={fieldConfig.id} className="form-group mb-3">
                  <label htmlFor={fieldConfig.id} className="lbl-heading">
                    {key}
                  </label>
                  <input
                    type="text"
                    id={fieldConfig.id}
                    placeholder={fieldConfig.placeholder || ""}
                    maxLength={fieldConfig.maxlength || 255}
                    required={fieldConfig.required || false}
                    className="form-control"
                  />
                </div>
              </div>
            );

          case "DROP_DOWN":
            return (
              <div className={fieldConfig.classname}>
                <div key={fieldConfig.id} className="form-group mb-3">
                  <label htmlFor={fieldConfig.id} className="lbl-heading">
                    {key}
                  </label>
                  <select
                    id={fieldConfig.id}
                    required={fieldConfig.required || false}
                    name={key}
                    className="ctm_select2 form-control select2-hidden-accessible"
                  >
                    {fieldConfig.value.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            );

          case "RADIO":
            return (
              <div className={fieldConfig.classname}>
                <div className="form-group mb-3" key={key}>
                  <label className="lbl-heading">
                    {key}
                    <span class="text-danger">*</span>
                  </label>
                  <div className="radio-inline">
                    {fieldConfig.value.map((option, index) => (
                      <label
                        class="radio radio-lg radio-success"
                        htmlFor={`${fieldConfig.id}_${index}`}
                      >
                        <input
                          type="radio"
                          id={`${fieldConfig.id}_${index}`}
                          name={fieldConfig.id}
                          value={option}
                          required={fieldConfig.required || false}
                        />
                        <span></span>
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            );
          default:
            return null; // Handle unsupported field types
        }
      });
    }
  };

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
            <div class="d-flex align-items-center mr-1 mt-2 mb-2">
              <ul class="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold my-2 p-0">
                <li class="breadcrumb-item">
                  <a class="text-dark">Dashboard</a>
                </li>
                <li class="breadcrumb-item">
                  <a href="#" class="text-muted">
                    Add Clients
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="d-flex flex-column-fluid" data-select2-id="162">
          <div class="container-fluid" data-select2-id="161">
            <div class="card card-custom gutter-b" data-select2-id="160">
              <div class="d-flex align-items-center justify-content-between flex-wrap p-5 border-bottom">
                <div class="d-flex align-items-center flex-wrap mr-2">
                  <h5 class="text-dark font-weight-bold mt-2 mb-2 mr-5">
                    Add Lead
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
                      >
                        Submit
                      </button>
                    </a>
                  </div>
                </div>
              </div>
              <div class="card-body p-5" data-select2-id="159">
                <div class="full_down_forms" data-select2-id="158">
                  <div class="inner_down_forms" data-select2-id="157">
                    <div class="row" data-select2-id="156">
                      {formData && renderForm(formData)}
                    </div>

                    {/* <div class="row" data-select2-id="156">
                                <div class="col-lg-2 col-md-2 col-12">
                                    <div class="form-group mb-3">
                                        <label class="lbl-heading">Client ID</label>
                                        <input type="text" class="form-control" name="address1" placeholder="Type here..." readonly="" value="001">
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-12">
                                    <div class="form-group mb-3">
                                        <label class="lbl-heading">Source</label>
                                        <select name="country" class="ctm_select2 form-control select2-hidden-accessible" tabindex="-1" aria-hidden="true" data-select2-id="51">
                                            <option value="" data-select2-id="53">---Select--- </option>
                                            <option value="AF">Online</option>
                                            <option value="AX">Direct Meeting</option>
                                            <option value="AL">Social Media</option>
                                            <option value="DZ">Referral</option>
                                            <option value="DZ">Pre-Sales</option>
                                            <option value="DZ">+ Add New</option>
                                        </select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="52" style="width: 177.417px;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-country-bs-container"><span class="select2-selection__rendered" id="select2-country-bs-container" role="textbox" aria-readonly="true" title="---Select--- "><span class="select2-selection__clear" title="Remove all items" data-select2-id="54">×</span>---Select--- </span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-4 col-12">
                                    <div class="form-group mb-3">
                                        <label class="lbl-heading">Company Name<span class="text-danger">*</span></label>
                                        <input type="text" class="form-control" name="address1" placeholder="Type here...">
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-12">
                                    <div class="form-group mb-3">
                                        <label class="lbl-heading">GST Number</label>
                                        <input type="text" class="form-control" name="address1" placeholder="Type here...">
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-12">
                                    <div class="form-group mb-3" data-select2-id="171">
                                        <label class="lbl-heading">Entity Type</label>
                                        <select name="country" class="ctm_select2 form-control select2-hidden-accessible" tabindex="-1" aria-hidden="true" data-select2-id="63">
                                            <option value="" data-select2-id="65">---Select--- </option>
                                            <option value="AF" data-select2-id="172">Private Limited</option>
                                            <option value="AX" data-select2-id="173">Limited Liability Partnership (LLP)</option>
                                            <option value="AL" data-select2-id="174">Partnership</option>
                                            <option value="DZ" data-select2-id="175">Sole Proprietorship</option>
                                            <option value="AL" data-select2-id="176">Corporation</option>
                                            <option value="AL" data-select2-id="177">Nonprofit Organization</option>
                                            <option value="AL" data-select2-id="178">Cooperative</option>
                                            <option value="AL" data-select2-id="179">Franchise</option>
                                        </select><span class="select2 select2-container select2-container--default select2-container--below" dir="ltr" data-select2-id="64" style="width: 177.417px;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-country-9z-container"><span class="select2-selection__rendered" id="select2-country-9z-container" role="textbox" aria-readonly="true" title="---Select--- "><span class="select2-selection__clear" title="Remove all items" data-select2-id="66">×</span>---Select--- </span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-4 col-12">
                                    <div class="form-group mb-3">
                                        <label class="lbl-heading">Address</label>
                                        <input type="text" class="form-control" name="address1" placeholder="Type here...">
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-12">
                                    <div class="form-group mb-3">
                                        <label class="lbl-heading">City</label>
                                        <input type="text" class="form-control" name="address1" placeholder="Type here...">
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-12">
                                    <div class="form-group mb-3">
                                        <label class="lbl-heading">State</label>
                                        <input type="text" class="form-control" name="address1" placeholder="Type here...">
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-12">
                                    <div class="form-group mb-3">
                                        <label class="lbl-heading">Pincode</label>
                                        <input type="text" class="form-control" name="address1" placeholder="Type here...">
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-12">
                                    <div class="form-group mb-3">
                                        <label class="lbl-heading">Country</label>
                                        <input type="text" class="form-control" name="address1" placeholder="Type here...">
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-12">
                                    <div class="form-group mb-3">
                                        <label class="lbl-heading">Country Code</label>
                                        <select name="country" class="ctm_select2 form-control select2-hidden-accessible" tabindex="-1" aria-hidden="true" data-select2-id="70">
                                            <option value="" data-select2-id="72">---Select--- </option>
                                            <option value="AF">+91</option>
                                            <option value="AX">+7</option>
                                            <option value="AL">+10</option>
                                        </select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="71" style="width: 177.417px;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-country-nd-container"><span class="select2-selection__rendered" id="select2-country-nd-container" role="textbox" aria-readonly="true" title="---Select--- "><span class="select2-selection__clear" title="Remove all items" data-select2-id="73">×</span>---Select--- </span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-4 col-12">
                                    <div class="form-group mb-3">
                                        <label class="lbl-heading">Business Activity</label>
                                        <input type="text" class="form-control" name="address1" placeholder="Type here...">
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-12">
                                    <div class="form-group mb-3">
                                        <label class="lbl-heading">Turnover</label>
                                        <select name="country" class="ctm_select2 form-control select2-hidden-accessible" tabindex="-1" aria-hidden="true" data-select2-id="88">
                                            <option value="" data-select2-id="90">---Select--- </option>
                                            <option value="AF">0 - 1 Cr.</option>
                                            <option value="AX">1 - 5 Cr.</option>
                                            <option value="AL">5 - 10 Cr.</option>
                                            <option value="DZ">15 - 20 Cr.</option>
                                            <option value="AF">25 - 30 Cr.</option>
                                            <option value="AX">35 - 40 Cr.</option>
                                            <option value="AL">45 - 50 Cr.</option>
                                            <option value="DZ">55 - 60 Cr.</option>
                                            <option value="DZ">65 - 70 Cr. </option>
                                            <option value="DZ">75 - 80 Cr. </option>
                                            <option value="DZ">85 - 90 Cr. </option>
                                            <option value="DZ">95 - 100 Cr. </option>
                                            <option value="DZ">100+ Cr.</option>
                                            <option value="DZ">+ Add More</option>
                                        </select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="89" style="width: 177.417px;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-country-1x-container"><span class="select2-selection__rendered" id="select2-country-1x-container" role="textbox" aria-readonly="true" title="---Select--- "><span class="select2-selection__clear" title="Remove all items" data-select2-id="91">×</span>---Select--- </span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-12">
                                    <div class="form-group mb-3">
                                        <label class="lbl-heading">Employee Size</label>
                                        <select name="country" class="ctm_select2 form-control select2-hidden-accessible" tabindex="-1" aria-hidden="true" data-select2-id="100">
                                            <option value="" data-select2-id="102">---Select--- </option>
                                            <option value="AF">10-50</option>
                                            <option value="AX">50-100</option>
                                            <option value="AL">100-150</option>
                                            <option value="DZ">150-200</option>
                                            <option value="DZ">200-250</option>
                                            <option value="DZ">250-300</option>
                                            <option value="DZ">300+</option>
                                            <option value="DZ">+ Add More</option>
                                        </select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="101" style="width: 177.417px;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-country-th-container"><span class="select2-selection__rendered" id="select2-country-th-container" role="textbox" aria-readonly="true" title="---Select--- "><span class="select2-selection__clear" title="Remove all items" data-select2-id="103">×</span>---Select--- </span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-12">
                                    <div class="form-group mb-3">
                                        <label class="lbl-heading">Website</label>
                                        <input type="text" class="form-control" name="address1" placeholder="Type here...">
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-12">
                                    <div class="form-group mb-3">
                                        <label class="lbl-heading">Established Year</label>
                                        <input type="text" class="form-control" name="address1" placeholder="Type here...">
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-12">
                                    <div class="form-group mb-3">
                                        <label class="lbl-heading">Type</label>
                                        <select name="country" class="ctm_select2 form-control select2-hidden-accessible" tabindex="-1" aria-hidden="true" data-select2-id="109">
                                            <option value="" data-select2-id="111">---Select--- </option>
                                            <option value="AF">Distributor</option>
                                            <option value="AX">Wholeseller</option>
                                            <option value="AL">Retailer</option>
                                            <option value="DZ">Supplier</option>
                                            <option value="DZ">+ Add New</option>
                                        </select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="110" style="width: 177.417px;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-country-59-container"><span class="select2-selection__rendered" id="select2-country-59-container" role="textbox" aria-readonly="true" title="---Select--- "><span class="select2-selection__clear" title="Remove all items" data-select2-id="112">×</span>---Select--- </span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-12">
                                    <div class="form-group mb-3" data-select2-id="155">
                                        <label class="lbl-heading">Lists</label>
                                        <select name="country" class="ctm_select2 form-control select2-hidden-accessible" tabindex="-1" aria-hidden="true" data-select2-id="118">
                                            <option value="" data-select2-id="120">---Select--- </option>
                                            <option value="AF" data-select2-id="164">List 1</option>
                                            <option value="AX" data-select2-id="165">List 2</option>
                                            <option value="AL" data-select2-id="166">List 3</option>
                                            <option value="DZ" data-select2-id="167">List 4</option>
                                            <option value="DZ" data-select2-id="168">+ Add New</option>
                                        </select><span class="select2 select2-container select2-container--default select2-container--above" dir="ltr" data-select2-id="119" style="width: 177.417px;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-country-xz-container"><span class="select2-selection__rendered" id="select2-country-xz-container" role="textbox" aria-readonly="true" title="---Select--- "><span class="select2-selection__clear" title="Remove all items" data-select2-id="121">×</span>---Select--- </span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-12">
                                    <div class="form-group mb-3">
                                        <label class="lbl-heading">Zone</label>
                                        <select name="country" class="ctm_select2 form-control select2-hidden-accessible" tabindex="-1" aria-hidden="true" data-select2-id="127">
                                            <option value="" data-select2-id="129">---Select--- </option>
                                            <option value="AF">Mumbai</option>
                                            <option value="AX">Delhi</option>
                                            <option value="AL">Pune</option>
                                            <option value="DZ">Kolkata</option>
                                            <option value="DZ">+ Add New</option>
                                        </select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="128" style="width: 177.417px;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-country-p9-container"><span class="select2-selection__rendered" id="select2-country-p9-container" role="textbox" aria-readonly="true" title="---Select--- "><span class="select2-selection__clear" title="Remove all items" data-select2-id="130">×</span>---Select--- </span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-12">
                                    <div class="form-group mb-3">
                                        <label class="lbl-heading">Account Manager</label>
                                        <select name="country" class="ctm_select2 form-control select2-hidden-accessible" tabindex="-1" aria-hidden="true" data-select2-id="135">
                                            <option value="" data-select2-id="137">Admin</option>
                                            <option value="AF">User 1</option>
                                            <option value="AX">User 2</option>
                                            <option value="AL">User 3</option>
                                            <option value="DZ">User 4</option>
                                        </select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="136" style="width: 177.417px;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-country-qk-container"><span class="select2-selection__rendered" id="select2-country-qk-container" role="textbox" aria-readonly="true" title="Admin"><span class="select2-selection__clear" title="Remove all items" data-select2-id="138">×</span>Admin</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                    </div>
                                </div>
                                <div class="col-lg-2 col-md-2 col-12">
                                    <div class="form-group mb-3">
                                        <label class="lbl-heading">Lead Stage</label>
                                        <select name="country" class="ctm_select2 form-control select2-hidden-accessible" tabindex="-1" aria-hidden="true" data-select2-id="142">
                                            <option value="" data-select2-id="144">---Select--- </option>
                                            <option value="AF">Client</option>
                                            <option value="AX">Prospect</option>
                                            <option value="DZ">+ Add New</option>
                                        </select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="143" style="width: 177.417px;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-country-te-container"><span class="select2-selection__rendered" id="select2-country-te-container" role="textbox" aria-readonly="true" title="---Select--- "><span class="select2-selection__clear" title="Remove all items" data-select2-id="145">×</span>---Select--- </span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                    </div>
                                </div>
                                <div class="col-lg-3 col-md-3 col-12">
                                    <div class="form-group">
                                        <label class="lbl-heading">GST Type<span class="text-danger">*</span></label>
                                        <div class="radio-inline">
                                            <label class="radio radio-lg radio-success">
                                                <input type="radio" value="Male" name="g_locations" checked="">
                                                <span></span>CGST/SGST
                                            </label>
                                            <label class="radio radio-lg radio-success">
                                                <input type="radio" value="Female" name="g_locations">
                                                <span></span>IGST
                                            </label>
                                            <label class="radio radio-lg radio-success">
                                                <input type="radio" value="Female" name="g_locations">
                                                <span></span>No GST
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form_headers_title">
                                        <h5 class="text-dark font-weight-bold mt-2 mb-2 mr-5">Contact Persons</h5>
                                    </div>
                                </div>
                            </div> */}
                  </div>
                </div>
                <div class="full_down_forms">
                  <div class="inner_down_forms">
                    {/* <div class="ctm_repeater">
                                <div data-repeater-list="category" class="inner_down_forms">
                                    <div data-repeater-item="" class="border-bottom form-group mb-3 row align-items-center parent">
                                        <div class="col-lg-2 col-md-2 col-12">
                                            <div class="form-group mb-3">
                                                <label class="lbl-heading">First Name</label>
                                                <input type="text" class="form-control" name="category[0][address1]" placeholder="Type here...">
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-12">
                                            <div class="form-group mb-3">
                                                <label class="lbl-heading">Last Name</label>
                                                <input type="text" class="form-control" name="category[0][address1]" placeholder="Type here...">
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-12">
                                            <div class="form-group mb-3">
                                                <label class="lbl-heading">Contact No.</label>
                                                <input type="text" class="form-control" name="category[0][address1]" placeholder="Type here...">
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-12">
                                            <div class="form-group mb-3">
                                                <label class="lbl-heading">Alt. Contact No.</label>
                                                <input type="text" class="form-control" name="category[0][address1]" placeholder="Type here...">
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-12">
                                            <div class="form-group mb-3">
                                                <label class="lbl-heading">Email</label>
                                                <input type="text" class="form-control" name="category[0][address1]" placeholder="Type here...">
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-12">
                                            <div class="form-group mb-3">
                                                <label class="lbl-heading">Alt. Email</label>
                                                <input type="text" class="form-control" name="category[0][address1]" placeholder="Type here...">
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-12">
                                            <div class="form-group mb-3">
                                                <label class="lbl-heading">Designation</label>
                                                <input type="text" class="form-control" name="category[0][address1]" placeholder="Type here...">
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-12">
                                            <div class="form-group mb-3">
                                                <label class="lbl-heading">Department</label>
                                                <input type="text" class="form-control" name="category[0][address1]" placeholder="Type here...">
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-12">
                                            <div class="form-group mb-3">
                                                <label class="lbl-heading">Hierarchy</label>
                                                <select name="category[0][country]" class="ctm_select2 form-control select2-hidden-accessible" tabindex="-1" aria-hidden="true" data-select2-id="150">
                                                    <option value="" data-select2-id="152">---Select--- </option>
                                                    <option value="AF">Influencer</option>
                                                    <option value="AX">Decision Maker</option>
                                                    <option value="AL">Information Given</option>
                                                    <option value="AL">+ Add New</option>
                                                </select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="151" style="width: 177.417px;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-country-q6-container"><span class="select2-selection__rendered" id="select2-country-q6-container" role="textbox" aria-readonly="true" title="---Select--- "><span class="select2-selection__clear" title="Remove all items" data-select2-id="153">×</span>---Select--- </span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-12">
                                            <div class="form-group mb-3">
                                                <label class="lbl-heading">Date Of Birth</label>
                                                <input type="text" class="form-control ctm_dp_for_dob" name="category[0][address1]" placeholder="Ex. Date Of Birth ">
                                            </div>
                                        </div>
                                        <div class="col-lg-2 col-md-2 col-12">
                                            <div class="form-group mb-3">
                                                <label class="lbl-heading">Anniversary Date</label>
                                                <input type="text" class="form-control ctm_dp" name="category[0][address1]" placeholder="Ex. Anniversary Date ">
                                            </div>
                                        </div>
                                        <div class="col-lg-1 col-md-1 col-12">
                                            <a href="javascript:;" data-repeater-delete="" class="btn btn-light-danger btn-icon mt-4">
                                                <i class="far fa-trash-alt"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div class="add-more-btn">
                                    <a href="javascript::" data-repeater-create="">
                                        <button class="btn btn-success font-weight-bolder font-size-sm"><i class="la la-plus icon-md"></i> Add More</button>
                                    </a>
                                </div>
                            </div> */}
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
