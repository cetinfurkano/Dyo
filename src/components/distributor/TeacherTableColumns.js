import {format} from "date-fns"
import OrderState from "./OrderState";
import OrderMode from "./OrderMode"
import OrderEdit from "./OrderEdit";
import TeacherEdit from "./TeacherEdit";

export const COLUMNS = [
    {
        Header: 'Öğretmen Id',
        Footer: "Sipariş Numarası",
        accessor: 'id',
    },
    {
        Header: 'Adı',
        Footer: "Adı",
        accessor: 'firstName',
    },
    {
        Header: 'Soyadı',
        Footer: "Soyadı",
        accessor: 'lastName',
        //Cell: ({value}) => {return <OrderState value={value}/>}
    },
    {
        Header: 'Okul',
        Footer: "Okul",
        accessor: 'school',
    },
    {
        Header: 'Telefon',
        Footer: "Telefon",
        accessor: 'phoneNumber',
        //Cell: ({value}) => {return format(new Date(value), "dd/MM/yyyy")},
    },
    {
        Header: 'Branş',
        Footer: "Branş",
        accessor: 'branch',
        //Cell: ({value}) => {return <OrderMode isValid={value} />}     
    },
    {
        Header: 'Düzenle',
        Footer: "Düzenle", 
        Cell: ({row}) => { console.log(row); return <TeacherEdit row={row.original} />}  
    }, 
]