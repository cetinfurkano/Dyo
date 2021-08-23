import axios from "axios";
import Authentication from "../Authentication";
import jwt_decode from "jwt-decode";
import {
  LoadingModal,
  Alert_Delete,
  Alert_Error,
  Alert_Info,
  Alert_Update,
  LoadingModalClose,
} from "../SweetAlert";
import DistOperations from "../Distributor/DistOperations";

class TeacherOperations {
  getUserId() {
    var token = Authentication.getToken();
    var decoded = jwt_decode(token);
    return decoded.UserId;
  }

  updateTeacher(teacher) {
    Alert_Update(
      "Bilgi Güncelleme",
      "Profil bilgileriniz güncellenecek kabul ediyor musunuz?",
      () => {
        LoadingModal("Profiliniz Güncelleniyor", "Lütfen bekleyin...");
        axios
          .put("teachers", teacher)
          .then((res) => {
            Alert_Info("Güncelleme", "Güncellemeniz başarılı!");
          })
          .catch((err) => {
            console.log(err.response.data);
            Alert_Error(
              "Profil güncellenemedi",
              JSON.stringify(err.response.data)
            );
          });
      }
    );
  }

  addDistributorReference(distributorId, callback) {
    var teacherId = this.getUserId();
    axios
      .put("teachers/" + teacherId + "/distributors/" + distributorId)
      .then((res) => {
        Alert_Info("Distribütör Ekleme", "Distribütörü başarı ile eklediniz!");
        callback(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
        Alert_Error(
          "Distribütör eklenemedi",
          JSON.stringify(err.response.data)
        );
      });
  }

  getTeacher(callback) {
    var userId = this.getUserId();
    console.log(userId);
    axios
      .get("teachers/" + userId)
      .then((res) => {
        callback(res.data);
      })
      .catch((err) => {
        console.log(err);
        Alert_Error("Bilgileriniz getirilemedi!", err.response.data);
      });
  }
  getDistributors(callback) {
    const teacherId = this.getUserId();
    axios
      .get("teachers/" + teacherId + "/distributors")
      .then((res) => {
        console.log(res);
        callback(res.data);
      })
      .catch((err) => {
        Alert_Error(
          "Bağlı olduğunuz distributorler getirilemedi!",
          err.response
        );
      });
  }

  getProducts(callback) {
    var selectedDistributor = localStorage.getItem(
      "selectedDistributor-" + this.getUserId()
    );
    var distributorId;
    if (selectedDistributor) {
      distributorId = JSON.parse(selectedDistributor).value;
      axios
        .get("products/distributor/" + distributorId)
        .then((res) => {
          console.log(res.data);
          callback(res.data);
        })
        .catch((err) => {
          Alert_Error("Ürünleriniz getirilemedi!", err.response.data);
        });
    } else {
      this.getDistributors((data) => {
        distributorId = data[0].id;
        localStorage.setItem(
          "selectedDistributor-" +
            JSON.stringify({
              value: data[0].id,
              label: data[0].firstName + " " + data[0].lastName,
            })
        );
        this.getProducts(callback);
      });
    }
  }

  getProductDetail(productId, callback) {
    axios
      .get("products/" + productId)
      .then((res) => {
        callback(res.data);
      })
      .catch((err) => {
        Alert_Error("Ürünleriniz getirilemedi!", err.response.data);
      });
  }

  getProductDistributor(distributorId, callback) {
    axios
      .get("distributors/" + distributorId)
      .then((res) => {
        console.log(res.data);
        callback(res.data);
      })
      .catch((err) => {
        Alert_Error("Bir hata meydana geldi!", err.response.data);
      });
  }

  getRelatedProducts(options, callback) {
    axios
      .get(
        "products/" +
          options.id +
          "/" +
          options.categoryName +
          "/" +
          options.distributorId
      )
      .then((res) => {
        console.log(res.data);
        callback(res.data);
      })
      .catch((err) => {
        Alert_Error("Bir hata meydana geldi!", err.response.data);
      });
  }

  getFavorites(idArr, callback) {
    axios
      .post("products/favorites", idArr)
      .then((res) => {
        callback(res.data);
      })
      .catch((err) => {
        Alert_Error("Bir hata meydana geldi!", err.response.data);
      });
  }

  getCartItems(idArr, callback) {
    axios
      .post("products/cart-items", idArr)
      .then((res) => {
        callback(res.data);
      })
      .catch((err) => {
        Alert_Error("Bir hata meydana geldi!", err.response.data);
      });
  }

  toOrder(cart, callback) {
    this.getTeacher((teacher) => {
      var distributor = JSON.parse(
        localStorage.getItem("selectedDistributor-" + this.getUserId())
      );
      var orderData = {
        teacherId: teacher.id,
        distributorId: distributor.value,
        items: cart.map((p) => {
          return {
            productId: p.id,
            count: p.count,
          };
        }),
        orderState: 0,
        address: teacher.address,
        isValid: true,
      };
      LoadingModal("Sipariş Veriliyor", "Lütfen bekleyin...");
      axios
        .post("orders", orderData)
        .then((res) => {
          Alert_Info(
            "Siparişiniz başarı ile verildi!",
            res.data.id + " numaralı siparişiniz başarı ile verildi!"
          );
          callback(res.data);
        })
        .catch((err) => {
          Alert_Error("Sipariş verme işlemi başarısız!", err.response.data);
        });
    });
  }

  getOrders(callback) {
    var teacherId = this.getUserId();
    axios
      .get("orders/teacher/" + teacherId)
      .then((res) => {
        callback(res.data);
      })
      .catch((err) => {
        Alert_Error("Siparişleriniz getirilemedi!", err.response.data);
      });
  }

  getOrder(orderId, callback) {
    LoadingModal("Siparişiniz getiriliyor!", "Lütfen bekleyin...");
    axios
      .get("orders/" + orderId)
      .then((res) => {
        LoadingModalClose();
        callback(res.data);
      })
      .catch((err) => {
        Alert_Error("Siparişleriniz getirilemedi!", err.response.data);
      });
  }

  getProductsByFilters(filterObject, callback) {
    const userId = this.getUserId();
    const selectedDistributorId = localStorage.getItem(
      "selectedDistributor-" + userId
    );
    console.log(filterObject);
    if (selectedDistributorId) {
      LoadingModal("Filtreleniyor!", "Lütfen bekleyin...");
      const distributorId = JSON.parse(selectedDistributorId).value;
      axios
        .post("products/filters/" + distributorId, filterObject)
        .then((res) => {
          LoadingModalClose();
          callback(res.data);
        })
        .catch((err) => {
          Alert_Error("Bir hata meydana geldi" + err.response.data);
        });
    } else {
      Alert_Error(
        "Distributor Seçin",
        "Bir distributor seçmediğiniz için ürünler getirilemiyor!"
      );
    }
  }

  getProductsBySearch(searchText, callback) {
    const userId = this.getUserId();
    const selectedDistributorId = localStorage.getItem(
      "selectedDistributor-" + userId
    );
    if (selectedDistributorId) {
      const distributorId = JSON.parse(selectedDistributorId).value;
      axios
        .get("products/" + distributorId + "/" + searchText)
        .then((res) => {
          console.log("resdata: " + JSON.stringify(res));
          if (res.data.length < 0) {
            Alert_Error(
              "Ürün Bulunamadı!",
              "Aradığınız isimde ürün mevcut değil, diğer distribütörleri deneyin."
            );
          }
          callback(res.data);
        })
        .catch((err) => {
          Alert_Error("Hata!", err.response.data);
        });
    } else {
      Alert_Error(
        "Distribütör Boş!",
        "Ürün filtrelemek için bir distribütör seçin!"
      );
    }
  }

  changePassword(passwordModel,callback){
    var userId = this.getUserId();
    Alert_Update(
      "Parola Güncelleme",
      "Parola bilgileriniz güncellenecek kabul ediyor musunuz?",
      () => {
        LoadingModal("Parolanız Güncelleniyor", "Lütfen bekleyin...");
        axios
          .put("teachers/"+userId+"/password", passwordModel)
          .then((res) => {
            Alert_Info("Güncelleme", "Güncellemeniz başarılı!");
          })
          .catch((err) => {
            console.log(err.response.data);
            Alert_Error(
              "Parola güncellenemedi",
              JSON.stringify(err.response.data)
            );
          });
      }
    );
  }
}

export default new TeacherOperations();
