import React, { useState, useRef, useEffect } from "react";
import SignUpDist from "./SignUpDist";
import SignUpTeacher from "./SignUpTeacher";
import InputField from "./SubComponents/InputField";
import Socials from "./SubComponents/Socials";
import Authentication from "../../logics/Authentication"


function SignUp({setRedirectToReferrer}) {
  const [regisTerType, setRegisterType] = useState(1);
  const currentTab = useRef(0);
  const distButtonRef = useRef(null);
  const teachButtonRef = useRef(null);
  const signUpformRef = useRef(null);
  
 
  const [distributorRegisterFields, setDistributorRegisterFields] = useState({
    "firstName": "",
    "lastName": "",
    "email": "",
    "phoneNumber": "",
    "officeAddress": "",
    "password": "",
  });

  const [teacherRegisterFields, setTeacherRegisterFields] = useState({
    "firstName": "",
    "lastName": "",
    "email": "",
    "phoneNumber": "",
    "address": { city: "", district: "", addressDescription: "" },
    "password": "",
    "school": "",
    "branch": "",
    "distributorId": "",
  });

  function showTab(n) {
    // This function will display the specified tab of the form ...
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    // ... and fix the Previous/Next buttons:
    if (n == 0) {
      document.getElementById("prevBtn").style.display = "none";
    } else {
      document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == x.length - 1) {
      document.getElementById("nextBtn").classList.remove("stepButton");
      document.getElementById("nextBtn").classList.add("btn");
      document.getElementById("nextBtn").innerHTML = "Kaydol";
    } else {
      var nextButton = document.getElementById("nextBtn");
      if (!nextButton.classList.contains("stepButton"))
        nextButton.classList.add("stepButton");
      if (nextButton.classList.contains("btn"))
        nextButton.classList.remove("btn");
      document.getElementById("nextBtn").innerHTML =
        "<i class='fas fa-arrow-circle-right' area-hidden='true'></i>";
    }
  }

  function nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // Hide the current tab:
    if(currentTab.current >= x.length){
      
      currentTab.current -= 1;
  }
  x[currentTab.current].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab.current = currentTab.current + n;
    // if you have reached the end of the form... :
    if (currentTab.current >= x.length) {
      var fields = regisTerType === 1 ? distributorRegisterFields : teacherRegisterFields;
      Authentication.register({data: fields, registerType: regisTerType}, () => {
        setRedirectToReferrer(true);
      });
     
      return false;
    }
    // Otherwise, display the correct tab:
    //buraya bir ayar çek
    showTab(currentTab.current);
  }

  useEffect(() => {
    if (regisTerType === 1) {
      if (!distButtonRef.current.classList.contains("activeType")) {
        distButtonRef.current.classList.add("activeType");
      }
      teachButtonRef.current.classList.remove("activeType");
    } else {
      if (!teachButtonRef.current.classList.contains("activeType")) {
        teachButtonRef.current.classList.add("activeType");
      }
      distButtonRef.current.classList.remove("activeType");
    }
    showTab(currentTab.current);
  },[regisTerType]);

  return (
    <form action="#" className="sign-up-form" ref={signUpformRef}>
      <h2 className="title">Kaydol</h2>
      {regisTerType === 1 ? (
        <SignUpDist
          fields={distributorRegisterFields}
          setRegisterData={setDistributorRegisterFields}
        />
      ) : (
        <SignUpTeacher
          fields={teacherRegisterFields}
          setRegisterData={setTeacherRegisterFields}
        />
      )}

      <div style={{ overflow: "auto" }}>
        <div style={{ float: "right" }}>
          <button
            className="stepButton"
            type="button"
            id="prevBtn"
            onClick={(e) => nextPrev(-1)}
          >
            <i className="fas fa-arrow-circle-left"></i>
          </button>
          <button
            type="button"
            className="stepButton"
            id="nextBtn"
            onClick={(e) => nextPrev(1)}
          >
            <i className="fas fa-arrow-circle-right"></i>
          </button>
        </div>
      </div>

      <div className="registerTypes">
        <button
          type="button"
          className="btn btn-dist activeType"
          onClick={(e) => setRegisterType(1)}
          ref={distButtonRef}
        >
          Distribütör
        </button>
        <button
          type="button"
          className="btn btn-teacher"
          onClick={(e) => setRegisterType(0)}
          ref={teachButtonRef}
        >
          Öğretmen
        </button>
      </div>
      <p className="social-text">
        <strong>Bizi Takip Et</strong>
      </p>
      <Socials />
    </form>
  );
}

export default SignUp;
