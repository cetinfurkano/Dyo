import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import "../../assets/css/distributor/performance.css";
import DistOperations from "../../logics/Distributor/DistOperations"

function TeacherEdit({ row }) {

    const handleClick = (e) => {
        DistOperations.removeTeacher(row.id);
    }

  return (
    <div className="dropdown d-inline">
      <button
        type="button"
        className="btn"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i className="fa fa-pencil-square-o"></i>
      </button>
      <div
        className="dropdown-menu dropdown-menu-right"
        aria-labelledby="dropdownMenuButton"
      >
        <a className="dropdown-item" href="#" onClick={handleClick}>
          <i className="fa fa-trash"></i> Sil
        </a>   
      </div>
     
    </div>
  );
}

export default TeacherEdit;
