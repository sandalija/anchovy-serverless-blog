import { useEffect, useState } from "react";
import { decodeToken } from "../../lib/auth/cognito";
import { Button, Container, Navbar } from "react-bootstrap";
import { COGNITO_LOGIN, COGNITO_LOGOUT } from "../../constants/cognito";
import AuthHeader from "../AuthHeader";
import Link from "next/link";

const NavbarBanner = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark" >
      <Container>
        <Link href="/posts/first-post">
          <Navbar.Brand>Home</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <AuthHeader />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarBanner;
