import React, { useState } from "react";
import "../../assets/css/distributor/dist-input.css";
import GLOBAL_DATA from "../GLOBAL_DATA.json";
import Select from "react-select";
import DistOperations from "../../logics/Distributor/DistOperations";

function TeacherInput({ setModalShow, setTeachers }) {
  const [teacher, setTeacher] = useState({firstName:"",lastName:"",phoneNumber:"", branch:"", school:""});
  const handleSubmit = (e) => {
    DistOperations.addTeacher(teacher, (data)=> {
      setTeachers(prevTeachers => {
         const teachers = [...prevTeachers];
         teachers.push(data);
         return teachers;
      });
      setModalShow(false);
    });
  };

  return (
    <div className="DistInput">
      <div className="dist_input_container">
        <div className="title">Öğretmeni Hızlıca Kaydet!</div>
        <div className="content">
          <form action="#">
            <div className="dist-details">
              <div className="input-box">
                <span className="details">Öğretmen Adı</span>
                <input
                  type="text"
                  placeholder="Öğretmen adı"
                  required
                  value={teacher.firstName}
                  onChange={(e) =>
                    setTeacher({ ...teacher, firstName: e.target.value })
                  }
                />
              </div>
              <div className="input-box">
                <span className="details">Öğretmen Soyadı </span>
                <input
                  type="text"
                  placeholder="Öğretmen soyadı"
                  required
                  value={teacher.lastName}
                  onChange={(e) =>
                    setTeacher({ ...teacher, lastName: e.target.value })
                  }
                />
              </div>
              <div className="input-box">
                <span className="details">Okul adı</span>
                <input
                  type="text"
                  placeholder="Okul adı"
                  required
                  value={teacher.school}
                  onChange={(e) =>
                    setTeacher({ ...teacher, school: e.target.value })
                  }
                />
              </div>
              <div className="input-box">
                <span className="details">Telefon Numarası</span>
                <input
                  type="text"
                  placeholder="Öğretmen telefon numarası"
                  required
                  value={teacher.phoneNumber}
                  onChange={e => {
                    const regexp = /^[0-9\b]+$/;
                    if(e.target.value === "" || regexp.test(e.target.value)) {
                      setTeacher({ ...teacher, phoneNumber: e.target.value})     
                    }  
 
                    
                  }}
                 
                />
              </div>
              <div className="input-box">
                <span className="details">Öğretmen Branşı </span>
                <input
                  type="text"
                  placeholder="Öğretmen branşı"
                  required
                  value={teacher.branch}
                  onChange={(e) =>
                    setTeacher({ ...teacher, branch: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="button">
              <input type="submit" value="Kaydet" onClick={handleSubmit} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TeacherInput;
