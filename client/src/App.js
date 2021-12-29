import "./App.css";
import { useContext, useEffect, useState } from "react";
import { Route, Routes, Link, NavLink } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Form from "./Pages/Form";
import axios from "axios";
import { UserContext } from "./context/userContext";
import AuthContext from "./context/userContext";
import NavBar from "./Components/NavBar/Navbar";
import { ListGroup } from "react-bootstrap";
axios.defaults.withCredentials = true;

function App() {
  const loggedIn = useContext(AuthContext);
  useEffect(() => {
    console.log(UserContext,"ggh");
    // UserContext.getLoggedIn()
  }, [])

  // console.log(AuthContext);
  console.log(loggedIn);
  return (
    <div className="App">
      <UserContext>
        <NavBar />

        <Routes>
          {!loggedIn && (
            <>              
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route  path="/apply" element={<Form />} />
            </>
          )}
          {loggedIn && (
            <>
            <Route exact path="/" element={<Home />} />
           
            </>
          )}
        </Routes>
      </UserContext>
    </div>
  );
}

export default App;
