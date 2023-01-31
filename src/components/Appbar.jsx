import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useCookies } from 'react-cookie';

function Appbar({ username }) {
  const [cookies, setCookie, removeCookie] = useCookies(null)

  const signOut = () => {
    removeCookie('username')
    removeCookie('password')
    removeCookie('firstName')
    window.location.reload()
  }
  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">{ username }</a>
          </Navbar.Text>
          <Button variant='primary' onClick={signOut}>Logout</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Appbar;