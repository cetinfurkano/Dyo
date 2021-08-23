import {format} from "date-fns"
import OrderState from "./OrderState";
import OrderMode from "./OrderMode"
import OrderEdit from "./OrderEdit";
import getDateFormat from "../../logics/DateFormat";

export const COLUMNS = [
    {
        Header: 'Sipariş Numarası',
        Footer: "Sipariş Numarası",
        accessor: 'id',
    },
    {
        Header: 'Adres',
        Footer: "Adres",
        accessor: 'address.addressDescription'
    },
    {
        Header: 'Sipariş Durumu',
        Footer: "Sipariş Durumu",
        accessor: 'orderState',
        Cell: ({value}) => {return <OrderState value={value}/>}
    },
    {
        Header: 'Tarih',
        Footer: "Tarih",
        accessor: 'startDate',
        Cell: ({value}) => {return getDateFormat(value, 1)}
    },
    {
        Header: 'Mod',
        Footer: "Mod",
        accessor: 'isValid',
        Cell: ({value}) => {return <OrderMode isValid={value} />}     
    },
    {
        Header: 'Düzenle',
        Footer: "Düzenle", 
        Cell: ({row}) => {return <OrderEdit row={row.original}/>}  
    }, 
]