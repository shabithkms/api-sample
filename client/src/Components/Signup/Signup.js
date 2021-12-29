import React, { useState } from "react";
import { Link,  useNavigate } from "react-router-dom";
import "./Signup.css";
import axios from "axios";

function Signup() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const navigate=useNavigate()
  async function Register(e) {
    e.preventDefault();
    try {
      const registerData = {
        fname,
        lname,
        email,
        password,
      };
      await axios.post("http://localhost:3001/signup", registerData).then((res)=>{
          console.log(res);
          navigate('/login')
      }).catch((err)=>{
          console.log(err);
      })
    } catch (error) {}
  }
  return (
    <div className="signup">
      <form onSubmit={Register}>
        <h3 className="heading">Create Account</h3>

        <div className="form-group">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setFname(e.target.value)}
            value={fname}
            name="fname"
            placeholder="First name"
          />
        </div>

        <div className="form-group">
          <label>Last name</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setLname(e.target.value)}
            value={lname}
            name="lname"
            placeholder="Last name"
          />
        </div>

        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name="email"
            placeholder="Enter email"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name="password"
            placeholder="Enter password"
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Sign Up
        </button>

        <p className="forgot-password">
          Already registered{" "}
          <Link to={"/login"} style={{ textDecoration: "none" }}>
            sign in
          </Link>
        </p>

      </form>
    </div>
  );
}

export default Signup;
