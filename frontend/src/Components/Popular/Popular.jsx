import React from 'react'

import Item from "../Item/Item"
import "./Popular.css"

export const Popular = () => {

  const [popularProducts,setPopularProducts]=React.useState([])

  React.useEffect(()=>{
    fetch("http://localhost:4005/popularinwomen")
    .then((res)=>res.json())
    .then((data)=>setPopularProducts(data))
  },[])

  return (
    <div className='popular'>
      <h1>POPULAR IN WOMEN</h1>
      <hr/>
        <div className='popular-item'>
        
            {popularProducts.map((item,i)=> {
                return <Item key={i} id={item.id} 
                image={item.image}
                name={item.name}
                new_price={item.new_price}
                old_price={item.new_price}
                /> 
            })}
        </div>
    </div>
  )
}
