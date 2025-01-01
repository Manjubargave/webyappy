import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faList } from "@fortawesome/free-solid-svg-icons";
import { fetchCurrentUser } from "./api";
import { useState, useEffect } from "react";
import axios from "axios";
import { cardData } from "./CardData";
import { useNavigate } from "react-router-dom";
import "./QuickListAction.css";
import { useAppData } from "../Providers/AppDataProvider";

export default function QuickListAction({ toggleFunc }) {
  const token = localStorage.getItem("access");
  const navigate = useNavigate();
  let formattedArray = [];
  const { departments, isClient } = useAppData();
  console.log("Departments from context", departments);

  if (departments) {
    const transformedData = departments.reduce(
      (result, { department, apps }) => {
        // Check if the department exists in the result
        if (!result[department]) {
          result[department] = { department, apps: [] };
        }
        // Add the app to the department's app list
        result[department].apps.push(apps);
        return result;
      },
      {}
    );

    formattedArray = Object.values(transformedData);
    // console.log(formattedArray);
  }

  return (
    <>
      <div
        class="aside aside-right d-flex flex-column flex-row-auto aside-on"
        id="kt_aside"
        style={{ fontSize: "7px", maxHeight: "800px", overflowY: "auto" }}
      >
        <div
          class="aside-menu-wrapper flex-column-fluid scroll ps ps--active-y"
          id="kt_aside_menu_wrapper"
        >
          <div
            id="kt_aside_menu"
            class="aside-menu min-h-lg-800px"
            data-menu-vertical="1"
            data-menu-scroll="1"
            data-menu-dropdown-timeout="500"
            style={{ maxHeight: "800px", overflowY: "auto" }}
          >
            <ul class="menu-nav">
              <li class="menu-item menu-item-active" aria-haspopup="true">
                <a class="menu-link">
                  <span class="svg-icon menu-icon">
                    <div className="icon-md">
                      <FontAwesomeIcon icon={faList} />
                    </div>
                  </span>
                  <span class="menu-text">All Microapps</span>
                  <div onClick={toggleFunc}>
                    <FontAwesomeIcon icon={faTimes} className="text-muted" />
                  </div>
                </a>
                <span class="pt-2 pl-2 pr-2 pb-0">
                  <input
                    type="text"
                    class="form-control tbl_inpts"
                    name="address1"
                    placeholder="Search Microapp"
                  />
                </span>
              </li>
              {isClient && <p>Client</p>}
              {cardData.map((card) => {
                const department = formattedArray.find(
                  (dep) => dep.department === card.value
                );
                console.log("Departments", department, card.title);

                return (
                  department && (
                    <>
                      <li class="menu-section">
                        <h4 class="menu-text">
                          <span class="svg-icon svg-icon-primary svg-icon-1.5x mr-2">
                            {card.icon}
                          </span>
                          {card.title}
                        </h4>
                      </li>
                      <li class="menu-item menu-item-submenu">
                        <div class="menu-submenu cstm-submenu">
                          <ul class="menu-subnav">
                            {department.apps.map((app) => {
                              const appName = app
                                .replace(/([A-Z])/g, " $1")
                                .replace(/^./, (str) => str.toUpperCase());
                              const appLink = `/departments/${
                                card.value
                              }/${app.toLowerCase()}`;
                              return (
                                <li class="menu-item">
                                  <a
                                    class="menu-link"
                                    onClick={() => navigate(appLink)}
                                  >
                                    <i class="menu-bullet menu-bullet-dot">
                                      <span></span>
                                    </i>
                                    <span class="menu-text">{appName}</span>
                                  </a>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </li>
                    </>
                  )
                );
              })}
            </ul>
          </div>

          <div class="ps__rail-x" style={{ left: "0px", bottom: "0px" }}>
            <div
              class="ps__thumb-x"
              tabindex="0"
              style={{ left: "0px", width: "0px" }}
            ></div>
          </div>
          <div
            class="ps__rail-y"
            style={{ top: "0px", height: "500px", right: "0px" }}
          >
            <div
              class="ps__thumb-y"
              tabindex="0"
              style={{ top: "0px", height: "500px" }}
            ></div>
          </div>
        </div>
      </div>
      <div class="aside-overlay"></div>
    </>
  );
}
