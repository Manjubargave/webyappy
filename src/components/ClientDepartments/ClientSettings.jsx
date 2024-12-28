import Header from "../Header";
import Footer from "../Footer";
import "./ClientSettings.css";

export default function ClientSettings() {
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
            <div class="d-flex align-items-center mr-1 mt-2 mb-2">
              <ul class="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold my-2 p-0">
                <li class="breadcrumb-item">
                  <a
                    href="https://demolook.in/etmcloud/home/index"
                    class="text-dark"
                  >
                    Dashboard
                  </a>
                </li>
                <li class="breadcrumb-item">
                  <a
                    href="https://demolook.in/etmcloud/home/settings"
                    class="text-muted"
                  >
                    Settings
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="d-flex flex-column-fluid">
          <div class="container-fluid">
            <div class="row">
              <div class="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                <div class="card card-custom gutter-b card-stretch">
                  <div class="card-body">
                    <div class="mt-0">
                      <strong class="text-warning font-weight-bold font-size-h4">
                        <span class="svg-icon svg-icon-primary svg-icon-2x mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            width="24px"
                            height="24px"
                            viewBox="0 0 24 24"
                            version="1.1"
                          >
                            <g
                              stroke="none"
                              stroke-width="1"
                              fill="none"
                              fill-rule="evenodd"
                            >
                              <rect x="0" y="0" width="24" height="24"></rect>
                              <rect
                                fill="#000000"
                                x="4"
                                y="4"
                                width="7"
                                height="7"
                                rx="1.5"
                              ></rect>
                              <path
                                d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z"
                                fill="#000000"
                                opacity="0.3"
                              ></path>
                            </g>
                          </svg>
                        </span>
                        User Management
                      </strong>
                      <hr />
                    </div>
                    <div class="mt-2">
                      <a
                        href="https://demolook.in/etmcloud/home/adduser"
                        class="text-dark font-size-h6"
                      >
                        <i class="icon-md la la-arrow-right text-primary"></i>{" "}
                        Add User
                      </a>
                    </div>
                    <div class="mt-2">
                      <a
                        href="https://demolook.in/etmcloud/home/viewusers"
                        class="text-dark font-size-h6"
                      >
                        <i class="icon-md la la-arrow-right text-primary"></i>{" "}
                        <span>View Users</span>
                      </a>
                    </div>
                    <div class="mt-2">
                      <a
                        href="https://demolook.in/etmcloud/home/edituser"
                        class="text-dark font-size-h6"
                      >
                        <i class="icon-md la la-arrow-right text-primary"></i>{" "}
                        <span>Edit Users</span>
                      </a>
                    </div>
                    <div class="mt-2">
                      <a
                        href="https://demolook.in/etmcloud/home/assignmicroapp"
                        class="text-dark font-size-h6"
                      >
                        <i class="icon-md la la-arrow-right text-primary"></i>{" "}
                        <span>Assign Microapps</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                <div class="card card-custom gutter-b card-stretch">
                  <div class="card-body">
                    <div class="mt-0">
                      <strong class="text-warning font-weight-bold font-size-h4">
                        <span class="svg-icon svg-icon-primary svg-icon-2x mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            width="24px"
                            height="24px"
                            viewBox="0 0 24 24"
                            version="1.1"
                          >
                            <g
                              stroke="none"
                              stroke-width="1"
                              fill="none"
                              fill-rule="evenodd"
                            >
                              <rect x="0" y="0" width="24" height="24"></rect>
                              <rect
                                fill="#000000"
                                x="4"
                                y="4"
                                width="7"
                                height="7"
                                rx="1.5"
                              ></rect>
                              <path
                                d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z"
                                fill="#000000"
                                opacity="0.3"
                              ></path>
                            </g>
                          </svg>
                        </span>
                        Daily Productivity Format
                      </strong>
                      <hr />
                    </div>
                    <div class="mt-2">
                      <a
                        href="https://demolook.in/etmcloud/home/add_fr_ns"
                        class="text-dark font-size-h6"
                      >
                        <i class="icon-md la la-arrow-right text-primary"></i>{" "}
                        Create Format
                      </a>
                    </div>
                    <div class="mt-2">
                      <a
                        href="https://demolook.in/etmcloud/home/viewdilypfr"
                        class="text-dark font-size-h6"
                      >
                        <i class="icon-md la la-arrow-right text-primary"></i>{" "}
                        <span>View Format</span>
                      </a>
                    </div>
                    <div class="mt-2">
                      <a
                        href="https://demolook.in/etmcloud/home/editdilypfr"
                        class="text-dark font-size-h6"
                      >
                        <i class="icon-md la la-arrow-right text-primary"></i>{" "}
                        <span>Edit Format</span>
                      </a>
                    </div>
                    <div class="mt-2">
                      <a
                        href="https://demolook.in/etmcloud/home/mapuserdailypro"
                        class="text-dark font-size-h6"
                      >
                        <i class="icon-md la la-arrow-right text-primary"></i>{" "}
                        <span>Active/Deactive Users</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                <div class="card card-custom gutter-b card-stretch">
                  <div class="card-body">
                    <div class="mt-0">
                      <strong class="text-warning font-weight-bold font-size-h4">
                        <span class="svg-icon svg-icon-primary svg-icon-2x mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            width="24px"
                            height="24px"
                            viewBox="0 0 24 24"
                            version="1.1"
                          >
                            <g
                              stroke="none"
                              stroke-width="1"
                              fill="none"
                              fill-rule="evenodd"
                            >
                              <rect x="0" y="0" width="24" height="24"></rect>
                              <rect
                                fill="#000000"
                                x="4"
                                y="4"
                                width="7"
                                height="7"
                                rx="1.5"
                              ></rect>
                              <path
                                d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z"
                                fill="#000000"
                                opacity="0.3"
                              ></path>
                            </g>
                          </svg>
                        </span>
                        KRA/KPI/OKR Format
                      </strong>
                      <hr />
                    </div>
                    <div class="mt-2">
                      <a
                        href="https://demolook.in/etmcloud/home/set_kri"
                        class="text-dark font-size-h6"
                      >
                        <i class="icon-md la la-arrow-right text-primary"></i>{" "}
                        Add KRA
                      </a>
                    </div>
                    <div class="mt-2">
                      <a
                        href="https://demolook.in/etmcloud/home/crtkri_format"
                        class="text-dark font-size-h6"
                      >
                        <i class="icon-md la la-arrow-right text-primary"></i>{" "}
                        <span>View KRA</span>
                      </a>
                    </div>
                    <div class="mt-2">
                      <a
                        href="https://demolook.in/etmcloud/home/edtkri_format"
                        class="text-dark font-size-h6"
                      >
                        <i class="icon-md la la-arrow-right text-primary"></i>{" "}
                        <span>Edit KRA</span>
                      </a>
                    </div>
                    <div class="mt-2">
                      <a
                        href="https://demolook.in/etmcloud/home/emplrating"
                        class="text-dark font-size-h6"
                      >
                        <i class="icon-md la la-arrow-right text-primary"></i>{" "}
                        <span>Employee KRA Rating</span>
                      </a>
                    </div>
                    <div class="mt-2">
                      <a
                        href="https://demolook.in/etmcloud/home/period"
                        class="text-dark font-size-h6"
                      >
                        <i class="icon-md la la-arrow-right text-primary"></i>{" "}
                        <span>Assessment Dates</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                <div class="card card-custom gutter-b card-stretch">
                  <div class="card-body">
                    <div class="mt-0">
                      <strong class="text-warning font-weight-bold font-size-h4">
                        <span class="svg-icon svg-icon-primary svg-icon-2x mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            width="24px"
                            height="24px"
                            viewBox="0 0 24 24"
                            version="1.1"
                          >
                            <g
                              stroke="none"
                              stroke-width="1"
                              fill="none"
                              fill-rule="evenodd"
                            >
                              <rect x="0" y="0" width="24" height="24"></rect>
                              <rect
                                fill="#000000"
                                x="4"
                                y="4"
                                width="7"
                                height="7"
                                rx="1.5"
                              ></rect>
                              <path
                                d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z"
                                fill="#000000"
                                opacity="0.3"
                              ></path>
                            </g>
                          </svg>
                        </span>
                        Currency
                      </strong>
                      <hr />
                    </div>
                    <div class="mt-2">
                      <a
                        href="https://demolook.in/etmcloud/home/"
                        class="text-dark font-size-h6"
                      >
                        <i class="icon-md la la-arrow-right text-primary"></i>{" "}
                        Add Currency
                      </a>
                    </div>
                    <div class="mt-2">
                      <a
                        href="https://demolook.in/etmcloud/home/"
                        class="text-dark font-size-h6"
                      >
                        <i class="icon-md la la-arrow-right text-primary"></i>{" "}
                        <span>View Currency</span>
                      </a>
                    </div>
                    <div class="mt-2">
                      <a
                        href="https://demolook.in/etmcloud/home/"
                        class="text-dark font-size-h6"
                      >
                        <i class="icon-md la la-arrow-right text-primary"></i>{" "}
                        <span>Edit Currency</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                <div class="card card-custom gutter-b card-stretch">
                  <div class="card-body">
                    <div class="mt-0">
                      <strong class="text-warning font-weight-bold font-size-h4">
                        <span class="svg-icon svg-icon-primary svg-icon-2x mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            width="24px"
                            height="24px"
                            viewBox="0 0 24 24"
                            version="1.1"
                          >
                            <g
                              stroke="none"
                              stroke-width="1"
                              fill="none"
                              fill-rule="evenodd"
                            >
                              <rect x="0" y="0" width="24" height="24"></rect>
                              <rect
                                fill="#000000"
                                x="4"
                                y="4"
                                width="7"
                                height="7"
                                rx="1.5"
                              ></rect>
                              <path
                                d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z"
                                fill="#000000"
                                opacity="0.3"
                              ></path>
                            </g>
                          </svg>
                        </span>
                        Meeting Response Alerts
                      </strong>
                      <hr />
                    </div>
                    <div class="mt-2">
                      <a
                        href="https://demolook.in/etmcloud/home/"
                        class="text-dark font-size-h6"
                      >
                        <i class="icon-md la la-arrow-right text-primary"></i>{" "}
                        Add Response
                      </a>
                    </div>
                    <div class="mt-2">
                      <a
                        href="https://demolook.in/etmcloud/home/"
                        class="text-dark font-size-h6"
                      >
                        <i class="icon-md la la-arrow-right text-primary"></i>{" "}
                        <span>View Response</span>
                      </a>
                    </div>
                    <div class="mt-2">
                      <a
                        href="https://demolook.in/etmcloud/home/"
                        class="text-dark font-size-h6"
                      >
                        <i class="icon-md la la-arrow-right text-primary"></i>{" "}
                        <span>Edit Response</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                <div class="card card-custom gutter-b card-stretch">
                  <div class="card-body">
                    <div class="mt-0">
                      <strong class="text-warning font-weight-bold font-size-h4">
                        <span class="svg-icon svg-icon-primary svg-icon-2x mr-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            width="24px"
                            height="24px"
                            viewBox="0 0 24 24"
                            version="1.1"
                          >
                            <g
                              stroke="none"
                              stroke-width="1"
                              fill="none"
                              fill-rule="evenodd"
                            >
                              <rect x="0" y="0" width="24" height="24"></rect>
                              <rect
                                fill="#000000"
                                x="4"
                                y="4"
                                width="7"
                                height="7"
                                rx="1.5"
                              ></rect>
                              <path
                                d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z"
                                fill="#000000"
                                opacity="0.3"
                              ></path>
                            </g>
                          </svg>
                        </span>
                        Masters
                      </strong>
                      <hr />
                    </div>
                    <div class="mt-2">
                      <a
                        href="https://demolook.in/etmcloud/home/"
                        class="text-dark font-size-h6"
                      >
                        <i class="icon-md la la-arrow-right text-primary"></i>{" "}
                        Source
                      </a>
                    </div>
                    <div class="mt-2">
                      <a
                        href="https://demolook.in/etmcloud/home/"
                        class="text-dark font-size-h6"
                      >
                        <i class="icon-md la la-arrow-right text-primary"></i>{" "}
                        <span>Type</span>
                      </a>
                    </div>
                    <div class="mt-2">
                      <a
                        href="https://demolook.in/etmcloud/home/"
                        class="text-dark font-size-h6"
                      >
                        <i class="icon-md la la-arrow-right text-primary"></i>{" "}
                        <span>Zone</span>
                      </a>
                    </div>
                    <div class="mt-2">
                      <a
                        href="https://demolook.in/etmcloud/home/"
                        class="text-dark font-size-h6"
                      >
                        <i class="icon-md la la-arrow-right text-primary"></i>{" "}
                        <span>Lead Stage</span>
                      </a>
                    </div>
                    <div class="mt-2">
                      <a
                        href="https://demolook.in/etmcloud/home/"
                        class="text-dark font-size-h6"
                      >
                        <i class="icon-md la la-arrow-right text-primary"></i>{" "}
                        <span>User Departments</span>
                      </a>
                    </div>
                    <div class="mt-2">
                      <a
                        href="https://demolook.in/etmcloud/home/"
                        class="text-dark font-size-h6"
                      >
                        <i class="icon-md la la-arrow-right text-primary"></i>{" "}
                        <span>Turnover</span>
                      </a>
                    </div>
                    <div class="mt-2">
                      <a
                        href="https://demolook.in/etmcloud/home/"
                        class="text-dark font-size-h6"
                      >
                        <i class="icon-md la la-arrow-right text-primary"></i>{" "}
                        <span>Employee Size</span>
                      </a>
                    </div>
                    <div class="mt-2">
                      <a
                        href="https://demolook.in/etmcloud/home/"
                        class="text-dark font-size-h6"
                      >
                        <i class="icon-md la la-arrow-right text-primary"></i>{" "}
                        <span>Quotation Availability</span>
                      </a>
                    </div>
                    <div class="mt-2">
                      <a
                        href="https://demolook.in/etmcloud/home/"
                        class="text-dark font-size-h6"
                      >
                        <i class="icon-md la la-arrow-right text-primary"></i>{" "}
                        <span>Quotation Delivery</span>
                      </a>
                    </div>
                    <div class="mt-2">
                      <a
                        href="https://demolook.in/etmcloud/home/"
                        class="text-dark font-size-h6"
                      >
                        <i class="icon-md la la-arrow-right text-primary"></i>{" "}
                        <span>Quotation Validity</span>
                      </a>
                    </div>
                    <div class="mt-2">
                      <a
                        href="https://demolook.in/etmcloud/home/"
                        class="text-dark font-size-h6"
                      >
                        <i class="icon-md la la-arrow-right text-primary"></i>{" "}
                        <span>Quotation Payment</span>
                      </a>
                    </div>
                    <div class="mt-2">
                      <a
                        href="https://demolook.in/etmcloud/home/"
                        class="text-dark font-size-h6"
                      >
                        <i class="icon-md la la-arrow-right text-primary"></i>{" "}
                        <span>Day Status</span>
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
    </>
  );
}
