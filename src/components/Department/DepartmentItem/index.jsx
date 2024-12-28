import React from "react";
import { useNavigate } from "react-router-dom";

const DepartmentItem = ({ card }) => {
  const navigate = useNavigate();
  return (
    <div className="col-xl-3" key={card.value}>
      <a onClick={() => navigate(card.link)}>
        <div className="card card-custom gutter-b card-stretch depart_bg">
          <div className="card-body text-center pt-4 pb-4">
            <div className="mt-7">
              <span className="svg-icon svg-icon-primary svg-icon-5x">
                {card.icon}
              </span>
            </div>
            <div className="my-7">
              <p className="text-dark font-weight-bold text-hover-danger font-size-h6">
                {card.title}
              </p>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default DepartmentItem;
