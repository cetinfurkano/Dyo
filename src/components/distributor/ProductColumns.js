import {format} from "date-fns"
import OrderState from "./OrderState";
import OrderMode from "./OrderMode"
import ProductEdit from "./ProductEdit";

export const COLUMNS = [
    {
        Header: 'Ürün ID',
        Footer: "Ürün ID",
        accessor: 'id',
    },
    {
        Header: 'Yayınevi',
        Footer: "Yayınevi",
        accessor: 'publisherName',
    },
    {
        Header: 'Ürün Adı',
        Footer: "Ürün Adı",
        accessor: 'productName',
        //Cell: ({value}) => {return <OrderState value={value}/>}
    },
    {
        Header: 'Stok Miktarı',
        Footer: "Stok Miktarı",
        accessor: 'stockAmount',
    },
    {
        Header: 'İskonto',
        Footer: "İskonto",
        accessor: 'discount',
        //Cell: ({value}) => {return format(new Date(value), "dd/MM/yyyy")},
    },
    {
        Header: 'Fiyat',
        Footer: "Fiyat",
        accessor: 'price',
        Cell: ({value}) => {return value + " ₺"},
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
        Cell: ({row}) => {return <ProductEdit row={row.original}/>}
        
    }, 
]