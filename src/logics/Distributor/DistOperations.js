import axios from "axios";
import Authentication from "../Authentication";
import jwt_decode from "jwt-decode";
import {LoadingModal,Alert_Delete,Alert_Error,Alert_Info,Alert_Update} from "../SweetAlert"

class DistOperations {
  getUserId() {
    var token = Authentication.getToken();
    var decoded = jwt_decode(token);
    return decoded.UserId;
  }

  getDistributor(callback) {
    var userId = this.getUserId();
    axios
      .get("distributors/" + userId)
      .then((res) => {
        callback(res.data);
      })
      .catch((err) => {
        Alert_Error("Bilgileriniz getirilemedi!", err.response.data); 
      });
  }

  addPhoto(data, callback) {
    var userId = this.getUserId();
    var file = data;
    axios
      .put("distributors/" + userId + "/profilePhoto", file, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        callback(res.data);
      })
      .catch((err) => {
        Alert_Error("Fotoğraf eklenemedi!", err.response.data);          
        console.log(err.response.data)
      });
  }

  updateDistributor(data, callback) {
    LoadingModal("Bilgileriniz Güncelleniyor","Lütfen bekleyin...");
    axios
      .put("distributors", data)
      .then((res) => {
        Alert_Info("Güncelleme","Bilgileriniz başarı ile güncellendi!");        
        callback(res.data);
      })
      .catch((err) => {
        Alert_Error("Bilgileriniz güncellenmedi!", err.response.data);          
        console.log(err.response.data)
      });
  }

  addProduct(productForCreateDto, callback) {
    LoadingModal("Ürün Ekleniyor","Lütfen bekleyin...");
    var distributorId = this.getUserId();
    productForCreateDto.distributorId = distributorId;
    axios
      .post("products", productForCreateDto)
      .then((res) => {
        Alert_Info("Ürün Ekle","Ürününüz başarı ile eklendi!");        
        callback(res.data);
      })
      .catch((err) => {
        Alert_Error("Ürün ekleme işlemi başarısız!", err.response.data);      
        console.log(err.response.data)
      });
  }

  getProducts(callback) {
    var distributorId = this.getUserId();
    axios
      .get("products/distributor/" + distributorId)
      .then((res) => {
        console.log(res.data);
        callback(res.data);
      })
      .catch((err) => {
        Alert_Error("Ürünleriniz getirilemedi!", err.response.data); 
      });
  }

  addContract(data, callback) {
    LoadingModal("Yayınevi Ekleniyor","Lütfen bekleyin...");
    var distributorId = this.getUserId();
    axios
      .post("distributors/" + distributorId + "/contracts", data)
      .then((res) => {
        Alert_Info("Yayınevi Ekle","Yayınevi başarı ile eklendi!");        
        console.log(data);
        callback(res.data);
      }).catch(err => {
        //Alert_Error("Yayınevi ekleme işlemi başarısız!", err.response.data); 
        console.log(err.response.data);
      });
  }

  addOrder(data, callback) {
    LoadingModal("Sipariş Ekleniyor","Lütfen bekleyin...");
    var distributorId = this.getUserId();
    data.distributorId = distributorId;
    axios.post("orders", data).then((res) => {
      Alert_Info("Sipariş Ekle","Sipariş başarı ile eklendi!");        
      callback(res.data);
    }).catch(err => {
      Alert_Error("Sipariş ekleme işlemi başarısız!", err.response.data);      
    });
  }

  removeOrder(order){
  Alert_Delete("Sipariş Silme","Numarası " + order.id + " olan sipariş silinecek emin misiniz?", () => {
      const distributorId = this.getUserId();
      LoadingModal("Sipariş Siliniyor","Lütfen bekleyin...");
      axios
        .delete("orders/" + order.id)
        .then((res) => {
           Alert_Info("Sipariş başarı ile silindi!");
           window.location.reload();     
        })
        .catch((err) => {
          console.log(err.response.data);
          Alert_Error("Sipariş silinemedi", JSON.stringify(err.response.data));      
        });
    });
  }

  getAllOrders(callback){
    var distributorId = this.getUserId();
    axios
      .get("orders/distributor/" + distributorId)
      .then((res) => {
        callback(res.data);
      })
      .catch((err) => {
        Alert_Error("Siparişleriniz getirilemedi!", err.response.data); 
      });
  }

  addTeacher(data, callback) {
    LoadingModal("Öğretmen Ekleniyor","Lütfen bekleyin...");
    var distributorId = this.getUserId();
    data.distributorId = distributorId;
    axios.post("distributors/teachers", data).then((response) => {
      Alert_Info("Öğretmen Ekle","Öğretmen başarı ile eklendi!");    
      callback(response.data);
    })
    .catch(err => {
      Alert_Error("Öğretmen ekleme işlemi başarısız!", err.response.data);      
    });
  }

  getAllTeachers(callback) {
    var distributorId = this.getUserId();
    console.log("burada");
    axios
      .get("distributors/" + distributorId + "/teachers")
      .then((res) => {
        callback(res.data);
      })
      .catch((err) => {
        Alert_Error("Bağlı olduğunuz öğretmenler getirilemedi!", err.response.data);      
      });
  }

  getContracts(callback) {
    const distributorId = this.getUserId();
    axios
      .get("distributors/" + distributorId + "/contracts")
      .then((res) => {
        console.log(JSON.stringify(res));
        callback(res.data);
      })
      .catch((err) => {
        Alert_Error("Yayınevleriniz getirilemedi!", err.response.data);
      });
  }

  getStatistics(callback){
    const distributorId = this.getUserId();
    axios
      .get("distributors/" + distributorId + "/statistics")
      .then((res) => {
        callback(res.data);
      })
      .catch((err) => {
        Alert_Error("İstatistikleriniz getirilemedi!", err.response.data);
      });
  }
  getMonthlyStatistics(callback){
    const distributorId = this.getUserId();
    axios
      .get("distributors/" + distributorId + "/statistics/monthly")
      .then((res) => {
        callback(res.data);
      })
      .catch((err) => {
        Alert_Error("Aylık istatistikleriniz getirilemedi!", err.response.data);      
      });
  }

  removeTeacher(teacherId){
    Alert_Delete("Öğretmen Silme","Id' si " + teacherId + " olan öğretmen silinecek emin misiniz?", () => {
      const distributorId = this.getUserId();
      LoadingModal("Öğretmen Siliniyor","Lütfen bekleyin...");
      axios
        .delete("distributors/" + distributorId + "/teachers/" +teacherId)
        .then((res) => {
           Alert_Info("Öğretmen başarı ile silindi!");
           window.location.reload();     
        })
        .catch((err) => {
          console.log(err.response.data);
          Alert_Error("Öğretmen silinemedi", JSON.stringify(err.response.data));      
        });
    });
  }

  updateOrder(updateModel){
    Alert_Update("Sipariş Güncelleme",updateModel.id + " numaralı siparişiniz güncellenecek emin misiniz?", ()=>{
      const distributorId = this.getUserId();
      LoadingModal("Siparişiniz Güncelleniyor","Lütfen bekleyin...");
      axios
        .put("orders", updateModel)
        .then((res) => {
          Alert_Info("Sipariş başarı ile güncellendi!");
          //callback(res.data);
          window.location.reload();       
        })
        .catch((err) => {
          console.log(err.response.data);
          Alert_Error("Sipariş güncellenemedi", JSON.stringify(err.response.data));      
        });
    });
  }

  updateProduct(product,images){
    Alert_Update("Ürün Güncelleme",product.productName + " adlı ürününüz güncellenecek emin misiniz?", ()=>{
      const distributorId = this.getUserId();
      LoadingModal("Ürününüz Güncelleniyor","Lütfen bekleyin...");
      axios
        .put("products", product)
        .then((res) => {
           this.updateProductImages(product.id, images, ()=> {
            Alert_Info("Ürün başarı ile güncellendi!");
           });
               
        })
        .catch((err) => {
          console.log(err.response.data);
          Alert_Error("Ürün güncellenemedi", JSON.stringify(err.response.data));      
        });
    });
  }
  updateProductImages(id,images,callback){
      const distributorId = this.getUserId();
      axios
        .post("products/"+id+"/images", images,{
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
           //Alert_Info("Ürün başarı ile güncellendi!");
           callback();
           window.location.reload();     
        })
        .catch((err) => {
          console.log(err.response.data);
          Alert_Error("Ürün güncellenemedi", JSON.stringify(err.response.data));      
        });
  }

  removeProduct(product){
    Alert_Delete("Ürün Silme","Adı " + product.productName + " olan ürün silinecek?", () => {
      LoadingModal("Ürün Siliniyor","Lütfen bekleyin...");
      axios
        .delete("products?productId=" + product.id)
        .then((res) => {
           Alert_Info("Ürün başarı ile silindi!");
           window.location.reload();     
        })
        .catch((err) => {
          console.log(err.response.data);
          Alert_Error("Ürün silinemedi", JSON.stringify(err.response.data));      
        });
    });
  }

  updateContract(contract, publisherName){
    Alert_Update("Anlaşma Güncelleme",publisherName + " adlı anlaşmanız güncellenecek emin misiniz?", ()=>{
      LoadingModal("Anlaşma Güncelleniyor","Lütfen bekleyin...");
      const distributorId = this.getUserId();
      axios
        .put("distributors/"+distributorId+"/contracts/" + publisherName,contract)
        .then((res) => {
           Alert_Info("Anlaşma başarı ile güncellendi!");
           window.location.reload();  
        })
        .catch((err) => {
          console.log(err.response.data);
          Alert_Error("Anlaşma", JSON.stringify(err.response.data));      
        });
    });
  }
  removeContract(contract){
    Alert_Delete("Anlaşma Silme",contract.publisherName + " adlı anlaşmanız silinecek emin misiniz?", () => {
      const distributorId = this.getUserId();
      LoadingModal("Anlaşma Siliniyor","Lütfen bekleyin...");
      axios
        .delete("distributors/" + distributorId + "/contracts", {data: contract})
        .then((res) => {
           Alert_Info("Anlaşma başarı ile silindi!");
           window.location.reload();     
        })
        .catch((err) => {
          console.log(err.response.data);
          Alert_Error("Anlaşma silinemedi", JSON.stringify(err.response.data));      
        });
    });
  }


  
}

export default new DistOperations();
