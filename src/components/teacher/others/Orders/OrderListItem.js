import React from "react";
import { Link } from "react-router-dom";
import getDateFormat from "../../../../logics/DateFormat";

function OrderListItem({ order }) {
  const getTotalPaid = (items) => {
    var totalPaid = 0;
    for (var i = 0; i < items.length; i++) {
      totalPaid += items[i].product.price * items[i].count;
    }
    return totalPaid;
  };
  

  return (
    <div className="bg-white card mb-4 order-list shadow-sm">
      <div className="gold-members p-4">
        <a href="#"> </a>
        <div className="media">
          <a href="#">
            <img
              className="mr-4"
              src={order.distributor.profilePhoto.url}
              alt="Generic placeholder image"
            />
          </a>
          <div className="media-body">
            {order.orderState === 1 ? (
              <a href="#">
                <span className="float-right text-info">
                  {getDateFormat(order.dueDate, 1)} tarihinde size ulaştı!
                  <i className="icofont-check-circled text-success"></i>
                </span>
              </a>
            ) : (
              ""
            )}
            <h6 className="mb-2">
              <a href="#"></a>
              <a href="#" className="text-black">
                {order.distributor.firstName + " " + order.distributor.lastName}
              </a>
            </h6>
            <p className="text-gray mb-1">
              <i className="icofont-location-arrow"></i>{" "}
              {order.distributor.officeAddress}
            </p>
            <p className="text-gray mb-3">
              <i className="icofont-list"></i> <strong>Sipariş No:</strong>  #{order.id}
              <i className="icofont-clock-time ml-2"></i>{" "}
              {getDateFormat(order.startDate, 1)}
            </p>
            <p className="text-dark">
              {order.items.map((item, index) => {
                return item.product.productName + " " + "x" + item.count + " ";
              })}
            </p>
            <hr />
            <div className="float-right">
              <Link
                to={"/teacher/order-details/"+order.id}
                className="btn btn-sm btn-primary"
              >
                GÖRÜNTÜLE
              </Link>
            </div>
            <p className="mb-0 text-black text-primary pt-2">
              <span className="text-black font-weight-bold">
                Toplam Ödeme:{" "}
              </span>
              {getTotalPaid(order.items)} ₺
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderListItem;
