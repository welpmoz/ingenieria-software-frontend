import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import "./appbar.css"

function Appbar({ page, username, isAdmin }) {
  const [cookies, setCookie, removeCookie] = useCookies(null)

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
          {isAdmin &&
            <Button variant='primary'>
              <Link to='/docentes'>Ver Docentes</Link>
            </Button>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Appbar;