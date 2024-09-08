import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postGenreApi } from '../services/api';

function AddGenre({setRefresh}) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [genre,setGenre]=useState({title:''})

    async function handleSubmit(event){
        event.preventDefault()
        let res=await postGenreApi(genre)
        if(res.status>199 && res.status<300){
            handleClose()
            setRefresh(Math.random())
        }
        
    }

    return (
        <div>
            <Button variant="outline-primary" onClick={handleShow}>
            <i class="fa fa-light fa-add"></i> Add Genre
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Genre Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="border rounded p-3">
                        <form action="" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="">Title</label>
                                <input type="text" onChange={(e)=>{setGenre({...genre,title:e.target.value})}} className="form-control"  required />
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

export default AddGenre