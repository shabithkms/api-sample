import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Navbar,
  Form,
  Button,
  Nav,
  Container,
  Offcanvas,
  NavDropdown,
  FormControl,
} from "react-bootstrap";
import AuthContext from "../../context/userContext";
import axios from 'axios'

function NavBar() {
  const navigate = useNavigate();
  const {getLoggedIn} = useContext(AuthContext);

  async function logout() {
    await axios.get("http://localhost:3001/logout").then((res)=>{
      getLoggedIn();
      navigate('/')
    }).catch((err)=>{
      console.log(err);
    })
    
  }

  const { loggedIn } = useContext(AuthContext);
  console.log(loggedIn, "HY");
  return (
    <Navbar bg="light" expand={false}>
      <Container fluid>
        <Navbar.Brand href="#">Incubation</Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              Incubation
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              {/* <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link> */}
              {loggedIn === false && (
                <>
                  <Nav.Link onClick={() => navigate("/login")}>Login</Nav.Link>
                  <Nav.Link onClick={() => navigate("/signup")}>
                    Signup
                  </Nav.Link>
                </>
              )}
              {loggedIn === true && (
                <Nav.Link onClick={() => navigate("/logout")}>
                  <button onClick={logout}>Logout</button>
                </Nav.Link>
              )}

              {/* <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
            {/* <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form> */}
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default NavBar;
