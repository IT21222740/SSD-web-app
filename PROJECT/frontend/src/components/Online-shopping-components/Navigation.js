import React from "react";
import "bulma/css/bulma.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  Badge,
  Container,
  Navbar,
  Nav,
  Button,
  NavDropdown,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Store } from "./Store";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { getError } from "./Utils";

import { createContext } from "react";
import AnimatedRoutes from "./AnimatedRoutes";
import Logo from "../../Images/33.jpg";
import { useAuth0 } from "@auth0/auth0-react";

export const ThemeContext = createContext(null);

function Navigation() {
  const [theme, setTheme] = useState("light");
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (err) {
        toast.error(getError(err));
      }
    };
    fetchCategories();
  }, []);
  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    window.location.href = "/Customer_Login";
  };
  const logoutWithRedirect = () =>
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  return (
    <div>
      <Navbar bg="light" variant="light">
        <Container>
          {/* <Button
                variant="dark"
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className="fas fa-bars" id='category__'></i>
              </Button> */}
          <LinkContainer to="/">
            <Navbar.Brand>
              {" "}
              <img
                src={Logo}
                width="200px"
                height="20"
                className="d-inline-block align-top"
                id="nav_img"
              />{" "}
            </Navbar.Brand>
          </LinkContainer>

          <Nav className="me_auto">
            <Link to="/cart" className="nav-link">
              cart
              {cart.cartItems.length > 0 && (
                <Badge pill bg="danger">
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                </Badge>
              )}
            </Link>
            {!isAuthenticated && (
              <li>
                <button
                  className="nav-link"
                  onClick={() => loginWithRedirect()}
                >
                  Log in
                </button>
              </li>
            )}
            {isAuthenticated && (
              <NavDropdown title={user.name} id="basic-nav-dropdown">
                <LinkContainer to="/orderList">
                  <NavDropdown.Item>OrderList</NavDropdown.Item>
                </LinkContainer>

                <NavDropdown.Divider />

                <Link
                  className="dropdown-item"
                  to="#signout"
                  onClick={() => logoutWithRedirect()}
                >
                  Log out
                </Link>
              </NavDropdown>
            )}

            {/* {userInfo ? (
              <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                <LinkContainer to="/orderList">
                  <NavDropdown.Item>OrderList</NavDropdown.Item>
                </LinkContainer>

                <NavDropdown.Divider />
                <Link
                  className="dropdown-item"
                  to="#signout"
                  onClick={signoutHandler}
                >
                  Sign Out
                </Link>
              </NavDropdown>
            ) : (
              <NavDropdown title="sign in">
                <Link className="nav-link" to="/Customer_Login">
                  Sign In
                </Link>
                <Link to="/Customer_Register" className="nav-link">
                  Sign up
                </Link>
              </NavDropdown>
            )} */}
            {userInfo && userInfo.isAdmin && (
              <NavDropdown title="Admin" id="admin-nav-dropdown">
                <LinkContainer to="/dashboard/app">
                  <NavDropdown.Item>AdminDashBoard</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
            {userInfo && userInfo.isCustomer && (
              <NavDropdown title="Services" id="admin-nav-dropdown">
                <LinkContainer to="/ChatBot">
                  <NavDropdown.Item>Ai Chatbot</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/clothings">
                  <NavDropdown.Item>Fashion Trends</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </Nav>
        </Container>
      </Navbar>

      {/* <Navbar bg = "dark" variant = "dark">
      <Container>
      <Button
                variant="dark"
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className="fas fa-bars"></i>
              </Button>
        <Navbar.Brand href="#home">
        
          
        
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav className="ms-auto">
            <Nav.Link href="#login">Log In</Nav.Link>
            <Nav.Link href="#signup">Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar> */}
      <div
        className={
          sidebarIsOpen
            ? "active-nav side-navbar d-flex justify-content-between flex-wrap flex-column"
            : "side-navbar d-flex justify-content-between flex-wrap flex-column"
        }
      >
        <Nav className="flex-column text-white w-100 p-2">
          <Nav.Item>
            <strong>Categories :</strong>
          </Nav.Item>
          {categories.map((category) => (
            <Nav.Item key={category}>
              {/* <LinkContainer
                  to={`/Category/${category}`}
                  onClick={() => setSidebarIsOpen(false)}
                >  */}

              {category}
              {/* </LinkContainer>  */}
            </Nav.Item>
          ))}
        </Nav>
      </div>
      <Container className="mt-3">
        <AnimatedRoutes />
      </Container>
    </div>
  );
}

export default Navigation;
