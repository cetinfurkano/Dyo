import React from "react";
import InputField from "./SubComponents/InputField";

function SignUpDist({fields, setRegisterData}) {
  const onChangeFirstName = (e) => {
    setRegisterData({...fields, "firstName": e.target.value});
  }
  const onChangeLastName = (e) => {
    setRegisterData({...fields, "lastName": e.target.value});
  }
  const onChangeEmail = (e) => {
    setRegisterData({...fields, "email": e.target.value});
    
  }
  const onChangePhone = (e) => {
    const regexp = /^[0-9\b]+$/;
    if(regexp.test(e.target.value))
      setRegisterData({...fields, "phoneNumber": e.target.value});
    
  }
  const onChangeAddress = (e) => {
    setRegisterData({...fields, "officeAddress": e.target.value});
    
  }
  const onChangePassword= (e) => {
    setRegisterData({...fields, "password": e.target.value}); 
  }
  
  

  return (
    <>
      <div className="tab">
        <InputField icon="fas fa-user" placeholder="Ad" onChange={onChangeFirstName} value={fields.firstName}/>
        <InputField icon="fas fa-user" placeholder="Soyad" onChange={onChangeLastName} value={fields.lastName}/>
        <InputField icon="fas fa-envelope" placeholder="Email" onChange={onChangeEmail} value={fields.email}/>
      </div>
      <div className="tab">
        <InputField icon="fas fa-phone-alt" placeholder="Telefon" onChange={onChangePhone} value={fields.phoneNumber}/>
        <InputField icon="fas fa-map-marker-alt" placeholder="Adres" onChange={onChangeAddress} value={fields.officeAddress}/>
        <InputField icon="fas fa-lock" placeholder="Şifre" type="password" onChange={onChangePassword} value={fields.password}/>
      </div>
      <div className="tab">
        <InputField
          icon="fas fa-lock"
          placeholder="Şifre Tekrar"
          type="password"
        />
      </div>
    </>
  );
}

export default SignUpDist;
