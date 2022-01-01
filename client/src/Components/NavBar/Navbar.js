import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import AuthContext from "../../context/userContext";
import axios from "axios";

function NavBar(props) {
  const navigate = useNavigate();
  const { getLoggedIn } = useContext(AuthContext);
  //Logout

  async function logout(admin) {
    console.log(admin);
    if (admin) {
      localStorage.removeItem("admin");
      navigate("/admin/login");
    } else {
      await axios
        .get("http://localhost:3001/logout")
        .then((res) => {
          getLoggedIn();
          localStorage.removeItem("user");
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  // const { loggedIn } = useContext(AuthContext);
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      className="header"
      variant="dark"
    >
      {props.Admin ? (
        //Admin header
        <Container>
          <Navbar.Brand className="sticky-nav"><span onClick={()=>{
            navigate('/admin')
          }} className="text-light" style={{cursor:"pointer"}}>Admin panel</span></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {/* <NavDropdown
                title="Application List"
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item href="/admin#New">
                  New application
                </NavDropdown.Item>
                <NavDropdown.Item href="/admin#Pending">
                  Pending apllication
                </NavDropdown.Item>
                <NavDropdown.Item href="/admin#Approved">
                  Approved application
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
              </NavDropdown> */}
              <Nav.Link onClick={() => navigate("/admin/track")}>
                Record track
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/admin/BookSlot")}>
                Slot booking
              </Nav.Link>
            </Nav>
            <Nav>
              {/* <Nav.Link onClick={() => navigate("/apply")}>Apply</Nav.Link> */}
              <Nav.Link>
                <button
                  onClick={() => {
                    logout(props.Admin);
                  }}
                >
                  Logout
                </button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      ) : (

        //user Header
        <Container>
          <Navbar.Brand>Incubation</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate("/apply")}>Apply</Nav.Link>
              {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
            </Nav>
            <Nav>
              {/* <Nav.Link onClick={() => navigate("/apply")}>Apply</Nav.Link> */}
              <Nav.Link>
                <button onClick={logout}>Logout</button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      )}
    </Navbar>
  );
}

export default NavBar;
