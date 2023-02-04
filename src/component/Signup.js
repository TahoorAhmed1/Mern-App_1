import React, { useState, } from 'react'

import { useNavigate } from 'react-router-dom'

const Signup = () => {




    let history=useNavigate()
  const [loginForm, updateLogin] = useState({ name:"", email: "", password: "",number:"" })
  const handel = async (e) => {
    e.preventDefault()
    let url = `http://localhost:80/api/auth/singup`
    let param = {
      method: "POST",
      headers: {
        "Content-Type": "application/json ", 
      },
      body: JSON.stringify({ name:loginForm.name,email:loginForm.email, password:loginForm.password,number:loginForm.number})
    }
    let signup = await fetch(url, param)
    let datas = await signup.json()
      
    if(datas.success){
      localStorage.setItem('token',datas.authToken)
      history("/")
    }else{
    alert("ivalid")
    }
  }
  let onChange = (e) => {
    updateLogin({ ...loginForm, [e.target.name]: e.target.value })
}
    return (
        <>
            <div className='container my-4 '>
                <h1 className='my-2 text-center'>Creact a user to explore  </h1>
           <form onSubmit={handel}>

                <div className="mb-3 row">
                    <label  >Name:</label>
                    <div className="col-sm-10">
                        <input type="text" name='name' onChange={onChange} value={loginForm.name} minLength={3} className="form-control" id="name" />
                    </div>
                </div>
                <div>
                    <label  >Email:</label>
                    <div className="col-sm-10">
                        <input type="text" name='email' onChange={onChange} value={loginForm.email} className="form-control" id="password" />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label  >Password:</label>
                    <div className="col-sm-10">
                        <input type="text" name='password' onChange={onChange} className="form-control" minLength={8} required value={loginForm.password} id="inputPassword" />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label >Number:</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" onChange={onChange} name='number' minLength={11} required value={loginForm.number} id="number" />

                    </div>
                </div>
                <button className='btn btn-primary ' disabled={loginForm.password < 3 }>Submite</button>
                </form>
            </div>


        </>
    )
}

export default Signup