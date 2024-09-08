import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { deleteAuthorApi, deleteGenreApi, getAuthorListApi, getGenreListApi } from '../services/api'
import AddAuthor from './AddAuthor'
import EditAuthor from './EditAuthor'
import AddGenre from './AddGenre'
import EditGenre from './EditGenre'

function AuthorGenreTable() {

    const [author,setAuthor]=useState()

    const [genre,setGenre]=useState()

    const [refresh,setRefresh]=useState()

    async function getAuthor() {
        let res=await getAuthorListApi()
        if(res.status>199 && res.status<300){
            setAuthor(res.data)
        }
    }

    async function handleDeleteAuthor(id){
        await deleteAuthorApi(id)
        getAuthor()
    }

    async function getGenre() {
        let res=await getGenreListApi()
        if(res.status>199 && res.status<300){
            setGenre(res.data)
        }
    }

    async function handleDeleteGenre(id){
        await deleteGenreApi(id)
        getGenre()
    }

    useEffect(()=>{
        getAuthor()
        getGenre()
    },[refresh])

    return (
        <div className='container'>
            <div className="border rounded p-3">
                <div className="row">
                    <div className="col-7">
                        <div className="fs-4 text-center fw-medium mb-2">Author Data</div>
                        <div className='mb-3'><AddAuthor setRefresh={setRefresh}></AddAuthor></div>
                        <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Bio</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {author && author.map((a,i)=>
                            <tr key={i}>
                            <td>{i+1}</td>
                            <td>{a.name}</td>
                            <td>{a.bio}</td>
                            <td><EditAuthor setRefresh={setRefresh} authorId={a.id}></EditAuthor></td>
                            <td><button className="btn btn-light" onClick={()=>{handleDeleteAuthor((a.id))}}><i class="fa fa-lg fa-light fa-trash" style={{"color": "#ff0000"}}></i></button></td>
                        </tr>)}
                        </tbody>
                    </Table>
                    </div>
                    <div className="col-1"></div>
                    <div className="col-3">
                    <div className="fs-4 text-center fw-medium mb-2">Genre Data</div>
                    <div className='mb-3'><AddGenre setRefresh={setRefresh}></AddGenre></div>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Edit</th>
                                    <th>Delete</th>

                                </tr>
                            </thead>
                            <tbody>
                                {genre && genre.map((g,i)=>
                                <tr key={i}>
                                    <td>{i+1}</td>
                                    <td>{g.title}</td>
                                    <td><EditGenre setRefresh={setRefresh} genreId={g.id}></EditGenre></td>
                                    <td><button className="btn btn-light" onClick={()=>{handleDeleteGenre(g.id)}}><i class="fa fa-lg fa-light fa-trash" style={{"color": "#ff0000"}}></i></button></td>
                                </tr>)}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthorGenreTable