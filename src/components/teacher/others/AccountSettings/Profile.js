import React, { useState } from "react";
import TeacherOperations from "../../../../logics/Teacher/TeacherOperations";

function Profile({teacher, setTeacher}) {

  const handleTeacherUpdate = (e) => {
    TeacherOperations.updateTeacher(teacher);
  }
  


  return (
    <div className="tab-pane active" id="profile">
      <h6>Profil Bilgilerin</h6>
      <hr />
      <form>
        <div className="form-group">
          <label htmlFor="fullName">Adın</label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            aria-describedby="fullNameHelp"
            placeholder="Adını Gir"
            value={teacher && teacher.firstName}  
            onChange={e => setTeacher({...teacher, firstName: e.target.value})}
          />
          <small id="fullNameHelp" className="form-text text-muted">
            Adın ve Soyadın sipariş verirken görülecek. İstediğin zaman değiştirebilirsin.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Soyadın</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            aria-describedby="lastNameHelp"
            placeholder="Soyadını Gir"
            value={teacher && teacher.lastName}  
            onChange={e => setTeacher({...teacher, lastName: e.target.value})}
          />
          <small id="lastNameHelp" className="form-text text-muted">
            Adın ve Soyadın sipariş verirken görülecek. İstediğin zaman değiştirebilirsin.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="city">Şehir</label>
          <input
            type="text"
            className="form-control"
            id="city"       
            placeholder="Şehir Gir"
            value={teacher && teacher.address.city}  
            onChange={e => {
               const address = {...teacher.address};
               address.city = e.target.value;
               setTeacher({...teacher, address: address});
            }}
          />
          
        </div>
        <div className="form-group">
          <label htmlFor="district">İlçe</label>
          <input
            type="text"
            className="form-control"
            id="district"     
            placeholder="İlçeyi Gir"
            value={teacher && teacher.address.district}
            onChange={e => {
              const address = {...teacher.address};
              address.district = e.target.value;
              setTeacher({...teacher, address: address});
            }}
          />
          
        </div>
        <div className="form-group">
          <label htmlFor="addressDescription">Adres Tanımın</label>
          <textarea
            className="form-control autosize"
            id="addressDescription"
            value={teacher && teacher.address.addressDescription}
            placeholder="Adres tanımını gir"
            style={{
              overflow: "hidden",
              overflowWrap: "break-word",
              resize: "none",
              height: "62px",
            }}
            onChange={e => {
              const address = {...teacher.address};
              address.addressDescription = e.target.value;
              setTeacher({...teacher, addressDescription: address});
           }}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="location">Okulun</label>
          <input
            type="text"
            className="form-control"
            id="location"
            placeholder="Enter your location"
            value={teacher && teacher.school}
            onChange={e => setTeacher({...teacher, school:e.target.value})}
           
          />
        </div>
        <div className="form-group small text-muted">
          Bu sayfadaki her alan istenildiği zaman değiştirilebilir. Bu
          bilgilerinizi paylaşmak için bize izin vermiş sayılırsınız.
        </div>
        <button type="button" className="btn update-profile" onClick={handleTeacherUpdate}>
          Profili Güncelle
        </button>
        <button type="reset" className="btn btn-light">
          Geri Al
        </button>
      </form>
    </div>
  );
}

export default Profile;
