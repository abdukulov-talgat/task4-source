import React from 'react';
import {Outlet} from "react-router-dom";
import {Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import {AppRoute} from "../const";
import {ToastContainer} from "react-toastify";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {logout, selectAuth} from "../redux/authSlice";
import {unicodeDecodeB64} from "../utils";

const Layout = () => {
  const authToken = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const handleLogoutClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(logout());
  }

  return (
    <>
      <header className="mb-5">
        <Navbar bg="primary" variant="dark">
          <Nav className="me-auto text-uppercase fw-bold">
            <LinkContainer to={AppRoute.Home}>
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            {
              authToken.token ? (
                <>
                  <span className="text-white opacity-75 p-2 ms-auto">{unicodeDecodeB64(authToken.token)}</span>
                  <Nav.Link onClick={handleLogoutClick}>Logout</Nav.Link>
                </>
              ) : (
                <>
                  <LinkContainer to={AppRoute.Login}>
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to={AppRoute.Register}>
                    <Nav.Link>Register</Nav.Link>
                  </LinkContainer>
                </>
              )
            }
          </Nav>
        </Navbar>
      </header>
      <main className="main">
        <Outlet/>
      </main>
      <ToastContainer/>
    </>
  );
};

export default Layout;
