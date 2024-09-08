import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { retreiveGenreApi, updateGenreApi } from '../services/api';

function EditGenre({setRefresh,genreId}) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [genre,setGenre]=useState({title:''})

    async function handleSubmit(event){
        event.preventDefault()
        let res=await updateGenreApi(genreId,genre)
        if(res.status>199 && res.status<300){
            setRefresh(Math.random())
            handleClose()
        }
    }
    
    async function getGenreData(id){
        let res=await retreiveGenreApi(id)
        if(res.status>199 && res.status<300){
            setGenre(res.data);
        }
    }

    useEffect(()=>{
        getGenreData(genreId)
    },[])

    return (
        <div>
            <Button variant="outline-light" onClick={handleShow}>
            <i class="fa fa-light fa-pen-to-square" style={{"color": "#ffD43B"}}></i>
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Genre Edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   
                <div className="border rounded p-3">
                        <form action="" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="">Title</label>
                                <input type="text" value={genre.title} onChange={(e)=>{setGenre({...genre,title:e.target.value})}} className="form-control"  required />
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

export default EditGenre