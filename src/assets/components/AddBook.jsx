import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getAuthorListApi, getGenreListApi, postBookApi } from '../services/api';

function AddBook({setRefresh}) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [author,setAuthor]=useState()
    const [authorData,setAuthorData]=useState()

    const [genre,setGenre]=useState()
    const [genreData,setGenreData]=useState()

    const [book,setBook]=useState({title:''})

    async function getAuthorData(){
        let res=await getAuthorListApi()
        if(res.status>199 && res.status<300){
            setAuthor(res.data)
        }
    }

    async function getGenreData(){
        let res=await getGenreListApi()
        if(res.status>199 && res.status<300){
            setGenre(res.data)
        }
    }

    async function handleSubmit(event){
        event.preventDefault()
        let res=await postBookApi(book,authorData,genreData)
        if(res.status>199 && res.status<300){
            handleClose()
            setRefresh(Math.random())
        }
    }

    useEffect(()=>{
        getAuthorData()
        getGenreData()
    },[])

    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                <i class="fa fa-light fa-book"></i> Add Book
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Book Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="border rounded p-3">
                        <form action="" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="">Title</label>
                                <input type="text" className="form-control" onChange={(e)=>{setBook({...book,title:e.target.value})}} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="">Author</label>
                                <select name="" id="" className="form-control" onChange={(e)=>{setAuthorData(e.target.value)}} required>
                                    <option value="" selected disabled>select</option>
                                    {author&&author.map((a,i)=>
                                    <option key={i} value={a.id}>{a.name}</option>)}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="">Genre</label>
                                <select name="" id="" className="form-control" onChange={(e)=>{setGenreData(e.target.value)}} required>
                                    <option value="" selected disabled>select</option>
                                    {genre&&genre.map((a,i)=>
                                    <option key={i} value={a.id}>{a.title}</option>)}
                                </select>
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

export default AddBook