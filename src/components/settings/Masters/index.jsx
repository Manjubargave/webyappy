import "./Masters.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEdit,
  faTrash,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCurrentUser, fetchMasters } from "../../api";

export default function Masters() {
  const navigate = useNavigate();
  const token = localStorage.getItem("access");
  const [currentUser, setCurrentUser] = useState();
  const [businessid, setBusinessid] = useState();
  const [userDept, setUserDept] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = userDept.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(userDept.length / entriesPerPage);
  const location = useLocation();
  let backId;
  let masterid = location.state?.id || backId;
  backId = masterid;
  let masterName = "";
  if (masterid === "dep_user") {
    masterName = "User Department";
  } else if (masterid === "source") {
    masterName = "Source";
  }
  console.log("Master Name", masterName);
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

  function handleAddNew() {
    navigate("/departments/settings/masters/addnew", {
      state: { id: masterid, name: masterName },
    });
  }
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
        const data = await fetchMasters(
          token,
          currentUser.businessId,
          masterid
        );
        console.log(data);
        setUserDept(data);
      } catch (e) {
        console.log("Error", e);
      }
    };

    if (currentUser) {
      fetchData();
    }
  }, [currentUser, token]);
  return (
    <>
      <div
        class="d-flex flex-column flex-column-fluid content-ud"
        id="kt_content"
        style={{ paddingTop: "80px" }}
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
                      {masterName}
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
              <div class="d-flex align-items-center justify-content-between flex-wrap p-5 border-bottom">
                <div class="d-flex align-items-center flex-wrap mr-2">
                  <h5 class="text-dark font-weight-bold mb-0">
                    {masterName + " Masters"}{" "}
                  </h5>
                </div>
                <div class="d-flex align-items-center">
                  <a
                    onClick={() => {
                      navigate("/departments/settings");
                    }}
                    class="btn btn-default ml-5 font-weight-bold"
                  >
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" /> Back
                  </a>
                  <a>
                    <button
                      onClick={handleAddNew}
                      type="button"
                      data-toggle="modal"
                      data-target="#filter"
                      class="btn btn-primary btn-sm font-weight-bold"
                    >
                      + Add New
                    </button>
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
                        style={{ width: "1191px" }}
                      >
                        <thead>
                          <tr role="row">
                            <th
                              class="sorting_asc"
                              tabindex="0"
                              aria-controls="DataTables_Table_0"
                              rowspan="1"
                              colspan="1"
                              style={{ width: "82px" }}
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
                              style={{ width: "226px" }}
                              aria-label="Title: activate to sort column ascending"
                            >
                              Title
                            </th>
                            <th
                              class="sorting"
                              tabindex="0"
                              aria-controls="DataTables_Table_0"
                              rowspan="1"
                              colspan="1"
                              style={{ width: "375px" }}
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
                              style={{ width: "220px" }}
                              aria-label="Added by: activate to sort column ascending"
                            >
                              Added by
                            </th>
                            <th
                              class="sorting"
                              tabindex="0"
                              aria-controls="DataTables_Table_0"
                              rowspan="1"
                              colspan="1"
                              style={{ width: "138px" }}
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

                              <td>{item.fieldValue}</td>
                              <td>{new Date(item.addedon).toLocaleString()}</td>
                              <td>{item.addedby}</td>
                              <td>
                                <a
                                  href="#"
                                  class="btn btn-sm btn-clean btn-icon mr-2"
                                  title="Edit"
                                >
                                  <div>
                                    <FontAwesomeIcon
                                      icon={faEdit}
                                      className="text-primary"
                                    />
                                  </div>
                                </a>

                                <a
                                  href="#"
                                  class="btn btn-sm btn-clean btn-icon mr-2"
                                  title="Delete"
                                >
                                  <div>
                                    <FontAwesomeIcon
                                      icon={faTrash}
                                      className="text-primary"
                                    />
                                  </div>
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
                        {Math.min(indexOfLastEntry, userDept.length)} of{" "}
                        {userDept.length} entries
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
    </>
  );
}
