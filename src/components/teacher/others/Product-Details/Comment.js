import React from "react";

function Comment() {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <div className="d-flex flex-row align-items-center">
        <img
          src="https://i.imgur.com/o5uMfKo.jpg"
          className="rounded-circle profile-image"
        />
        <div className="d-flex flex-column ml-1 comment-profile">
          <div className="comment-ratings">
            <i className="fa fa-star"></i> <i className="fa fa-star"></i>
            <i className="fa fa-star"></i> <i className="fa fa-star"></i>
          </div>
          <span className="username">Lori Benneth</span>
        </div>
      </div>
      <div className="date">
        <span className="text-muted">2 May</span>
      </div>
    </div>
  );
}

export default Comment;
