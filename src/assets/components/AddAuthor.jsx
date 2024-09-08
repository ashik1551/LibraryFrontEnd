import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postAuthorApi } from '../services/api';

function AddAuthor({setRefresh}) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [author, setAuthor] = useState({ name: '', bio: '' })

    async function handleSubmit(event){
        event.preventDefault()
        let res=await postAuthorApi(author)
        if(res.status>199 && res.status<300){
            handleClose()
            setRefresh(Math.random())
        }
        
    }

    return (
        <div>
            <Button variant="outline-primary" onClick={handleShow}>
                <i class="fa fa-light fa-add"></i> Add Author
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Author Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="border rounded p-3">
                        <form action="" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="">Name</label>
                                <input type="text" className="form-control" onChange={(e)=>{setAuthor({...author,name:e.target.value})}} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="">Bio</label>
                                <textarea type="type" rows={5} className="form-control" onChange={(e)=>{setAuthor({...author,bio:e.target.value})}} required />
                            </div>
                            <div className="mb-3">
                                <Button variant="secondary me-2" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" type='submit'>Save</Button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>

            </Modal>
        </div>
    )
}

export default AddAuthor