import React, { useState } from 'react';
import './CSS/LoginSignup.css';

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });
  
  const changeHandler = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  

  const login = async () => {
    console.log("login", formData);
    // Add login logic here
    try {
      const response = await fetch("http://localhost:4000/login", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        window.location.replace("/");
        // Consider using React Router for navigation
        // Example: history.push("/")
      } else {
        // Handle signup failure, show error message, etc.
        alert(responseData.error);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      // Handle other errors
    }
  };

  const signup = async () => {
    console.log("signup", formData);
    try {
      const response = await fetch("http://localhost:4000/signup", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        window.location.replace("/");
        // Consider using React Router for navigation
        // Example: history.push("/")
      } else {
        // Handle signup failure, show error message, etc.
        alert(responseData.error);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      // Handle other errors
    }
  };

  return (
    <div className='loginsignup'>
      <div className='loginsingup-container'>
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' /> : <></>}
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
          
        </div>
        <button onClick={() => { state === "Login" ? login() : signup(); }}>Continue</button>
        {state === "Sign Up" ? <p className='loginsignup-login'>Already have an account?<span onClick={() => { setState("Login"); }}> Login here</span></p>
          : <p className='loginsignup-login'>Create an account?<span onClick={() => { setState("Sign Up"); }}> Click here</span></p>}
        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By Continuing, I agree to the terms of use & privacy policy. </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
