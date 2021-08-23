import React from 'react'

function OrderMode({isValid}) {
    var mode = isValid==true ? "mode_on" : "mode_off";
    
    return (
        <span className={"mode " + mode}>{isValid ? "Aktif" : "Pasif"}</span>
    )
}

export default OrderMode
