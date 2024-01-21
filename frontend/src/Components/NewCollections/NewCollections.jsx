import React from 'react'
import "./NewCollections.css"
import Item from "../Item/Item"


export const NewCollections = () => {

  const [new_collection,setNew_collection]=React.useState([])

  React.useEffect(()=>{
    fetch("http://localhost:4005/newcollections")
    .then((res)=>res.json())
    .then((data)=>setNew_collection(data))
  },[])

  return (
    <div className='new-collections'>
    <h1>NEW COLLECTIONS</h1>
    <hr/>
    <div className='collections'>
      {new_collection.map((item,i)=>{
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
