  import React,{useState} from 'react'
import { signInWithEmailAndPassword,signOut} from 'firebase/auth'
import {auth} from '../Firebaseinit'
import {FloatingLabel,Form,Row,Col,Button,Alert,Toast} from 'react-bootstrap'
import { useNavigate,Link } from "react-router-dom";
import Logo from "../Img/logo.jpg";
const Login = () => {
    const [user,setUser]=useState();
    const [number,setNumber]=useState();
    const [error,seterror]=useState();;
    let nav=useNavigate();
    const login=async()=>{
       await signInWithEmailAndPassword(auth,user,number)
       .then(e=>{
        console.log(e)
        nav('/home')
        
      })
       .catch(e=>{seterror(e).then(console.log(e))})

      }

    const logout = () => {
        signOut(auth);
      }
  return (
    <div className='justify-content-center md'>
      <br />
       <Row className="justify-content-center">
          <img src={Logo} alt="..." style={{height:'250px',width:'350px'}}/>
        </Row>
    <Row className="justify-content-md-center">
         <center><h1>Login</h1></center>
        </Row>
        <br />
       <Row className="justify-content-md-center"><Col md={4}>{error && <Alert variant={'danger'}>{error.message}</Alert> }</Col></Row>
        <Row className="justify-content-md-center">
                <Col md={4}>
                    <FloatingLabel controlId="floatingInputGrid" label="User Name">
                    <Form.Control type="email" placeholder="name@example.com" value={user} onChange={e=>setUser(e.target.value)} style={{backgroundcolor:"transperent"}}/>
                    </FloatingLabel>
                </Col>
                </Row>
                <br />
        <Row className="justify-content-md-center">
                <Col md={4}>
                    <FloatingLabel controlId="floatingInputGrid" label="Passcode">
                    <Form.Control type="password" placeholder="name@example.com" value={number} onChange={e=>setNumber(e.target.value)}/>
                    </FloatingLabel>
                </Col>
            </Row>
            <br />
            <Row className="justify-content-center">
           <Col md={1} xs={6}><center><Button onClick={login}>Login</Button></center></Col>
           <Col md={1} xs={6}><Button><Link to='/Register' style={{color:'inherit',textDecoration:'none'}}> Register</Link></Button></Col>
            </Row>
    </div>
  )
}

export default Login