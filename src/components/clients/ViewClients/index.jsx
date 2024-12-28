import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faAngleLeft,
  faAngleRight,
  faEye,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";
import "./ViewClients.css";
import { useNavigate } from "react-router-dom";
import Filter from "../Filter";

export default function ViewClients() {
  const token = localStorage.getItem("access");
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const navigate = useNavigate();
  const totalPages = Math.ceil(data.length / entriesPerPage);
  const [query, setQuery] = useState("");

  const handleEntriesChange = (e) => {
    setEntriesPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to page 1 when entries per page changes
  };
  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "previous" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  function openFilter() {
    setFilter(!filter);
  }

  //handling switch

  async function handleSwitch(clientid) {
    console.log(clientid, "ClientId");
    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/switch-to-client/${clientid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response", response);
      if (response.status === 200) {
        console.log("Inside if ");
        console.log(
          "*** ViewClients handleSwitch accesstoken",
          response.data.access_token
        );
        console.log(
          "*** ViewClients handleSwitch refreshtoken",
          response.data.refresh_token
        );

        // Update tokens with new client account tokens
        localStorage.setItem("access", response.data.access_token);
        localStorage.setItem("refresh", response.data.refresh_token);
        const logo = response.data.logo;

        // Redirect to the client's dashboard
        navigate(`/departments/${clientid}`, { state: { logo: logo } });
      } else {
        console.error("Failed to switch login.");
      }
    } catch (err) {
      console.log("An error occurred while switching to client login.", err);
    }
  }

  function handleView(user) {
    console.log("Handle View", user);

    navigate("/departments/clients/viewclients/view", {
      state: { client: user },
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      console.log("*** ViewClients fetchData token***", token);
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/clientdetails/",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach token in header
            },
          }
        );
        console.log("***View Clients***", response);
        setData(response.data); // Adjust based on your API response structure
        console.log(data);
      } catch (error) {
        console.log("*** ViewClients Error fetching data:***", error);
      }
    };
    fetchData();
  }, [token]);

  const filteredData = data.filter((row) =>
    Object.values(row).some(
      (value) =>
        value != null &&
        value.toString().toLowerCase().includes(query.toLowerCase())
    )
  );
  const currentEntries = filteredData.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );

  return (
    <>
      {filter && <Filter toggleFunc={openFilter} />}

      <div
        class="d-flex flex-column flex-column-fluid content"
        style={{ paddingTop: "80px" }}
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
                    <a class="text-muted">Clients</a>
                  </li>
                  <li class="breadcrumb-item">
                    <a class="text-muted">View Client</a>
                  </li>
                </ul>
              </div>
            </div>

            <div class="d-flex flex-column-fluid">
              <div class="container-fluid">
                <div class="card card-custom gutter-b">
                  <div class="d-flex align-items-center justify-content-between  p-5 border-bottom">
                    <div class="d-flex align-items-center flex-wrap mr-2">
                      <h5 class="text-dark font-weight-bold mb-0">
                        Total Count :{" "}
                        <span class="text-primary font-weight-boldest">
                          {filteredData.length}
                        </span>
                      </h5>
                    </div>
                    <div class="d-flex align-items-center">
                      <button
                        type="button"
                        data-toggle="modal"
                        data-target="#filter"
                        class="btn btn-primary-filter btn-sm font-weight-bold"
                        onClick={openFilter}
                      >
                        <FontAwesomeIcon icon={faFilter} /> Filter
                      </button>
                      <a
                        href="https://demolook.in/clarityboard/home/superadminclient"
                        class="btn btn-default ml-5 font-weight-bold"
                      >
                        <FontAwesomeIcon icon={faArrowLeft} /> Back
                      </a>
                    </div>
                  </div>

                  <div class="card-body p-5">
                    <div
                      id="DataTables_Table_0_wrapper"
                      class="dataTables_wrapper dt-bootstrap4 no-footer"
                    >
                      <div class="row">
                        <div class="col-sm-6 text-left">
                          <div
                            id="DataTables_Table_0_filter"
                            class="dataTables_filter"
                          >
                            <label>
                              Search:
                              <input
                                type="search"
                                class="form-control form-control-sm"
                                placeholder=""
                                aria-controls="DataTables_Table_0"
                                onChange={(event) =>
                                  setQuery(event.target.value)
                                }
                              />
                            </label>
                          </div>
                        </div>
                        <div class="col-sm-6 text-right">
                          <div class="dt-buttons btn-group flex-wrap">
                            {" "}
                            <button
                              class="btn btn-secondary buttons-print"
                              tabindex="0"
                              aria-controls="DataTables_Table_0"
                              type="button"
                            >
                              <span>Print</span>
                            </button>{" "}
                            <button
                              class="btn btn-secondary buttons-copy buttons-html5"
                              tabindex="0"
                              aria-controls="DataTables_Table_0"
                              type="button"
                            >
                              <span>Copy</span>
                            </button>
                            <button
                              class="btn btn-secondary buttons-excel buttons-html5"
                              tabindex="0"
                              aria-controls="DataTables_Table_0"
                              type="button"
                            >
                              <span>Excel</span>
                            </button>{" "}
                            <button
                              class="btn btn-secondary buttons-csv buttons-html5"
                              tabindex="0"
                              aria-controls="DataTables_Table_0"
                              type="button"
                            >
                              <span>CSV</span>
                            </button>{" "}
                            <button
                              class="btn btn-secondary buttons-pdf buttons-html5"
                              tabindex="0"
                              aria-controls="DataTables_Table_0"
                              type="button"
                            >
                              <span>PDF</span>
                            </button>{" "}
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-12">
                          <table
                            class="table table-hover table-separate table-head-custom table-checkable ctm-db-export dataTable no-footer dtr-inline"
                            id="DataTables_Table_0"
                            role="grid"
                            aria-describedby="DataTables_Table_0_info"
                            style={{ width: "1195px" }}
                          >
                            <thead>
                              <tr role="row">
                                <th
                                  class="sorting_asc"
                                  tabindex="0"
                                  aria-controls="DataTables_Table_0"
                                  rowspan="1"
                                  colspan="1"
                                  style={{ width: "16px" }}
                                  aria-sort="ascending"
                                  aria-label="#: activate to sort column descending"
                                >
                                  #
                                </th>
                                <th
                                  class="sorting"
                                  tabindex="0"
                                  aria-controls="DataTables_Table_0"
                                  rowspan="1"
                                  colspan="1"
                                  style={{ width: "105px" }}
                                  aria-label="GST: activate to sort column ascending"
                                >
                                  GST
                                </th>
                                <th
                                  class="sorting"
                                  tabindex="0"
                                  aria-controls="DataTables_Table_0"
                                  rowspan="1"
                                  colspan="1"
                                  style={{ width: "108px" }}
                                  aria-label="Entity: activate to sort column ascending"
                                >
                                  Entity
                                </th>
                                <th
                                  class="sorting"
                                  tabindex="0"
                                  aria-controls="DataTables_Table_0"
                                  rowspan="1"
                                  colspan="1"
                                  style={{ width: "74px" }}
                                  aria-label="Admin: activate to sort column ascending"
                                >
                                  Admin
                                </th>
                                <th
                                  class="sorting"
                                  tabindex="0"
                                  aria-controls="DataTables_Table_0"
                                  rowspan="1"
                                  colspan="1"
                                  style={{ width: "64px" }}
                                  aria-label="Number: activate to sort column ascending"
                                >
                                  Number
                                </th>
                                <th
                                  class="sorting"
                                  tabindex="0"
                                  aria-controls="DataTables_Table_0"
                                  rowspan="1"
                                  colspan="1"
                                  style={{ width: "180px" }}
                                  aria-label="Email: activate to sort column ascending"
                                >
                                  Email
                                </th>
                                <th
                                  class="sorting"
                                  tabindex="0"
                                  aria-controls="DataTables_Table_0"
                                  rowspan="1"
                                  colspan="1"
                                  style={{ width: "50px" }}
                                  aria-label="City: activate to sort column ascending"
                                >
                                  City
                                </th>
                                <th
                                  class="sorting"
                                  tabindex="0"
                                  aria-controls="DataTables_Table_0"
                                  rowspan="1"
                                  colspan="1"
                                  style={{ width: "80px" }}
                                  aria-label="Added On: activate to sort column ascending"
                                >
                                  Added On
                                </th>
                                <th
                                  class="sorting"
                                  tabindex="0"
                                  aria-controls="DataTables_Table_0"
                                  rowspan="1"
                                  colspan="1"
                                  style={{ width: "76px" }}
                                  aria-label="Added By: activate to sort column ascending"
                                >
                                  Added By
                                </th>
                                <th
                                  class="sorting"
                                  tabindex="0"
                                  aria-controls="DataTables_Table_0"
                                  rowspan="1"
                                  colspan="1"
                                  style={{ width: "112px" }}
                                  aria-label="Action: activate to sort column ascending"
                                >
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentEntries.map((item) => (
                                <tr role="row" class="odd" key={item.id}>
                                  <td class="sorting_1 dtr-control"></td>
                                  <td>{item.gstNumber}</td>
                                  <td>{item.entityName}</td>
                                  <td>
                                    {item.firstname + " " + item.lastname}
                                  </td>
                                  <td>{item.phoneno}</td>
                                  <td>{item.emailid}</td>
                                  <td>{item.city}</td>
                                  <td>
                                    {new Date(item.addedon).toLocaleString()}
                                  </td>
                                  <td>{item.addedby}</td>
                                  <td>
                                    <a
                                      onClick={() => handleView(item)}
                                      class="mr-2"
                                      title="View Clients"
                                    >
                                      <FontAwesomeIcon icon={faEye} />
                                    </a>
                                    <span class="btn-third839">
                                      <a
                                        onClick={() =>
                                          handleSwitch(item.emailid)
                                        }
                                        class="mr-2"
                                        title="Switch to client login"
                                      >
                                        Switch
                                      </a>
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      {/* <div class="row">
                        <div class="col-sm-12 col-md-5">
                          <div
                            class="dataTables_info"
                            id="DataTables_Table_0_info"
                            role="status"
                            aria-live="polite"
                          >
                            Showing 1 to 10 of 10 entries
                          </div>
                        </div>
                        <div class="col-sm-12 col-md-7 dataTables_pager">
                          <div
                            class="dataTables_length"
                            id="DataTables_Table_0_length"
                          >
                            <label>
                              Show{" "}
                              <select
                                name="DataTables_Table_0_length"
                                aria-controls="DataTables_Table_0"
                                class="custom-select custom-select-sm form-control form-control-sm"
                              >
                                <option value="10">10</option>
                                <option value="25">25</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                              </select>{" "}
                              entries
                            </label>
                          </div>
                          <div
                            class="dataTables_paginate paging_simple_numbers"
                            id="DataTables_Table_0_paginate"
                          >
                            <ul class="pagination">
                              <li
                                class="paginate_button page-item previous disabled"
                                id="DataTables_Table_0_previous"
                              >
                                <a
                                  href="#"
                                  aria-controls="DataTables_Table_0"
                                  data-dt-idx="0"
                                  tabindex="0"
                                  class="page-link"
                                >
                                  <i class="ki ki-arrow-back"></i>
                                </a>
                              </li>
                              <li class="paginate_button page-item active">
                                <a
                                  href="#"
                                  aria-controls="DataTables_Table_0"
                                  data-dt-idx="1"
                                  tabindex="0"
                                  class="page-link"
                                >
                                  1
                                </a>
                              </li>
                              <li
                                class="paginate_button page-item next disabled"
                                id="DataTables_Table_0_next"
                              >
                                <a
                                  href="#"
                                  aria-controls="DataTables_Table_0"
                                  data-dt-idx="2"
                                  tabindex="0"
                                  class="page-link"
                                >
                                  <i class="ki ki-arrow-next"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div> */}
                      <div class="row">
                        <div class="col-md-5">
                          <div
                            class="dataTables_info"
                            id="DataTables_Table_0_info"
                            role="status"
                            aria-live="polite"
                          >
                            Showing {indexOfFirstEntry + 1} to{" "}
                            {Math.min(indexOfLastEntry, filteredData.length)} of{" "}
                            {filteredData.length} entries
                          </div>
                        </div>
                        <div class="col-sm-12 col-md-7 dataTables_pager">
                          <div
                            class="dataTables_length"
                            id="DataTables_Table_0_length"
                          >
                            <label>
                              Show
                              <select
                                value={entriesPerPage}
                                onChange={handleEntriesChange}
                                name="DataTables_Table_0_length"
                                ariaControls="DataTables_Table_0"
                                class="custom-select custom-select-sm form-control form-control-sm"
                              >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                              </select>{" "}
                              entries
                            </label>
                          </div>
                          <div
                            class="dataTables_paginate paging_simple_numbers"
                            id="DataTables_Table_0_paginate"
                          >
                            <ul class="pagination">
                              <li
                                className={`page-item ${
                                  currentPage === 1 ? "disabled" : ""
                                }`}
                                id="DataTables_Table_0_previous"
                              >
                                <a
                                  className="page-link"
                                  onClick={() => handlePageChange("previous")}
                                  aria-controls="DataTables_Table_0"
                                  data-dt-idx="0"
                                  tabindex="0"
                                  class="page-link"
                                >
                                  <FontAwesomeIcon icon={faAngleLeft} />
                                </a>
                              </li>
                              <li class="paginate_button page-item active">
                                <a
                                  href="#"
                                  aria-controls="DataTables_Table_0"
                                  data-dt-idx="1"
                                  tabindex="0"
                                  class="page-link"
                                >
                                  {currentPage}
                                </a>
                              </li>
                              <li
                                className={`page-item ${
                                  currentPage === totalPages ? "disabled" : ""
                                }`}
                                id="DataTables_Table_0_next"
                              >
                                <a
                                  className="page-link"
                                  onClick={() => handlePageChange("next")}
                                  aria-controls="DataTables_Table_0"
                                  data-dt-idx="2"
                                  tabindex="0"
                                  class="page-link"
                                >
                                  <FontAwesomeIcon icon={faAngleRight} />{" "}
                                </a>
                              </li>
                            </ul>
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
