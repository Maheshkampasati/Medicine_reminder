import React,{useState,useEffect} from 'react'
import {Alert,Container,Row,Col,Form,FloatingLabel,Button,Table,Nav} from 'react-bootstrap'
import { collection, getDocs,addDoc,deleteDoc,doc, updateDoc , setDoc} from 'firebase/firestore';
import { auth, DataBase } from '../Firebaseinit';
import { useNavigate ,Link} from "react-router-dom";
import { signOut } from 'firebase/auth';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    const [Data,setData]=useState([]);
    const [Item,SetItem]=useState();
    const [Datef,SetDate]=useState('');
    const [Quantity,SetQuantity]=useState();
    const [sec,Setsec]=useState();
    const [Id,setId]=useState();
    const [Chg,setChg]=useState(true);
    const ref=collection(DataBase,'Medicine');
    let nav=useNavigate;

    const logout = () => {
      signOut(auth);
          nav('/home')
    }

    useEffect(() => {
      getDocs(ref)
      .then(res=>{
          const movs=res.docs.map(doc=>({
            data:doc.data(),
            id:doc.id,
          }))
          setData(movs)
      })
  }, [])

  //   const push=async(e)=>{
  //     e.preventDefault();
  //     console.log(Item,Datef,Quantity)
  //     await addDoc(doc(ref),{Item,Datef,Quantity})
  //     .then(()=>{console.log('Data Submited Success!')})
  //     .catch(err=>console.log(err))
  //     // SetItem('')
  //     // SetDate('')
  //     // SetQuantity('')
  // }

  async function submit() {
    await setDoc(doc(ref),{Item,Datef,Quantity}).then(alert('Success')).catch(e=>console.log(e))
    // const docRef=colref.doc(id).set({ Block,Floor,Room,Cap:parseInt(Cap),Vac:parseInt(Cap)})
      // tst('Room Added')
}

  const updateData = () => {
    const upref=doc(DataBase,'Medicine',Id)
     updateDoc(upref,{Item,Datef,Quantity})
    .then(()=>{console.log('Update Submission Success!')})
    .catch(err=>console.log(err))
    SetItem('')
    SetDate('')
    SetQuantity('')
    setId('')
    setChg(true)
  };


 function Del(id) {
  console.log('first')
  const delref=doc(DataBase,'Medicine',id)
  deleteDoc(delref)
  .then(alert('Deletion Success'))
  .catch(err=>console.log(err.message))
 }
 let d = new Date();
 d=d.toString().split(' ')[4]
 let [b,s,r]=d.split(':');
 d=b+':'+s;
 console.log(d)
  return (
    <div>
      <Nav className="justify-content-center" activeKey="/home">
        <Nav.Item>
          <Nav.Link style={{color:'inherit',textDecoration:'none'}}><h5> Medicine Remainder</h5></Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link><Link to='/home' style={{color:'inherit',textDecoration:'none'}}>Home</Link></Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={logout}>Logout</Nav.Link>
        </Nav.Item>
      </Nav>
       <Container>
       <Alert variant="success">
      <Alert.Heading>Welcome,{auth.currentUser.email.split('@')[0]}</Alert.Heading>
      <p>
        We Will help you remember to take the medicines on time!
      </p>
      <hr />
      <p className="mb-0">
        Have an Good Day!🦚
      </p>
    </Alert>
      <h5></h5>
            <br />
            <h1>Add Medicine 💉</h1>
            <hr width='50%'/>
            <Row>
                <Col>
                <FloatingLabel
        controlId="floatingInput"
        label="Medicine Name"
        className="mb-3"
      >
        <Form.Control type="text" placeholder="name@example.com" value={Item} onChange={e=>SetItem(e.target.value)}/>
      </FloatingLabel></Col>
      <Col>
      <FloatingLabel controlId="floatingSelect" label="Select Day" value={Datef} onChange={e=>SetDate(e.target.value)}>
      <Form.Select aria-label="Date">
      <option disabled selected>-----------------</option>
        <option value="Every Day">Every Day</option>
        <option value="Monday">Monday</option>  
        <option value="Tuesday">Tuesday</option>
        <option value="Wedensday">Wedensday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
        <option value="Sunday">Sunday</option>
      </Form.Select>
    </FloatingLabel>
                </Col>
                <Col>
      <FloatingLabel controlId="floatingPassword" label="Time">
        <Form.Control type="time" placeholder="Password" value={Quantity}  onChange={e=>SetQuantity(e.target.value)}/>
      </FloatingLabel>
                </Col>
            </Row>
            <center>{Chg?<Button onClick={submit}>Set Remainder</Button>:<Button onClick={updateData}>Update Medicine</Button>}</center>
           <br />
           <h1>Medicine History 📃</h1>
           <hr />
           <Table striped>
            <thead>
            <tr>
                <th>Medicine Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            
       {Data.map(e=><tr key={e.id}>
            <td>{e.data.Item}</td>
            <td>{e.data.Datef}</td>
            <td>{e.data.Quantity}</td>
            {/* console.log(d.toString().split(' ')[0]=={e.data.Datef.slice[3]}) */}
            {/* {e.data.Quantity.split(':')[0]*3600+e.data.Quantity.split(':')[1]*60} */}
              {d==e.data.Quantity &&
                alert(e.data.Item)}

            <td><Button onClick={() => {
              setId(e.id) 
              SetItem(e.data.Item)
              SetDate(e.data.Datef)
              SetQuantity(e.data.Quantity)
              setChg(false)
              }} variant='outline-success' > ✏️</Button></td>
            <td> <Button variant='outline-danger' onClick={()=>{Del(e.id)}}>🗑️</Button></td>
            </tr>
        )}
        </tbody>
        </Table>
        </Container>
    </div>
  )
}

export default Home