import swal from "sweetalert";
import $ from "jquery"
import loadingif from "./Content/uyari/Loading.gif"
import hata from "./Content/uyari/Hata.png"
import tamam from "./Content/uyari/Tamam.png"
import "./Content/swal.css"

function Alert_default(title, msg, type, btn) {
    if (btn === null) { btn = true; }
    swal({
        title: title,
        text: msg,
        type: type,
        showConfirmButton: btn,
        confirmButtonText: 'Tamam',
        html: true
    });
}
function Alert_Success(title, msg) {
    swal({
        title: title,
        text: msg,
        type: 'success',
        showConfirmButton: true,
        confirmButtonText: 'Tamam',
        html: true
    });
}
function Alert_Warning(title, msg) {
    swal({
        title: title,
        text: msg,
        type: 'warning',
        showConfirmButton: true,
        confirmButtonText: 'Tamam',
        html: true
    });
}
export function Alert_Error(title, msg) {
    swal({
        title: title,
        text: msg,
        icon: hata,
        button:"Tamam", 
    });
}
export function Alert_Info(title, msg) {
    swal({
        title: title,
        text: msg,
        icon: "success",
        button:"Harika",
    });
}
export function Alert_Update(title, msg,callback) {
    swal({
        title: title,
        text: msg,
        icon: "warning",
        buttons:["Vazgeç", "Evet Güncelle"],
        closeOnClickOutside:false
    }).then((value)=> {
         if(value){
            callback();
         }
    });
}
//swal.close();
export function Alert_Delete(title, msg,callback) {
    swal({
        title: title,
        text: msg,
        icon: "warning",
        buttons:["Vazgeç", "Evet Sil"],
        dangerMode:true,
        closeOnClickOutside:false
    }).then((value)=> {
         if(value){
            callback();
         }
    });
}
export function LoadingModal(title, msg) {
    swal({
        title: title,
        text: msg,
        icon: loadingif
    });
}

function Alert_Time(title, msg, time) {
    swal({
        title: title,
        text: msg,
        timer: time,
        icon: "info",
        showConfirmButton: false,
        // allowOutsideClick: false
    }, function () {
        window.location.reload();
    });
}

export function LoadingModalClose() {
    swal.close();
}

function AlertModal(nerede, txt, cls) {
    var strAlert = "";
    strAlert += '<div class="alert alert-' + cls + ' alert-dismissible fade in" role="alert" >';
    strAlert += '     <button type="button" class="close" data-dismiss="alert" aria-label="Close" >';
    strAlert += '        <span aria-hidden="true">&times;</span>';
    strAlert += '    </button> ';
    strAlert += txt;
    strAlert += '</div>';
    $('#' + nerede).append(strAlert);
    var timeOut = setInterval(function () {
        $('.alert').fadeOut();
        clearInterval(timeOut);
    }, 3000)
}

