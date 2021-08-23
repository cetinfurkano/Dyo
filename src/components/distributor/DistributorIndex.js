import React,{useState,useEffect} from "react";
import Chart from "react-apexcharts";
import helloSvg from "../../assets/img/distributor/hello.svg"
import DistOperations from "../../logics/Distributor/DistOperations";
import ChartRightCard from "./ChartRightCard";
import IndexCard from "./IndexCard";
import Title from "./Title"

function DistributorIndex() {
   
    const[statistics, setIstatistics] = useState({});
    
    const monthNames = ["Ocak", "Subat", "Mart", "Nisan", "Mayis", "Haziran",
  "Temmuz", "Agustos", "Eylul", "Ekim", "Kasim", "Aralik"
];
  const getMonthArray = (months) => {
    var result = []; 
    for(var i = 0; i < months.length; i++){
      result.push(monthNames[months[i] - 1]);
      }

      return result;
  }
  
    
    useEffect(() => {
      DistOperations.getStatistics((data)=>{
        setIstatistics(data); 
      });
    }, [])

    const[monthlyStatistics, setMonthlyStatistics] = useState([]);

    useEffect(() => {
      DistOperations.getMonthlyStatistics((data)=>{
        setMonthlyStatistics(data);      
      });
    }, [])

    var options = {
      series: [
        {
          name: "Aylık Kar",
          data: monthlyStatistics.map(m => m.totalGain),
        },
        {
          name: "Aylık Gelir",
          data: monthlyStatistics.map(m => m.totalTurnover),
        },
        {
          name: "Aylık Maliyet",
          data: monthlyStatistics.map(m => m.totalCost),
        },
      ],
      chart: {
        type: "bar",
        height: 250, // make this 250
        sparkline: {
          enabled: true, // make this true
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: getMonthArray(monthlyStatistics.map(m => m.month)),
      },
      yaxis: {
        title: {
          text: "$ (thousands)",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " ₺ (lira)";
          },
        },
      },
    };

  const [apexOptions, setApexOptions]=useState(options);

    return (
    <main>
      <div className="main__container pt-5 mt-3">
        <div className="main__title">
          <img src={helloSvg} alt="" />
          <div className="main__greeting">
            <h1>Merhaba Distribütör</h1>
            <p>Admin ekranına hoşgeldin</p>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">
            <IndexCard icon="fa fa-user-o fa-2x text-lightblue" text="Bağlı Öğretmen Sayısı" count={statistics.linkedTeacherCount}/>
            <IndexCard icon="fa fa-calendar fa-2x text-red" text="Toplam Satış Sayısı" count={statistics.totalOrder}/>
            <IndexCard icon="fa fa-folder fa-2x text-yellow" text="Satılabilir Ürün Miktarı" count={statistics.productCount}/>
            <IndexCard icon="fa fa-thumbs-up fa-2x text-green" text="Yayınevi Sayısı" count={statistics.publishersCount}/>
          </div>
        </div>

        <div className="container-fluid mt-5">
          <div className="row">
            <div className="col-md-6 charts__left">
              <Title className="charts__left__title" title="Aylık Raporlar" text="Adres Bilgisi" icon="fa fa-try"/>
            
              <Chart 
                 options={apexOptions}
                 series={apexOptions.series}
                 type="bar"
                 height={250}
              />
            </div>
            <div className="col-md-6 charts__right">
            <Title className="charts__right__title" title="Bu Ayın Durum Raporu" text="Durum Raporu" icon="fa fa-try"/>
              
              <div className="container-fluid">
                <div className="row">
                 <ChartRightCard type="card1" title="Ciro" text={statistics.turnoverThisMonth}/>
                 <ChartRightCard type="card2" title="Satış" text={statistics.totalOrderThisMonth}/>
                 <ChartRightCard type="card3" title="Kar" text={statistics.totalGainThisMonth}/>
                 <ChartRightCard type="card4" title="Maliyet" text={statistics.totalCostThisMonth}/>           
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default DistributorIndex;
