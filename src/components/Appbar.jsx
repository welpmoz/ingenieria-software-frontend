import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import "./appbar.css"

function Appbar({ page }) {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const username = cookies.username
  const is_staff = cookies.is_staff

  const navigate = useNavigate()

  const signOut = () => {
    removeCookie('username')
    removeCookie('password')
    removeCookie('is_staff')
    navigate('/')
  }

  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="#home">{ page }</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">{ username }</a>
          </Navbar.Text>
          <Button variant='primary' onClick={signOut}>Logout</Button>
          { is_staff && <button>Ver Docentes</button> }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Appbar;