import React from "react";

function InputField({ icon, placeholder, onChange,type,value }) {
  // const handleChange = (e) => {
  //   if(setData){
  //     setData(e.target.value);
  //   }
  // };
  return (
    <div className="input-field">
      <i className={icon}></i>
      <input type={type ?? "text"} placeholder={placeholder} onChange={onChange} value={value}/>
    </div>
  );
}

export default InputField;
