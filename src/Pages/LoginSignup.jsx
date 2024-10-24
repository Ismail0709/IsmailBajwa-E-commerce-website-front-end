import React, { useState } from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {

  const [state, setState] = useState('Login');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const changeHandler = (e)=> {
    setFormData({...formData, [e.target.name] : e.target.value});
  }


  const login = async (req, res)=>{
    console.log("Login function executed")
    let responseData;
    await fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    }).then((res)=> res.json()).then((data)=> responseData = data)

    if(responseData.success){
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace('/');
    }else{
      alert(responseData.error)
    }
  }

  const signup = async (req, res)=>{
    console.log("Signup function executed")
    let responseData;
    await fetch('http://localhost:8000/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    }).then((res)=> res.json()).then((data)=> responseData = data)

    if(responseData.success){
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace('/');
    }else{
      alert(responseData.error)
    }
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === 'Sign Up' ? <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Enter your name'/> : <></>}
          <input value={formData.email} onChange={changeHandler} type="email" name="email" placeholder='Email' />
          <input value={formData.password} onChange={changeHandler} type="password" name="password" placeholder='Password' />
        </div>
        <button onClick={()=> {state === 'Login' ? login() : signup()}}>Continue</button>
        {state === 'Sign Up' ? <p className="loginsignup-login">Already have an account ? <span style={{cursor: 'pointer'}} onClick={()=> {setState('Login')}}> Login Here</span></p> : 
        <p className="loginsignup-login">Create an account ? <span style={{cursor: 'pointer'}} onClick={()=> {setState('Sign Up')}}> Click Here</span></p>
        }
        <div className="loginsignup-agree">
          <input type="checkbox" name="" />
          <p>I agree to the terms of use & privacy policy</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
