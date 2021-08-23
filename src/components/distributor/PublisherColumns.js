import OrderMode from "./OrderMode"
import PublisherEdit from "./PublisherEdit";
import getDateFormat from "../../logics/DateFormat";

export const COLUMNS = [
    {
        Header: 'Yayınevi',
        Footer: "Yayınevi",
        accessor: 'publisherName',
    },
    {
        Header: 'Anlaşma Miktarı',
        Footer: "Anlaşma Miktarı",
        accessor: 'dealAmount',
        //Cell: ({value}) => {return <OrderState value={value}/>}
    },
    {
        Header: 'Başlama Tarihi',
        Footer: "Başlama Tarihi",
        accessor: 'startDate',
        Cell: ({value}) => {return getDateFormat(value, 1)},

    },
    {
        Header: 'Bitiş Tarihi',
        Footer: "Bitiş Tarihi",
        accessor: 'dueDate',
        Cell: ({value}) => {return getDateFormat(value, 1)},
    },
    {
        Header: 'Maksimum İskonto',
        Footer: "Maksimum İskonto",
        accessor: 'maxDiscount',
        //Cell: ({value}) => {return format(new Date(value), "dd/MM/yyyy")},
    },
    {
        Header: 'Yüzdelik Dilim',
        Footer: "Yüzdelik Dilim",
        accessor: 'currentPercent',
        //Cell: ({value}) => {return format(new Date(value), "dd/MM/yyyy")},
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
        Cell: ({row}) => {return <PublisherEdit row={row.original} />}  
    }, 
]