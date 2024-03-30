import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom'
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import {Button,Nav,Navbar,Offcanvas,Container,Form,NavDropdown,Row,Col} from 'react-bootstrap';
import Login from './Pages/Login';
import Home from './Pages/Home';
import {useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './Firebaseinit';
import { signOut } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import Reg from '../src/Pages/Reg';


function App() {
  const [user] = useAuthState(auth);
    let nav=useNavigate;
  const logout = () => {
    signOut(auth);
        nav('/home')
  }
  return (
    <div>
      <Router>
      {/* <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Medicine Remainder</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link><Link to='/' style={{textDecoration:'none',color:'inherit'}}>Login</Link></Nav.Link>
            <Nav.Link ><Link to='/home' style={{textDecoration:'none',color:'inherit'}}>Home</Link></Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">Profile</Nav.Link>
            <Nav.Link onClick={logout}>
             Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar> */}
    <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/Register' element={<Reg/>}/>
          {user&&
          <Route path='/home' element={<Home/>}/>
          }
          <Route path='*' element={<div style={{textAlign:'center',position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)'}}><h1 > UnAuthorized Area⚠️ </h1><Link to='/'>Go Home</Link></div>} />
        </Routes>
    </Router>
      
    </div>
  );
}

export default App;

