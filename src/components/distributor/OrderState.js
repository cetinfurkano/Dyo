import React from "react";

function OrderState({ value }) {
  var mode;
  var text;
  switch (value) {
    case 0:
      mode = "mode_waiting";
      text = "Bekliyor";
      break;
    case 1:
      mode = "mode_done";
      text = "Tamamlandı";
      break;
    case 2:
      mode = "mode_process";
      text = "Devam ediyor";
      break;
    case 3:
      mode = "mode_cancelled";
      text = "İptal Edildi";
      break;
    case 4:
      mode = "mode_travelling";
      text = "Kargoya verildi";
      break;
    case 5:
      mode = "mode_accepted";
      text = "Kabul edildi";
      break;
    default:
      break;
  }

  return <span className={"mode " + mode}>{text}</span>;
}

export default OrderState;
