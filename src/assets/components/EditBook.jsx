import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getAuthorListApi, getGenreListApi, retreiveBookApi, updateBookApi } from '../services/api';

function EditBook({bookId,setRefresh}) {

    const [show, setShow] = useState(false);

    const [book,setBook]=useState({title:'',author:'',genre:''})
    
    const [author, setAuthor] = useState("")

    const [genre, setGenre] = useState("")

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function handleSubmit(event){
        event.preventDefault()
        let res=await updateBookApi(bookId,{title:book.title},book.author,book.genre)
        if(res.status>199 && res.status<300){
            handleClose()
            setRefresh(Math.random())
        }
    }

    async function getAuthordata() {
        let res = await getAuthorListApi()
        if (res.status > 199 && res.status < 300) {
            setAuthor(res.data)

        }
    }

    async function getGenredata() {
        let res = await getGenreListApi()
        if (res.status > 199 && res.status < 300) {
            setGenre(res.data)

        }
    }

    async function getBookdata(id) {
        let res = await retreiveBookApi(id)
        if (res.status > 199 && res.status < 300) {
            setBook(res.data)
        }
    }

    useEffect(()=>{
        getAuthordata()
        getGenredata()
        getBookdata(bookId)
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
                    <Modal.Title>Edit Book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                <div className="border rounded p-3">
                        <form action="" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="">Title</label>
                                <input type="text" className="form-control" value={book.title} onChange={(e)=>{setBook({...book,title:e.target.value})}} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="">Author</label>
                                <select name="" id="" className="form-control" value={book.author} onChange={(e)=>{setBook({...book,author:e.target.value})}} required>
                                    <option value="" selected disabled>select</option>
                                    {author&&author.map((a,i)=>
                                    <option key={i} value={a.id}>{a.name}</option>)}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="">Genre</label>
                                <select name="" id="" className="form-control" value={book.genre} onChange={(e)=>{setBook({...book,genre:e.target.value})}} required>
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

export default EditBook