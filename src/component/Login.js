import React, { useState } from 'react'
import { useNavigate  } from 'react-router-dom'

function Login() {
  let history=useNavigate()
  const [loginForm, updateLogin] = useState({ email: "", password: "" })
  const handel = async (e) => {
    e.preventDefault()
    let url = `http://localhost:80/api/auth/login`
    let param = {
      method: "POST",
      headers: {
        "Content-Type": "application/json ", 
      },
      body: JSON.stringify({email:loginForm.email, password:loginForm.password })
    }
    let login = await fetch(url, param)
    let data = await login.json()
     
    if(data.success){
      localStorage.setItem('token',data.authToken)
      history("/")
    }else{
  
    }
  }
  let onChange = (e) => {
    updateLogin({ ...loginForm, [e.target.name]: e.target.value })
}
  return (
    <>
      <div className='container my-4'>
        <h1 className='my-2 text-center'>Login First</h1>
        <form onSubmit={handel}>
          <div className='mb-3 row'>
            <label  >Email:</label>
            <div className="col-sm-10">
              <input type="email" name='email' required value={loginForm.email} onChange={onChange} className="form-control" id="Email" />
            </div>
          </div>

          <div className='mb-3 row'>
            <label  >Passworsd:</label>
            <div className="col-sm-10">
              <input type="text" name='password' required value={loginForm.password} onChange={onChange} className="form-control" id="password" />
            </div>
          </div>
          <button disabled={(loginForm.email===0)} className='btn btn-primary'>Login</button>
        </form>
      </div>


    </>
  )
}

export default Login

