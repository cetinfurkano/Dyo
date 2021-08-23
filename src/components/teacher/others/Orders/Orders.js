import React,{useState, useEffect} from "react";
import "../../../../assets/css/teacher/orders.css";
import OrderListItem from "./OrderListItem";
import TeacherOperations from "../../../../logics/Teacher/TeacherOperations";

function Orders() {

  const [orders, setOrders] = useState();

  useEffect(() => {
    TeacherOperations.getOrders((data) =>{
      setOrders(data);
    });
  }, [])

  return (
    <div className="Orders">
      <div className="container mt-3">
        <div className="row">
          <div className="col-md">
            <div className="osahan-account-page-right shadow-sm bg-white p-4 h-100">
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane fade active show"
                  id="orders"
                  role="tabpanel"
                  aria-labelledby="orders-tab"
                >
                  <h4 className="font-weight-bold mt-0 mb-4">Siparişlerin</h4>
                 {orders && orders.map((order, index) => (
                   <OrderListItem key={index} order={order} />
                 ))}                   
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
