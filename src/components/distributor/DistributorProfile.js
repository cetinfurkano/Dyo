import React, { useState, useEffect, useRef } from "react";
import "../../assets/css/distributor/dist-profile.css";
import DistOperations from "../../logics/Distributor/DistOperations";

function DistributorProfile() {
  const [distributorInfo, setDistributorInfo] = useState({});
  const [photo, setPhoto] = useState({});
  const fileRef = useRef(null);
  useEffect(() => {
    DistOperations.getDistributor((data) => {
      setDistributorInfo(data);
    });
  }, []);

  const handleUpload = (e) => {
    const formData = new FormData();
    formData.append("File", e.target.files[0]);
    setPhoto(formData);
  };
  const handleUpdate = (e) => {
    console.log(photo);
    DistOperations.addPhoto(photo, (data) => {
      setDistributorInfo({...distributorInfo, profilePhoto:data});
    });
    DistOperations.updateDistributor(distributorInfo,(data)=>{
      setDistributorInfo(data);
    });
  };


  return (
    <div className="DistributorProfile pt-3">
      <div className="wrapper bg-white mt-sm-5">
        <h4 className="pb-4 border-bottom">Profil Ayarları</h4>
        <div className="d-flex align-items-start py-3 border-bottom">
          <img
            src={distributorInfo.profilePhoto && distributorInfo.profilePhoto.url}
            className="img"
            alt=""
          />
          <div className="pl-sm-4 pl-2" id="img-section">
            <b>Profil Fotoğrafı</b>
            <p>Bir resim yükleyin</p>
            <input
              ref={fileRef}
              type="file"
              className="btn button border"
              accept="image/*"
              onChange={handleUpload}
            />
          </div>
        </div>
        <div className="py-2">
          <div className="row py-2">
            <div className="col-md-6">
              <label htmlFor="firstname">Ad</label>
              <input
                type="text"
                className="bg-light form-control"
                value={distributorInfo.firstName}
                onChange={(e)=>{setDistributorInfo({...distributorInfo, firstName:e.target.value})}}
              />
            </div>
            <div className="col-md-6 pt-md-0 pt-3">
              <label htmlFor="lastname">Soyad</label>
              <input
                type="text"
                className="bg-light form-control"
                value={distributorInfo.lastName}
                onChange={(e)=>{setDistributorInfo({...distributorInfo, lastName:e.target.value})}}
              />
            </div>
          </div>
          <div className="row py-2">
            <div className="col-md-6">
              <label htmlFor="email">Eposta Adresi</label>
              <input
                type="text"
                className="bg-light form-control"
                value={distributorInfo.email}
                onChange={(e)=>{setDistributorInfo({...distributorInfo, email:e.target.value})}}

              />
            </div>
            <div className="col-md-6 pt-md-0 pt-3">
              <label htmlFor="phone">Telefon Numarası</label>
              <input
                type="tel"
                className="bg-light form-control"
                value={distributorInfo.phoneNumber}
                onChange={(e)=>{
                  const regexp = /^[0-9\b]+$/;
                    if(regexp.test(e.target.value))
                    setDistributorInfo({...distributorInfo, phoneNumber:e.target.value})
                }}
              />
            </div>
            <div className="col-md-6 pt-md-0 pt-3">
              <label htmlFor="password">Şifre</label>
              <input type="password" className="bg-light form-control"  onChange={(e)=>{setDistributorInfo({...distributorInfo, password:e.target.value})}}/>
            </div>
            <div className="col-md-6 pt-md-0 pt-3">
              <label htmlFor="passwordRepeat">Şifre Tekrar</label>
              <input type="password" className="bg-light form-control"/>
            </div>
          </div>
          <div className="row py-2">
            <label htmlFor="address">Adres</label>
            <textarea
              id="address"
              value={distributorInfo.officeAddress}
              onChange={(e)=>{setDistributorInfo({...distributorInfo, officeAddress:e.target.value})}}
            ></textarea>
          </div>
          <div className="py-3 pb-4 border-bottom">
            <button className="btn btn-primary mr-3" onClick={handleUpdate}>
              Kaydet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DistributorProfile;
