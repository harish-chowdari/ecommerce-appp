import React from 'react'
import "./CSS/LoginSignup.css"


export const LoginSignup = () => {

  const [state,setState] = React.useState("Login")

  const [formData,setFormData]=React.useState({
    name:"",
    email:"",
    password:""
  })

  const changeHandler =(e)=>{
    setFormData({...formData, [e.target.name]:e.target.value})
  }

  const login = async()=>{
    console.log("login",formData)
    let responseData
    await fetch("http://localhost:4005/login",{
      method:"POST",
      headers:{
          Accept: "application/json",
          "Content-Type":"application/json"
      },
      body:JSON.stringify(formData)
    })
    .then((res)=>res.json())
    .then((data)=>{responseData=data})
    if(responseData.success)
    {
      localStorage.setItem("auth-token", responseData.token)
      window.location.replace("/")
    }
    else{
      alert(responseData.errors)
    }
  }

  const signup = async()=>{
    let responseData
    await fetch("http://localhost:4005/signup",{
      method:"POST",
      headers:{
          Accept: "application/json",
          "Content-Type":"application/json"
      },
      body:JSON.stringify(formData)
    })
    .then((res)=>res.json())
    .then((data)=>{responseData=data})
    if(responseData.success)
    {
      localStorage.setItem("auth-token", responseData.token)
      window.location.replace("/")
    }
    else{
      alert(responseData.errors)
    }

  }


  return (

    <div className="loginsignup">
    <div className="loginsignup-container">
      <h1>{state}</h1>

      <div className="loginsignup-fields">
         { state === "SignUp" ?   <input type="text" name='name' value={formData.name} onChange={changeHandler} placeholder="Your Name" />  : <></>}
          <input type="email" name='email' value={formData.email} onChange={changeHandler} placeholder="Email Address" />
          <input type="password" name='password' value={formData.password} onChange={changeHandler} placeholder="Password" />
      </div>

        <button onClick={ ()=>{state === "Login" ? login() : signup()} }>Continue</button>

       {state === "SignUp" ?  <p className="loginsignup-login">Already have an account <span onClick={()=>{setState("Login")}}>Login here</span></p> : 
       <p className="loginsignup-login">Create an account <span onClick={()=>{setState("SignUp")}}>SignUp here</span></p> }
      
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing , i agree to the terms of use & privacy policy. </p>
        </div>
        </div>
        </div>
  )
}
