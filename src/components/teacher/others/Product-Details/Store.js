import React,{useState,useEffect} from "react";
import TeacherOperations from "../../../../logics/Teacher/TeacherOperations"

function Store({distributorId}) {

  const [productDistributor, setProductDistributor]= useState();
  
  useEffect(() => {
    TeacherOperations.getProductDistributor(distributorId, (data) =>{
      setProductDistributor(data);
    });
 
  }, [])


  return (
    <>
    <div className="mt-2">
      <span className="font-weight-bold">Distributor</span>
    </div>
    <div className="d-flex flex-row align-items-center">
      <img
        src={productDistributor && productDistributor.profilePhoto.url}
        className="rounded-circle store-image"
      />
      <div className="d-flex flex-column ml-1 comment-profile">
        <div className="comment-ratings">
          <i className="fa fa-star"></i> <i className="fa fa-star"></i>
          <i className="fa fa-star"></i> <i className="fa fa-star"></i>
        </div>
        <span className="username">{productDistributor && productDistributor.firstName + " " + productDistributor.lastName}</span>
        {/* <small className="followers">{}</small> */}
      </div>
    </div>
  </>
  );
}

export default Store;
