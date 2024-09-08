import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postMemberApi } from '../services/api';

function AddMember({setRefresh}) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [member, setMember] = useState({ name: '', phone: '', address: '' })

  async function handleSubmit(event) {
    event.preventDefault()
    let res=await postMemberApi(member)
    if(res.status>199 && res.status<300){
      handleClose()
      setRefresh(Math.random())
    }

  }

  return (
    <div>
      <Button variant="outline-primary" onClick={handleShow}>
        <i class="fa fa-light fa-add"></i> Add Member
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Member Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="border rounded p-3">
            <form action="" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="">Name</label>
                <input type="text" onChange={(e)=>{setMember({...member,name:e.target.value})}} className="form-control" required />
              </div>
              <div className="mb-3">
                <label htmlFor="">Phone</label>
                <input type="number" onChange={(e)=>{setMember({...member,phone:e.target.value})}} className="form-control" required />
              </div>
              <div className="mb-3">
                <label htmlFor="">Address</label>
                <textarea rows={5} type="text" onChange={(e)=>{setMember({...member,address:e.target.value})}} className="form-control" required />
              </div>
              <div className="mb-3">
                <Button variant="secondary me-2" onClick={handleClose}>
                  Close
                </Button>
                <Button type='submit' variant="primary">Save</Button>
              </div>
            </form>
          </div>
        </Modal.Body>

      </Modal>
    </div>
  )
}

export default AddMember