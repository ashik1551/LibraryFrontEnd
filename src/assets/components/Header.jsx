import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Login from './Login';
import { useNavigate } from 'react-router-dom';

function Header() {

  const navigate = useNavigate()

  function handleLogout() {
    let c = confirm("Are you sure..?")
    if (c) {
      sessionStorage.clear()
      navigate('/')
    }
  }

  useEffect(() => {
    sessionStorage.getItem('access') ? null : navigate('/')
  }, [])

  return (
    <div>
      <Navbar fixed='top' expand="lg" className="bg-dark py-3">
        <Container>
          <Navbar.Brand href="" className='text-light fs-3'>Library Management</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {sessionStorage.getItem('access') ?
              <Nav className="me-auto">
                <Nav.Link href="" className='text-light' onClick={()=>{navigate('/book')}}>Books</Nav.Link>
                <Nav.Link href="" className='text-light' onClick={()=>{navigate('/member')}}>Members</Nav.Link>
                <Nav.Link href="" className='text-light' onClick={()=>{navigate('/rent')}}>Rented</Nav.Link>
              </Nav>
              : null}
            <Nav className='ms-auto'>
              <Nav.Item>{sessionStorage.getItem('access') ? <button className='btn btn-outline-light' onClick={handleLogout}><i class="fa fa-light fa-right-from-bracket"></i> Logout</button> : <Login></Login>}</Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header