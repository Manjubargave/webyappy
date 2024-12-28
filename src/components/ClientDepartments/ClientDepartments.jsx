import Footer from "../Footer";
import Header from "../Header";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import axios from "axios";
import AddNotes from "../AddNotes";
import Scoreboard from "../Scoreboard";
import DeleteNotes from "../DeleteNotes";
import EditNotes from "../EditNotes";
import Salesboard from "../Salesboard";
import { useAppData } from "../../Providers/AppDataProvider";

import "./ClientDepartments.css";
import ClientSettings from "./ClientSettings";

export default function ClientDepartments() {
  const location = useLocation();
  const logo = location.state?.logo;
  console.log("Logo", logo);
  const [date, setDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(date.getMonth());
  const [currentYear, setCurrentYear] = useState(date.getFullYear());
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [editingNote, setEditingNote] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("access"));
  const [isAddModelOpen, setIsAddModelOpen] = useState(false);
  const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);
  const { departments, isClient } = useAppData();
  const [id, setId] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const { content, setContent } = useAppData();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Update the clock every second
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  console.log("Departments on ClientDepartments", departments);
  useEffect(() => {
    if (isClient && !initialized && departments.length > 0) {
      console.log("Inside isClient and initialized", departments);
      for (const item of departments) {
        console.log("item", item);
        if (item.department === "scoreboard") {
          console.log("Setting scoreboard");
          setContent("scoreboard");
          break;
        } else if (item.department === "salesboard") {
          console.log("Setting salesboard");

          setContent("salesboard");
          break;
        } else if (item.department === "settings") {
          setContent("settings");
          console.log("Setting settings");
        }
      }
      setInitialized(true);
      console.log(content); // "scoreboard", "salesboard", "settings", or undefined
    }
  }, [isClient, initialized, departments]);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prevYear) => prevYear - 1);
    } else {
      setCurrentMonth((prevMonth) => prevMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prevYear) => prevYear + 1);
    } else {
      setCurrentMonth((prevMonth) => prevMonth + 1);
    }
  };

  const renderDates = () => {
    // Calculate the total days in the current month
    const daysInCurrentMonth = daysInMonth(currentMonth, currentYear);
    const dates = [];

    // Add empty divs for the days before the 1st of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      dates.push(<div key={`empty-${i}`} className="empty-date"></div>);
    }

    // Add divs for the dates in the current month
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      // Check if the current date is today
      const isToday =
        i === date.getDate() &&
        currentMonth === date.getMonth() &&
        currentYear === date.getFullYear();

      dates.push(
        <div key={i} className={`date ${isToday ? "today" : ""}`}>
          {i}
        </div>
      );
    }

    return dates;
  };

  useEffect(() => {
    const fetchNotes = async () => {
      console.log("Content", content);
      try {
        const response = await axios.get("http://127.0.0.1:8000/notes/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotes(response.data);
      } catch (err) {
        console.error("Error fetching notes:", err);
      }
    };
    fetchNotes();
  }, [token, isAddModelOpen, isDeleteModelOpen, isEdit, content]);

  function handleEdit(note) {
    setIsEdit(!isEdit);
    setEditingNote(note);
  }

  function handleDelete(id) {
    setIsDeleteModelOpen(!isDeleteModelOpen);
    setId(id);
  }
  function handleAddNotes() {
    console.log("Add notes");
    setIsAddModelOpen(!isAddModelOpen);
  }

  return (
    <>
      {content === "settings" ? (
        // Render only the settings component when content is "settings"
        <ClientSettings />
      ) : (
        <>
          {isAddModelOpen && <AddNotes onClose={handleAddNotes} />}
          {isDeleteModelOpen && <DeleteNotes onClose={handleDelete} id={id} />}
          {isEdit && <EditNotes onClose={handleEdit} note={editingNote} />}

          <Header logo={logo} />

          <div
            class="d-flex flex-column flex-column-fluid content"
            style={{ paddingTop: "80px" }}
            id="kt_content"
          >
            <div class="subheader subheader-transparent" id="kt_subheader">
              <div class="container-fluid">
                <div class="d-flex align-items-center mr-1 mt-2 mb-2">
                  <h5>Scoreboard</h5>
                </div>
              </div>
            </div>
            <div class="d-flex flex-column-fluid">
              <div class="container-fluid">
                <div class="row">
                  <div className="col-lg-8 col-md-8 col-sm-6 col-12">
                    {/* {content === 'scoreboard' && <Scoreboard/>|| content === 'salesboard' && <Salesboard/> ||content === 'settings' && <ClientSettings/>} */}

                    {content === "scoreboard" ? (
                      <Scoreboard />
                    ) : content === "salesboard" ? (
                      <Salesboard />
                    ) : (
                      <></>
                    )}
                  </div>
                  <div class="col-lg-4 col-md-4 col-sm-6 col-12">
                    <div class="card card-custom gutter-b card-stretch">
                      <div class="card-body">
                        <div class="row">
                          <div className="col-12">
                            <div className="d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap border-bottom-gr pb-2">
                              <h5 className="text-dark font-weight-bold">
                                Notes
                              </h5>
                              <button
                                className="btn btn-primary font-weight-bold"
                                onClick={handleAddNotes}
                              >
                                + Add Notes
                              </button>
                            </div>
                            <div className="mt-4">
                              {notes.map((note) => (
                                <div
                                  key={note.id}
                                  className="card-tubedetails mt-2"
                                >
                                  <div className="d-flex justify-content-between">
                                    <h6>{note.title}</h6>
                                    <div>
                                      <FontAwesomeIcon
                                        icon={faEdit}
                                        className="text-danger mr-2"
                                        onClick={() => handleEdit(note)}
                                      />
                                      <FontAwesomeIcon
                                        icon={faTrash}
                                        className="text-danger mr-2"
                                        onClick={() => handleDelete(note.id)}
                                      />
                                    </div>
                                  </div>
                                  <p>{note.content}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="col-12 mt-5 border-top-gr border-bottom-gr">
                            <div id="calendar-container">
                              {/* Current Date */}
                              <div id="current-date">
                                {date.toLocaleDateString("en-US", {
                                  weekday: "long",
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                })}
                              </div>

                              {/* Clock */}
                              <div id="clock">
                                {date.toLocaleTimeString("en-US", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  second: "2-digit",
                                  hour12: true,
                                })}
                              </div>

                              {/* Calendar */}
                              <div id="calendar">
                                <div className="calendar-header">
                                  <span
                                    className="arrow"
                                    id="prev-month"
                                    onClick={handlePrevMonth}
                                  >
                                    ❮
                                  </span>
                                  <div id="month-year">
                                    {new Date(
                                      currentYear,
                                      currentMonth
                                    ).toLocaleString("en-US", {
                                      month: "long",
                                      year: "numeric",
                                    })}
                                  </div>
                                  <span
                                    className="arrow"
                                    id="next-month"
                                    onClick={handleNextMonth}
                                  >
                                    ❯
                                  </span>
                                </div>
                                <div className="days">
                                  <div>Su</div>
                                  <div>Mo</div>
                                  <div>Tu</div>
                                  <div>We</div>
                                  <div>Th</div>
                                  <div>Fr</div>
                                  <div>Sa</div>
                                </div>
                                <div id="dates" className="date-grid">
                                  {renderDates()}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="col-12 mt-2 border-bottom-gr pt-2">
                            <div class="d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap pb-2">
                              <div class="d-flex align-items-center flex-wrap">
                                <h5 class="text-dark font-weight-bold">
                                  Featured News
                                </h5>
                              </div>
                            </div>
                            <div class="card mb-4">
                              <img
                                class="card-img-top"
                                src="https://www.hindustantimes.com/ht-img/img/2024/10/18/550x309/HYUNDAI-INDIA-IPO-0_1728981016701_1729226890981.JPG"
                                alt="Hyundai"
                              />
                              <div class="card-body">
                                <h5 class="card-title">
                                  Hyundai IPO to be allotted today: Here's how
                                  to check status online
                                </h5>
                                <p class="card-text">
                                  Hyundai IPO allotment: Share allotment for
                                  Hyundai Motor India IPO is expected on October
                                  18, with shares listing on BSE and NSE on
                                  October 22.
                                </p>
                                <a
                                  href="https://www.hindustantimes.com/business/hyundai-ipo-allotment-hyundai-ipo-to-be-allotted-today-heres-how-to-check-status-online-101729226385348.html"
                                  target="_blank"
                                  a=""
                                  class="btn btn-primary"
                                >
                                  Read more
                                </a>
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
      )}
    </>
  );
}
