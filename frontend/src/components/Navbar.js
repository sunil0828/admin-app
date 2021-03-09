import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
import { signout } from "../actions/userActions";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function Navigationbar() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  // return (
  //   <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  //     <nav className="container">
  //       <Link className="navbar-brand" to="/">
  //         Admin page
  //       </Link>

  //       <div className=" collapse navbar-collapse">
  //         <ul className="navbar-nav mr-auto">
  //           <li className="nav-item ">
  //             <Link className="nav-link" to="/">
  //               Home <span className="sr-only">(current)</span>
  //             </Link>
  //           </li>
  //           <li className="nav-item">
  //             <Link className="nav-link" to="/profile">
  //               Profile
  //             </Link>
  //           </li>
  //           <li className="nav-item">
  //             <Link className="nav-link" to="/contact">
  //               Contact
  //             </Link>
  //           </li>
  //           <li className="nav-item">
  //             <Link className="nav-link" to="/users">
  //               Users
  //             </Link>
  //           </li>
  //           <li className="nav-item">
  //             <Link className="nav-link" to="/createUser">
  //               Add User
  //             </Link>
  //           </li>
  //           <li className="nav-item">
  //             <Link className="nav-link" to="/register">
  //               Register
  //             </Link>
  //           </li>
  //           {userInfo ? (
  //             <li className="nav-item ">
  //               <Link
  //                 className="nav-link"
  //                 to="#signout"
  //                 onClick={signoutHandler}
  //               >
  //                 Sign Out
  //               </Link>
  //             </li>
  //           ) : (
  //             // </li>
  //             <li className="nav-item">
  //               <Link className="nav-link" to="/signin">
  //                 Sign In
  //               </Link>
  //             </li>
  //           )}
  //         </ul>
  //       </div>
  //     </nav>
  //   </nav>
  // );

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">Admin App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav ">
        <Nav className="mr-auto ">
          <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/contact">
            <Nav.Link>Contact</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/createUser">
            <Nav.Link>Add User</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/users">
            <Nav.Link>Users</Nav.Link>
          </LinkContainer>
          {userInfo ? (
            <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
              <LinkContainer to="/profile">
                <NavDropdown.Item>Profile</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="#signout">
                <NavDropdown.Item onClick={signoutHandler}>
                  Signout
                </NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          ) : (
            <LinkContainer to="/signin">
              <Nav.Link>Signin</Nav.Link>
            </LinkContainer>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
