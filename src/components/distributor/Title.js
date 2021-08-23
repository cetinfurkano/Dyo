import React from 'react'

function Title({className, title, text, icon}) {
    return (
        <div className={className}>
        <div>
          <h1>{title}</h1>
          <p>{text}</p>
        </div>
        <i className={icon} aria-hidden="true"></i>
      </div>
    )
}

export default Title
