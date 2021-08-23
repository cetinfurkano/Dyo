import React, { useEffect, useRef } from "react";

import $ from "jquery";

function PerforanceInfo({ percentage, publisherName, onClick }) {
  

  const circleCompleteRef = useRef(null);

  useEffect(() => {
    circleCompleteRef.current.removeAttribute("style");
    const percent = percentage; //svgRadialRef.current.dataset.percentage;
    const radius = circleCompleteRef.current.getAttribute("r");
    const circumference = 2 * Math.PI * radius;
    const strokeDashOffset = circumference - (percent * circumference) / 100;
    var circleComplete = $(circleCompleteRef.current);
    circleComplete.animate({ "stroke-dashoffset": strokeDashOffset }, 1250);
    // console.log(circleCompleteRef.current);
  }, []);

  return (
      <div className="col-md-3 mt-3">
        <div className="card">
          <div className="card-body text-white text-center">
            <h1>{publisherName}</h1>
            <svg
              className="radial-progress"
              data-percentage={percentage}
              viewBox="0 0 80 80"
            >
              <circle className="incomplete" cx="40" cy="40" r="35"></circle>
              <circle
                className="complete"
                cx="40"
                cy="40"
                r="35"
                style={{ strokeDashoffset: "39.58406743523136" }}
                ref={circleCompleteRef}
              ></circle>
              <text
                className="percentage"
                x="50%"
                y="57%"
                transform="matrix(0, 1, -1, 0, 80, 0)"
              >
                %{percentage}
              </text>
            </svg>
            <h5>
              <a
                className="text-primary"
                style={{ textDecoration: "none" }}
                onClick={(e) => {
                  e.preventDefault();
                  onClick(publisherName);
                }}
              >
                Detayları Görüntüle
                <i className="fa fa-arrow-circle-right" aria-hidden="true"></i>
              </a>
            </h5>
          </div>
        </div>
      </div>
  );
}

export default PerforanceInfo;
