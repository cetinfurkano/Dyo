import React, { useState, useEffect } from "react";
import "../../../../assets/css/teacher/accountSettings.css";
import Account from "./Account";
import Billing from "./Billing";
import Profile from "./Profile";
import Security from "./Security";
import Nav from "./Nav/Nav";
import NavMobil from "./Nav/NavMobil/NavMobil";
import TeacherOperations from "../../../../logics/Teacher/TeacherOperations";

function AccountSettings() {
  const [teacher, setTeacher] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: { city: "", district: "", addressDescription: "" },
    password: "",
    school: "",
    branch: "",
    distributorId: "",
  });
  

  useEffect(() => {
    TeacherOperations.getTeacher((data) => {
      setTeacher(data);
    });
  }, []);
  
  return (
    <div className="AccountSettings">
      <div className="container mt-4">
        <div className="row gutters-sm">
          <div className="col-md-4 d-none d-md-block">
            <Nav />
          </div>
          <div className="col-md-8">
            <div className="card">
              <NavMobil />
              <div className="card-body tab-content">
                <Profile teacher={teacher} setTeacher={setTeacher} />
                <Account teacher={teacher} setTeacher={setTeacher} />
                <Security teacher={teacher} setTeacher={setTeacher} />
                <Billing />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
