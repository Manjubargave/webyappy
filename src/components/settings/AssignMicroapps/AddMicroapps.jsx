import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faAngleLeft,
  faAngleRight,
  faUserShield,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddMicroapps() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = data.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(data.length / entriesPerPage);
  const navigate = useNavigate();

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

  const handleClickOnSheild = (user) => {
    navigate("/departments/settings/addmicroapps/assignmicroapps", {
      state: { user },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/userdetails/", {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token in header
          },
        });
        console.log(response);
        setData(response.data); // Adjust based on your API response structure
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="d-flex flex-column flex-root">
      <div className="d-flex flex-row flex-column-fluid page">
        <div className="d-flex flex-column flex-row-fluid wrapper noprint2">
          <div
            class="d-flex flex-column flex-column-fluid content"
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
                        <a
                          href="https://demolook.in/clarityboard/home/settings_super"
                          class="text-muted mr-3"
                        >
                          Settings
                        </a>
                      </li>
                      <li class="breadcrumb-item">
                        <a href="#" class="text-muted">
                          View Users
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
                  <div class="d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap px-5 border-bottom">
                    <div class="d-flex align-items-center flex-wrap mr-2">
                      <h5 class="text-dark font-weight-bold mb-0">
                        Total Users :{" "}
                        <span class="text-primary font-weight-boldest">
                          {data.length}
                        </span>
                      </h5>
                    </div>
                    <div class="d-flex align-items-center">
                      <a
                        href="https://demolook.in/clarityboard/home/settings_super"
                        class="btn btn-default ml-5 font-weight-bold"
                      >
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />{" "}
                        Back
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
                              />
                            </label>
                          </div>
                        </div>
                        <div class="col-sm-6 text-right">
                          <div class="dt-buttons btn-group flex-wrap">
                            <button
                              class="btn btn-secondary buttons-print"
                              tabindex="0"
                              aria-controls="DataTables_Table_0"
                              type="button"
                            >
                              <span>Print</span>
                            </button>
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
                            </button>
                            <button
                              class="btn btn-secondary buttons-csv buttons-html5"
                              tabindex="0"
                              aria-controls="DataTables_Table_0"
                              type="button"
                            >
                              <span>CSV</span>
                            </button>
                            <button
                              class="btn btn-secondary buttons-pdf buttons-html5"
                              tabindex="0"
                              aria-controls="DataTables_Table_0"
                              type="button"
                            >
                              <span>PDF</span>
                            </button>
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
                                  style={{ width: "31px" }}
                                  aria-label="Pic: activate to sort column ascending"
                                >
                                  Pic
                                </th>
                                <th
                                  class="sorting"
                                  tabindex="0"
                                  aria-controls="DataTables_Table_0"
                                  rowspan="1"
                                  colspan="1"
                                  style={{ width: "168px" }}
                                  aria-label="User: activate to sort column ascending"
                                >
                                  User
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
                                  style={{ width: "168px" }}
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
                                  style={{ width: "68px" }}
                                  aria-label="Role: activate to sort column ascending"
                                >
                                  Role
                                </th>
                                <th
                                  class="sorting"
                                  tabindex="0"
                                  aria-controls="DataTables_Table_0"
                                  rowspan="1"
                                  colspan="1"
                                  style={{ width: "136px" }}
                                  aria-label="Desingation: activate to sort column ascending"
                                >
                                  Desingation
                                </th>
                                <th
                                  class="sorting"
                                  tabindex="0"
                                  aria-controls="DataTables_Table_0"
                                  rowspan="1"
                                  colspan="1"
                                  style={{ width: "153px" }}
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
                                  style={{ width: "89px" }}
                                  aria-label="Added By: activate to sort column ascending"
                                >
                                  Added By
                                </th>
                                <th
                                  class="sorting_desc"
                                  tabindex="0"
                                  aria-controls="DataTables_Table_0"
                                  rowspan="1"
                                  colspan="1"
                                  style={{ width: "106px" }}
                                  aria-label="Action: activate to sort column ascending"
                                  aria-sort="descending"
                                >
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {currentEntries.map((item) => (
                                <tr role="row" class="odd" key={item.id}>
                                  <td class="sorting_1 dtr-control"></td>
                                  <td>
                                    <img
                                      src="/default.png"
                                      className="img-fluid ccg_imgs"
                                    />
                                  </td>
                                  <td>
                                    {item.firstname + " " + item.lastname}
                                  </td>
                                  <td>{item.phoneno}</td>
                                  <td>{item.emailid}</td>
                                  <td>{item.role}</td>
                                  <td>{item.designation}</td>
                                  <td>
                                    {new Date(item.addedon).toLocaleString()}
                                  </td>
                                  <td>{item.addedby}</td>
                                  <td>
                                    <a
                                      onClick={() => {
                                        handleClickOnSheild(item);
                                      }}
                                    >
                                      <FontAwesomeIcon icon={faUserShield} />
                                    </a>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
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
                            {Math.min(indexOfLastEntry, data.length)} of{" "}
                            {data.length} entries
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
    </div>
  );
}
