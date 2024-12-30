import { useEffect, useState } from "react";
import Footer from "../Footer";
import Header from "../Header";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useAppData } from "../../Providers/AppDataProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  faArrowLeft,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { API_BASE_URL } from "../../constants/constants";

export default function Microapps() {
  const location = useLocation();
  const details = location.state?.details;
  const token = localStorage.getItem("access");
  const { currentUser } = useAppData();
  const [departments, setDepartments] = useState([]);
  const [filter, setFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const totalPages = Math.ceil(departments.length / entriesPerPage);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const app = location.state?.app;
  console.log("Details in microapps", details);

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

  function handleMap(item) {
    if (app === "mapMicroapps") {
      navigate("/departments/modules/mapdepartments/microapps/mapmicroapps", {
        state: { details: details, depdetails: item },
      });
    } else if (app === "mapFields") {
      const depMicroapps = departments.filter(
        (dep) => dep.department === item.department
      );
      navigate(
        "/departments/modules/mapdepartments/microapps/mapmicroapps/mapfields",
        { state: { clientdeps: depMicroapps, details: details } }
      );
    }
  }

  useEffect(() => {
    async function fetchMicroapps() {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/clientmicroapps/`,

          {
            params: { emailid: details.emailid },
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Microapps Client", response.data);
        setDepartments(response.data);
      } catch (e) {
        console.error("Error fetching microapps:", e);
      }
    }

    if (details.emailid) {
      // Ensure emailid is available before fetching
      fetchMicroapps();
    }
  }, [token, details.emailid]);

  console.log("Inside filtered data", departments);
  const filteredData = departments.filter((row) =>
    Object.values(row).some(
      (value) =>
        value && value.toString().toLowerCase().includes(query.toLowerCase())
    )
  );
  console.log("Filtered data in microapps", filteredData);

  console.log("FV", filteredData);
  const currentEntries = filteredData.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );

  return (
    <>
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
                    <a class="text-muted">Modules</a>
                  </li>
                  <li class="breadcrumb-item">
                    <a class="text-muted">Map Microapp</a>
                  </li>
                  <li class="breadcrumb-item">
                    <a href="#" class="text-muted">
                      {details.entityName}
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
                    {details.entityName}- Select Department
                  </h5>
                </div>
                <div class="d-flex align-items-center">
                  <a class="btn btn-default ml-5 font-weight-bold">
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
                            type="search"
                            class="form-control form-control-sm"
                            placeholder=""
                            aria-controls="DataTables_Table_0"
                            onChange={(event) => setQuery(event.target.value)}
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
                        style={{ width: "1192px" }}
                      >
                        <thead>
                          <tr role="row">
                            <th
                              class="sorting_asc"
                              tabindex="0"
                              aria-controls="DataTables_Table_0"
                              rowspan="1"
                              colspan="1"
                              style={{ width: "52px" }}
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
                              style={{ width: "193px" }}
                              aria-label="Department: activate to sort column ascending"
                            >
                              Department
                            </th>
                            <th
                              class="sorting"
                              tabindex="0"
                              aria-controls="DataTables_Table_0"
                              rowspan="1"
                              colspan="1"
                              style={{ width: "211px" }}
                              aria-label="Display Name: activate to sort column ascending"
                            >
                              Display Name
                            </th>
                            <th
                              class="sorting"
                              tabindex="0"
                              aria-controls="DataTables_Table_0"
                              rowspan="1"
                              colspan="1"
                              style={{ width: "256px" }}
                              aria-label="Updated on: activate to sort column ascending"
                            >
                              Updated on
                            </th>
                            <th
                              class="sorting"
                              tabindex="0"
                              aria-controls="DataTables_Table_0"
                              rowspan="1"
                              colspan="1"
                              style={{ width: "184px" }}
                              aria-label="Updated by: activate to sort column ascending"
                            >
                              Updated by
                            </th>
                            <th
                              class="sorting"
                              tabindex="0"
                              aria-controls="DataTables_Table_0"
                              rowspan="1"
                              colspan="1"
                              style={{ width: "110px" }}
                              aria-label="Action: activate to sort column ascending"
                            >
                              Action
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {currentEntries
                            .filter(
                              (item, index, self) =>
                                self.findIndex(
                                  (t) => t.department === item.department
                                ) === index
                            )
                            .map((item) => (
                              <tr role="row" className="odd" key={item.id}>
                                <td className="sorting_1 dtr-control"></td>
                                <td>{item.department}</td>
                                <td>{item.emailid}</td>
                                <td>
                                  {new Date(item.updatedon).toLocaleString()}
                                </td>
                                <td>{item.updatedby}</td>
                                <td>
                                  <span className="btn-third839">
                                    <a
                                      onClick={() => handleMap(item)}
                                      className="mr-2"
                                      title="Switch to client login"
                                    >
                                      Map
                                    </a>
                                  </span>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/* <div class="row"><div class="col-sm-12 col-md-5"><div class="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">Showing 1 to 3 of 3 entries</div></div><div class="col-sm-12 col-md-7 dataTables_pager"><div class="dataTables_length" id="DataTables_Table_0_length"><label>Show <select name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" class="custom-select custom-select-sm form-control form-control-sm"><option value="10">10</option><option value="25">25</option><option value="50">50</option><option value="100">100</option></select> entries</label></div><div class="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate"><ul class="pagination"><li class="paginate_button page-item previous disabled" id="DataTables_Table_0_previous"><a href="#" aria-controls="DataTables_Table_0" data-dt-idx="0" tabindex="0" class="page-link"><i class="ki ki-arrow-back"></i></a></li><li class="paginate_button page-item active"><a href="#" aria-controls="DataTables_Table_0" data-dt-idx="1" tabindex="0" class="page-link">1</a></li><li class="paginate_button page-item next disabled" id="DataTables_Table_0_next"><a href="#" aria-controls="DataTables_Table_0" data-dt-idx="2" tabindex="0" class="page-link"><i class="ki ki-arrow-next"></i></a></li></ul></div></div></div> */}

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
    </>
  );
}
