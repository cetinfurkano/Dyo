import * as swAlert2 from "./sweetalert.min"
import * as swAlert from "./sweetalert-dev"
import $ from "jquery"

export function Alert_default(title, msg, type, btn) {
    if (btn === null) { btn = true; }
    swAlert.swal({
        title: title,
        text: msg,
        type: type,
        showConfirmButton: btn,
        confirmButtonText: 'Tamam',
        html: true
    });
}
export function Alert_Success(title, msg) {
    swAlert.swal({
        title: title,
        text: msg,
        type: 'success',
        showConfirmButton: true,
        confirmButtonText: 'Tamam',
        html: true
    });
}
export function Alert_Warning(title, msg) {
    swAlert.swal({
        title: title,
        text: msg,
        type: 'warning',
        showConfirmButton: true,
        confirmButtonText: 'Tamam',
        html: true
    });
}
export function Alert_Error(title, msg) {
    swAlert.swal({
        title: title,
        text: msg,
        type: 'error',
        showConfirmButton: true,
        confirmButtonText: 'Tamam',
        html: true
    });
}
export function Alert_Info(title, msg) {
    swAlert.swal({
        title: title,
        text: msg,
        type: 'info',
        showConfirmButton: true,
        confirmButtonText: 'Tamam',
        html: true
    });
}
//swal.close();
export function Alert_Delete(title, msg, id, callback) {
    swAlert.swal({
        title: title,
        text: msg,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Evet sil",
        cancelButtonText: "Vazgeç",
        closeOnConfirm: false,
        html: true
    },
        function () {
            console.log(id);
            callback(id);
        });
}

export function Alert_Time(title, msg, time) {
    swAlert.swal({
        title: title,
        text: msg,
        timer: time,
        type: "info",
        showConfirmButton: false,
        html: true
        // allowOutsideClick: false
    }, function () {
        window.location.reload();
    });
}
export function LoadinModal(title, msg) {
    swAlert.swal({
        title: title,
        text: msg,
        imageUrl: '../Content/uyari/Loading.gif',
        showConfirmButton: false,
        html: true
    });
}
export function LoadinModalClose() {
    swAlert.swal.close();
}

export function AlertModal(nerede, txt, cls) {
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

//---------------------------------------------------------------------

export function MsgBox_Success(title, txt) {
    new swAlert2.PNotify({
        title: title,
        text: txt,
        type: 'success',
        animate: {
            animate: true,
            in_class: 'bounceInLeft',
            out_class: 'bounceOutRight'
        }
    });
}
export function MsgBox_Warning(title, txt) {
    new swAlert2.PNotify({
        title: title,
        text: txt,
        type: 'warning',
        icon: 'fa fa-exclamation',
        animate: {
            animate: true,
            in_class: 'bounceInLeft',
            out_class: 'bounceOutRight'
        }

    });
}
export function MsgBox_Error(title, txt) {
    new swAlert2.PNotify({
        title: title,
        text: txt,
        type: 'error',
        animate: {
            animate: true,
            in_class: 'bounceInLeft',
            out_class: 'bounceOutRight'
        }

    });
}
export function MsgBox_info(title, txt) {
    new swAlert2.PNotify({
        title: title,
        text: txt,
        type: 'info',
        animate: {
            animate: true,
            in_class: 'bounceInLeft',
            out_class: 'bounceOutRight'
        }

    });
}
export function MsgBox_Custom(title, txt) {
    new swAlert2.PNotify({
        title: title,
        text: txt,
        type: 'custom',
        addclass: 'pnotify-primary',
        icon: "fa fa-user",
        animate: {
            animate: true,
            in_class: 'bounceInLeft',
            out_class: 'bounceOutRight'
        }
    });
}
export function MsgBox_Dark(title, txt) {
    new swAlert2.PNotify({
        title: title,
        text: txt,
        type: 'custom',
        addclass: 'pnotify-dark',
        icon: "fa fa-shield",
        animate: {
            animate: true,
            in_class: 'bounceInLeft',
            out_class: 'bounceOutRight'
        }
    });
}
export function MsgBox_Light(title, txt) {
    new swAlert2.PNotify({
        title: title,
        text: txt,
        type: 'custom',
        addclass: 'pnotify-light',
        icon: "fa fa-bell",
        animate: {
            animate: true,
            in_class: 'bounceInLeft',
            out_class: 'bounceOutRight'
        }
    });
}

//---------------------------------------------------------------------

