import React from 'react'
import Comment from "./Comment"

function Rewiews() {
    
    return (
        <div className="card mt-2">
        <h6>Reviews</h6>
        <div className="d-flex flex-row">
          <div className="stars">
            <i className="fa fa-star"></i> <i className="fa fa-star"></i>
            <i className="fa fa-star"></i> <i className="fa fa-star"></i>
          </div>
          <span className="ml-1 font-weight-bold">4.6</span>
        </div>
        <hr />
        <div className="badges">
          <span className="badge bg-dark">All (230)</span>
          <span className="badge bg-dark">
            <i className="fa fa-image"></i> 23
          </span>
          <span className="badge bg-dark">
            <i className="fa fa-comments-o"></i> 23
          </span>
          <span className="badge bg-warning">
            <i className="fa fa-star"></i> <i className="fa fa-star"></i>
            <i className="fa fa-star"></i> <i className="fa fa-star"></i>
            <span className="ml-1">2,123</span>
          </span>
        </div>
        <hr />
        <div className="comment-section">
         <Comment />
          <hr />
          <Comment />
          <hr />
          <Comment />
          <hr />
          <Comment />
        </div>
      </div>  
    );
}

export default Rewiews
