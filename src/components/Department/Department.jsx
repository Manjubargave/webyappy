// import Header from "../Header";
// import Footer from "../Footer";
import "./Department.css";
import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { cardData } from "../CardData";
import DepartmentItem from "./DepartmentItem";
import { API_BASE_URL } from "../../constants/constants";

export default function Department() {
  const isSuperAdmin = useState(false);
  const location = useLocation();
  const email = useParams();
  const [logo, setLogo] = useState("");
  const token = localStorage.getItem("access");
  console.log("Params", email);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    // Update logoUrl if passed in navigation state

    if (location.state && location.state.logo) {
      setLogo(location.state.logo);
    }
  }, [location]);

  function selectedDepartments(data) {
    const departments = [];
    console.log("Inside selected dep");
    data.forEach((value) => {
      departments.push(value.department);
    });
    console.log("Departments", departments);
    return departments;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/assignmicroapps/`,

          {
            params: { emailid: email.email },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach token in header
            },
          }
        );

        //
        setDepartments(selectedDepartments(response.data));
        console.log("Selected Microapps", response.data);
        // console.log(selectedMicroapps[0].emailid)
        // console.log(selectedMicroapps.some((obj)=>obj.emailid === user.emailid && obj.apps ==="Add Clients")) // Adjust based on your API response structure
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
          {/* <Header logo={logo} /> */}
          <div
            class="d-flex flex-column flex-column-fluid content-dep"
            id="kt_content"
          >
            <div
              class="subheader subheader-transparent mt-2 mb-5 container-fluid d-flex align-tems-center container-fluid text-dark font-weight-bold"
              id="kt_subheader"
            >
              Department
            </div>

            <div class="d-flex flex-column-fluid">
              <div class="container-fluid row">
                {cardData.map(
                  (card) =>
                    departments.includes(card.value) && (
                      <DepartmentItem card={card} />
                    )
                )}
              </div>
            </div>
          </div>

          {/* <div>
            <Footer />
          </div> */}
        </div>
      </div>
    </div>
  );
}
