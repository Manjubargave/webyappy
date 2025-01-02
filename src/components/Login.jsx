import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppData } from "../Providers/AppDataProvider";
import { API_BASE_URL } from "../constants/constants";
import axios from "axios";

export default function Login() {
  const [icon, setIcon] = useState(faEye);
  const [type, setType] = useState("password");
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { setToken } = useAppData();
  const [isClient, setIsClient] = useState(false);
  const [clientLogo, setClientLogo] = useState({});
  const token = localStorage.getItem("access");
  const navigate = useNavigate();
  function togglePassword() {
    if (type === "password") {
      setIcon(faEye);
      setType("text");
    } else {
      setIcon(faEyeSlash);
      setType("password");
    }
  }
  function handleUsername(event) {
    setUsername(event.target.value);
  }
  function handlePassword(event) {
    setPassword(event.target.value);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // Ensure username and password are not empty
      if (!username || !password) {
        console.error("Username and password are required");
        return;
      }

      // Make the request using axios to get access and refresh tokens
      const response = await axios.post(`${API_BASE_URL}/api/token/`, {
        username: username,
        password: password,
      });

      // Store the access and refresh tokens in localStorage
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      setToken(response.data.access);
      console.log("Login response", response);

      // Set submission status to true when successful
      if (response.data.access) {
        const clientResponse = await axios.get(
          `${API_BASE_URL}/clientdetails/`,
          {
            params: { emailid: username },
            headers: { Authorization: `Bearer ${response.data.access}` },
          }
        );
        console.log("Client Response Login", clientResponse.data);
        setIsClient(clientResponse.data.exists);
        setClientLogo(clientResponse.data.clientLogo);

        setIsSubmitted(true);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      alert("Login failed. Please check your credentials.");
    }
  }

  useEffect(() => {
    if (isSubmitted) {
      console.log("IsClient", isClient);
      if (isClient) {
        navigate("/clientdepartments", { state: { logo: clientLogo } });
      } else {
        navigate(`/departments/${username}`, { state: { username } });
      }
    }
  }, [isSubmitted, isClient]);

  return (
    <body className="quick-panel-right demo-panel-right offcanvas-right header-fixed header-mobile-fixed subheader-enabled aside-enabled aside-static page-loading">
      <video
        id="background-video"
        class="d-lg-block d-md-block d-sm-block"
        autoPlay
        loop
        muted
      >
        <source src="webyappy/banner_video.mp4" type="video/mp4" />
      </video>

      <div class="logincard" style={{ marginTop: "30rem" }}>
        <div class="d-flex flex-column-fluid flex-center mobile-cntr">
          <div class="login-form login-signin">
            <form className="form" onSubmit={handleSubmit}>
              <div class="pb-5 pt-lg-0 text-center">
                <img src="/webyappy/logo.png" class="max-h-55px" />
              </div>
              <div class="form-group input-containerrty45">
                <input
                  type="text"
                  id="email"
                  value={username}
                  placeholder=" "
                  required
                  onChange={handleUsername}
                />
                <label for="email" style={{ color: "black" }}>
                  Email ID<span class="text-danger"> *</span>
                </label>
              </div>
              <div class="form-group input-containerrty45">
                <input
                  type={type}
                  value={password}
                  id="password"
                  placeholder=" "
                  required
                  onChange={handlePassword}
                />

                <label for="password" style={{ color: "black" }}>
                  Password<span class="text-danger"> *</span>
                </label>
                <div onClick={togglePassword}>
                  {" "}
                  <FontAwesomeIcon
                    className="text-danger eye-icon"
                    icon={icon}
                    size="s"
                  />
                </div>
              </div>

              <div class="forgot_psd">
                <a
                  href=""
                  style={{ textDecoration: "underline", color: "#f64e60" }}
                >
                  Forgot Password?
                </a>
              </div>
              <div class="pb-lg-0">
                <button
                  type="submit"
                  id="login_btn"
                  style={{
                    backgroundColor: "#f26722",
                    color: "white",
                    fontSize: "1rem",
                  }}
                  class="btn btn-primary-loginpg9384 font-weight-bolder"
                >
                  Login
                </button>
              </div>
              <div class="pt-lg-0 text-center mt-4">
                Powered by <br />
                <img
                  src="https://webyappy.com/images/logo/webyappy.png"
                  class="max-h-20px"
                />
              </div>
              <div class="pt-lg-0 text-center mt-4">
                <a
                  href=""
                  style={{
                    color: "gray",
                    textDecoration: "underline",
                    fontSize: "11px",
                  }}
                >
                  Home
                </a>{" "}
                |
                <a
                  href=""
                  style={{
                    color: "gray",
                    textDecoration: "underline",
                    fontSize: "11px",
                  }}
                >
                  About
                </a>{" "}
                |
                <a
                  href=""
                  style={{
                    color: "gray",
                    textDecoration: "underline",
                    fontSize: "11px",
                  }}
                >
                  Team
                </a>{" "}
                |
                <a
                  href=""
                  style={{
                    color: "gray",
                    textDecoration: "underline",
                    fontSize: "11px",
                  }}
                >
                  Privacy Policy
                </a>{" "}
                |
                <a
                  href=""
                  style={{
                    color: "gray",
                    textDecoration: "underline",
                    fontSize: "11px",
                  }}
                >
                  Terms & Conditions
                </a>
              </div>
              <div class="mt-3 text-center">
                <a href="" style={{ color: "#f64e60" }}>
                  Client login (only for link)
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </body>
  );
}
