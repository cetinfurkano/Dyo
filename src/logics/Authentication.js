import axios from "axios";
import {LoadingModal, Alert_Delete, Alert_Info, Alert_Error,LoadingModalClose} from "./SweetAlert";

class Authentication {
  constructor() {
    this.authenticated = false;
    this.loginType = -1;
  }
  login(loginOptions, callback) {
    LoadingModal("Login", "Giriş yapılıyor lütfen bekleyiniz!");
    if (loginOptions.loginType === 1) {
      axios.post("distributors/login",loginOptions.data).then(res =>{
        this.loginType = 1;
        console.log("Apiden cevap geldi: " + JSON.stringify(res.data));
        localStorage.setItem("token",res.data.token);
        localStorage.setItem("expiration",res.data.expiration);
        localStorage.setItem("loginType", this.loginType);
        LoadingModalClose();        
        callback();
      }).catch(err => {
        Alert_Error("Giriş Yapılamadı", err.response.data);
        //console.log("Hata oldu: " + JSON.stringify(err.response));
      });
    }else{
      axios.post("teachers/login",loginOptions.data).then(res =>{
        this.loginType = 0;
        console.log("Apiden cevap geldi: " + JSON.stringify(res.data));
        localStorage.setItem("token",res.data.token);
        localStorage.setItem("expiration",res.data.expiration);
        localStorage.setItem("loginType", this.loginType);
        LoadingModalClose();          
        callback();
      }).catch(err => {
        Alert_Error("Giriş Yapılamadı", err.response.data);
      });
    }
  }

    register(registerOptions,callBack) {
      LoadingModal("Kayıt", "Kaydınız yapılıyor lütfen bekleyiniz!");
      if (registerOptions.registerType === 1) {
        axios.post("distributors/register",registerOptions.data).then(res =>{
        this.loginType = 1;
        console.log("Apiden cevap geldi: " + JSON.stringify(res.data));
        localStorage.setItem("token",res.data.token);
        localStorage.setItem("expiration",res.data.expiration);
        localStorage.setItem("loginType", this.loginType);    
        LoadingModalClose();     
        callBack();
      }).catch(err => {
        Alert_Error("Kayıt Yapılamadı", err.response.data);
        console.log("Hata oldu: " + JSON.stringify(err.response));
      });
    } else {
      axios.post("teachers/register",registerOptions.data).then(res =>{
        this.loginType = 0;
        console.log("Apiden cevap geldi: " + JSON.stringify(res.data));
        localStorage.setItem("token",res.data.token);
        localStorage.setItem("expiration",res.data.expiration);
        localStorage.setItem("loginType", this.loginType);
        LoadingModalClose();
        callBack();
      }).catch(err => {
        Alert_Error("Kayıt Yapılamadı", err.response.data);
        console.log("Hata oldu: " + JSON.stringify(err.response));
      });
    }
  }

  logout(callback) {
    //axios request yapılacak
    localStorage.removeItem("loginType");
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    callback();
  }
  getLoginType() {
    this.loginType = localStorage.getItem("loginType");
    return parseInt(this.loginType);
  }
  getToken(){
    return localStorage.getItem("token");
  }

  isAuthenticated() {
    this.authenticated = localStorage.getItem("token") === null ? false : true;
    return this.authenticated;
  }
}
export default new Authentication();
