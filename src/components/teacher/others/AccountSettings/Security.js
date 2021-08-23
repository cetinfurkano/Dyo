import React,{useState} from "react";
import {
  LoadingModal,
  Alert_Delete,
  Alert_Error,
  Alert_Info,
  Alert_Update,
  LoadingModalClose,
} from "../../../../logics/SweetAlert";
import TeacherOperations from "../../../../logics/Teacher/TeacherOperations";

function Security({teacher, setTeacher}) {
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")

    const inputOldChangeHandler = (event) => {
        const oldPasswordValue = event.target.value;
        setOldPassword(oldPasswordValue);
    }
    const inputNewChangeHandler = (event) => {
        const newPasswordValue = event.target.value;
        setNewPassword(newPasswordValue);
    }
    const inputConfirmChangeHandler = (event) => {
        const confirmPasswordValue = event.target.value;
        setconfirmPassword(confirmPasswordValue);
    }

    const handleUpdatePasswordClick = (e) => {
      if(newPassword != confirmPassword){
        Alert_Error("Hata", "Yeni ve doğrulama parolanızı aynı girmelisiniz!");
      }
      else{
        TeacherOperations.changePassword({
          oldPassword: oldPassword,
          newPassword: newPassword
        },
        (data) => {
          setTeacher(data);
        }
        );
      }
    }
    
    
  return (
    <div className="tab-pane" id="security">
      <h6>GÜVENLİK AYARLARI</h6>
      <hr />
      <form>
        <div className="form-group">
          <label className="d-block">Parolanı Değiştir</label>
          <input
            type="password"
            className="form-control"
            placeholder="Eski parolayı girin"
            value={oldPassword}
            onChange={inputOldChangeHandler}
          />
          <input
            type="password"
            className="form-control mt-1"
            placeholder="Yeni parola"
            value={newPassword}
            onChange={inputNewChangeHandler}
          />
          <input
            type="password"
            className="form-control mt-1"
            placeholder="Parolayı doğrula"
            value={confirmPassword}
            onChange={inputConfirmChangeHandler}
          />
        </div>
        <button className="btn btn-info" type="button" onClick={handleUpdatePasswordClick}>
           Güncelle
          </button>
      </form>
      
    </div>
  );
}

export default Security;
