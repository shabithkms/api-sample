import axios from "axios";
import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import "./Login.css";
// import axios from 'axios'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate=useNavigate()
  async function doLogin(e){
    e.preventDefault()
    const loginData={
      email,
      password
    }
    await axios.post('http://localhost:3001/login',loginData).then((res)=>{
      console.log(res);
      navigate('/apply')
    }).catch((err)=>{
      console.log(err);
    })
  }
  return (
    <div className="login">
      <form onSubmit={doLogin}>
        <h3 className="heading">Sign In</h3>

        <div className="form-group email">
          <label>Email address</label>
          <input
            type="email"
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
            name="email"
            className="form-control"
            placeholder="Enter email"
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            onChange={(e)=>setPassword(e.target.value)}
            value={password}
            name="password"
            className="form-control"
            placeholder="Enter password"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Submit
        </button>
        <p className=" forgot-password">
          Create account{" "}
          <Link
            to={"/signup"}
            className="link"
            style={{ textDecoration: "none" }}
          >
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
