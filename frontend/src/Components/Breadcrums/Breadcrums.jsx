import React from 'react'
import arrow_icon from "../Assets/breadcrum_arrow.png"
import "./Breadcrums.css"

export const Breadcrums = (props) => {

    const {product} = props
    if (!product || !product.category) {
      return null; // Render nothing if not defined
    }

  return (
    <div className="breadcrum">
        HOME <img src={arrow_icon} alt=''/>
        SHOP  <img src={arrow_icon} alt=''/>
        {product.category} 
        <img src={arrow_icon} alt=''/>
        {product.name}
    </div>
  )
}
