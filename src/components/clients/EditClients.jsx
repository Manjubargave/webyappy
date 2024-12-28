import Header from "../Header";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faAngleLeft,
  faAngleRight,
  faEye,
  faFilter,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";

export default function EditClients() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const navigate = useNavigate();
  const totalPages = Math.ceil(data.length / entriesPerPage);
  const [query, setQuery] = useState("");
  const token = localStorage.getItem("access");

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/clientdetails/",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach token in header
            },
          }
        );
        console.log(response);
        setData(response.data); // Adjust based on your API response structure
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  console.log("Query", query, "data", data);

  const filteredData = data.filter((row) => {
    console.log("Row", row);
    return Object.values(row).some((value) => {
      console.log("Value being checked:", value);
      return (
        value != null &&
        value.toString().toLowerCase().includes(query.toLowerCase())
      );
    });
  });

  const currentEntries = filteredData.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );

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
                <div class="d-flex align-items-center text-dark font-weight-bold my-1 mr-3">
                  Department
                </div>

                <ul class="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold my-2 p-0">
                  <li class="breadcrumb-item">
                    <a class="text-muted">Clients</a>
                  </li>
                  <li class="breadcrumb-item">
                    <a class="text-muted">Edit Client</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="d-flex flex-column-fluid">
              <div class="container-fluid">
                <div class="card card-custom gutter-b">
                  <div class="d-flex align-items-center justify-content-between flex-wrap p-5 border-bottom">
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
                        class="btn btn-primary btn-sm font-weight-bold"
                      >
                        <i class="fas fa-filter icon-sm"></i> Filter
                      </button>
                      <a
                        href="https://demolook.in/clarityboard/home/superadminclient"
                        class="btn btn-default ml-5 font-weight-bold"
                      >
                        <i class="la la-arrow-left"></i> Back
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
                                onChange={(event) =>
                                  setQuery(event.target.value)
                                }
                                type="search"
                                class="form-control form-control-sm"
                                placeholder=""
                                aria-controls="DataTables_Table_0"
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
                            </button>{" "}
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
                            style={{ width: "1193px" }}
                          >
                            <thead>
                              <tr role="row">
                                <th
                                  class="sorting_asc"
                                  tabindex="0"
                                  aria-controls="DataTables_Table_0"
                                  rowspan="1"
                                  colspan="1"
                                  style={{ width: "18px" }}
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
                                  style={{ width: "112px" }}
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
                                  style={{ width: "115px" }}
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
                                  style={{ width: "79px" }}
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
                                  style={{ width: "68px" }}
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
                                  style={{ width: "190px" }}
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
                                  style={{ width: "54px" }}
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
                                  style={{ width: "85px" }}
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
                                  style={{ width: "81px" }}
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
                                  style={{ width: "61px" }}
                                  aria-label="Action: activate to sort column ascending"
                                >
                                  Action
                                </th>
                              </tr>
                            </thead>
                            {currentEntries.map((item) => (
                              <tr role="row" class="odd" key={item.id}>
                                <td class="sorting_1 dtr-control"></td>
                                <td>{item.gstNumber}</td>
                                <td>{item.entityName}</td>
                                <td>{item.firstname + " " + item.lastname}</td>
                                <td>{item.phoneno}</td>
                                <td>{item.emailid}</td>
                                <td>{item.city}</td>
                                <td>
                                  {new Date(item.addedon).toLocaleString()}
                                </td>
                                <td>{item.addedby}</td>
                                <td>
                                  <a href="#" class="mr-2" title="View Clients">
                                    <i class="icon-lg text-danger">
                                      <FontAwesomeIcon icon={faEdit} />
                                    </i>
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </table>
                        </div>
                      </div>
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
      <Footer />
    </>
  );
}
