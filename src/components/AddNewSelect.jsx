import { useState, useEffect } from "react";
import "./AddNewSelect.css";
import { fetchCurrentUser, fetchBusinessData } from "./api";
import axios from "axios";
import { API_BASE_URL } from "../constants/constants";

export default function AddNewSelect({ onClose, id }) {
  const [newDepartment, setNewDepartment] = useState([{ title: "" }]);
  const [currentUser, setCurrentUser] = useState();
  const [businessid, setBusinessid] = useState();
  const token = localStorage.getItem("access");

  console.log("Inside addnew select");
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

  async function handleSubmit(e) {
    console.log("Inside AddNew Select submit", id);
    e.preventDefault();
    try {
      // Send the departments array to the Django backend
      const response = await axios.post(`${API_BASE_URL}/masters/`, {
        businessid: currentUser.businessId,
        fieldId: id,
        fieldValue: newDepartment,
        addedby: currentUser.firstname,
      });

      console.log("Response from Django:", response.data);
    } catch (error) {
      console.error("Error posting the data to Django:", error);
    }
    if (newDepartment) {
      onClose(newDepartment[0].title);
    }
  }
  return (
    <div className="modaladdnew">
      <div className="modal-content">
        <h4>Add New Department</h4>
        <input
          type="text"
          value={newDepartment[0].title}
          onChange={(e) => setNewDepartment([{ title: e.target.value }])}
          placeholder="Enter department name"
        />
        <button
          type="button"
          className="btn btn-success"
          onClick={handleSubmit}
        >
          Add Department
        </button>
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
