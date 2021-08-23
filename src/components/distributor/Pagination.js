import React, { useState, useRef,useEffect } from "react";

function Pagination({totalPages, pageIndex, nextPage, previousPage, }) {
  const ulRef = useRef(null);
  
  const [listItems, setItems] = useState([]);
  
  useEffect(() => {
     
      return () => {
          cleanup
      }
  }, [input])

  const handleClick = (e) => {
    
  }
  
  
  
  return (
    <div class="pagination">
      <ul ref={ulRef}>
        {/* <li class="btn prev">
                      <span>
                        <i class="fa fa-angle-left"> Prev</i>
                      </span>
                    </li>
                    <li class="numb active">
                      <span>1</span>
                    </li>
                    <li class="numb">
                      <span>2</span>
                    </li>
                    <li class="dots">
                      <span>...</span>
                    </li>
                    <li class="numb">
                      <span>4</span>
                    </li>
                    <li class="numb">
                      <span>5</span>
                    </li>
                    <li class="dots">
                      <span>...</span>
                    </li>
                    <li class="numb">
                      <span>7</span>
                    </li>
                    <li class="btn next">
                      Next{" "}
                      <span>
                        <i class="fa fa-angle-right"></i>
                      </span>
                    </li> */}
      </ul>
    </div>
  );
}

export default Pagination;
