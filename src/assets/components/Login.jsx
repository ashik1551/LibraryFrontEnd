import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getTokenApi } from '../services/api';
import { useNavigate } from 'react-router-dom';

function Login() {

    const [user,setUser]=useState({username:'',password:''})

    const [show, setShow] = useState(false);

    const navigate=useNavigate()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function handleSubmit(event) {
        event.preventDefault()
        let res=await getTokenApi(user)
        if (res.status>199 && res.status<300){
            sessionStorage.setItem('access',res.data.access)
            sessionStorage.setItem('refresh',res.data.refresh)
            alert("Login Successfully...!")
            handleClose()
            navigate('/book')
        }
        
    }

    return (
        <div>

            <Button variant='outline-light' onClick={handleShow}><i class="fa fa-light fa-file-import"></i> Login</Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Admin Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="border rounded p-3">
                        <div className="row">
                            <div className="col-3">
                                <img src="img/admin.png" height='250px' alt="" />
                            </div>
                            <div className="col-2"></div>
                            <div className="col-7">
                                <form onSubmit={handleSubmit}>

                                    <div className="mb-3">
                                        <label htmlFor="">Username</label>
                                        <input type="text" onChange={(e)=>setUser({...user,username:e.target.value})} className="form-control" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="">Password</label>
                                        <input type="password" onChange={(e)=>setUser({...user,password:e.target.value})} className="form-control" required />
                                    </div>
                                    <div className="mb-3"><Button variant="secondary me-2" onClick={handleClose}>
                                        Close
                                    </Button>
                                        <Button variant="primary" type='submit'>Login</Button></div>
                                </form>
                            </div>
                        </div>
                    </div>

                </Modal.Body>

            </Modal>
        </div>
    )
}

export default Login