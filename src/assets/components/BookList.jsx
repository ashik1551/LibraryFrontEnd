import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { deleteBookApi, getAuthorListApi, getBookListApi, getGenreListApi } from '../services/api'
import { useNavigate } from 'react-router-dom'
import AddBook from './AddBook'
import EditBook from './EditBook'
import RentedUsers from './RentedUsers'
import RentNow from './RentNow'

function BookList() {

    const navigate = useNavigate()

    const [refresh, setRefresh] = useState()

    const [book, setBook] = useState("")

    const [status, setStatus] = useState("")

    const [author, setAuthor] = useState("")
    const [authorData, setAuthorData] = useState("")

    const [genre, setGenre] = useState("")
    const [genreData, setGenreData] = useState("")

    async function getBookdata(data) {
        let res = await getBookListApi(data)
        if (res.status > 199 && res.status < 300) {
            setBook(res.data)
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

    async function handleDelete(id) {
        await deleteBookApi(id)
        getBookdata("?")
    }

    async function handleFilter() {
        let data = "?"
        if (status != "") {
            data += "status=" + status + "&"
        }

        if (authorData != "") {
            data += "author=" + authorData + "&"
        }

        if (genreData != "") {
            data += "genre=" + genreData + "&"
        }

        getBookdata(data)

    }

    useEffect(() => {
        getBookdata("?")
        getAuthordata()
        getGenredata()
    }, [refresh])

    return (
        <div className='container'>
            <div className="border border-3 shadow rounded p-3">
                <div className="mb-4">
                    <div className="border rounded p-3">
                        <div className="row">
                            <div className="col-4"><AddBook setRefresh={setRefresh}></AddBook></div>
                            <div className="col-4"><button className="btn btn-primary" onClick={() => { navigate('/book/manage') }}><i class="fa fa-light fa-pen-nib"></i> Manage Author & Genre</button></div>
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    <div className="border rounded p-4">
                        <div className="row">
                            <div className="col-3">
                                <label htmlFor="">Availability</label>
                                <select name="" id="" onChange={(e) => setStatus(e.target.value)} className='form-control'>
                                    <option value="" selected>All</option>
                                    <option value="1" >Available</option>
                                    <option value="0" >Not Available</option>
                                </select>
                            </div>
                            <div className="col-3">
                                <label htmlFor="">Author</label>
                                <select name="" id="" onChange={(e) => { setAuthorData(e.target.value) }} className='form-control'>
                                    <option value="" selected>All</option>
                                    {author && author.map((a, i) =>
                                        <option key={i} value={a.id} >{a.name}</option>
                                    )}
                                </select>
                            </div>
                            <div className="col-3">
                                <label htmlFor="">Genre</label>
                                <select name="" id="" onChange={(e) => setGenreData(e.target.value)} className='form-control'>
                                    <option value="" selected>All</option>
                                    {genre && genre.map((g, i) =>
                                        <option key={i} value={g.id} >{g.title}</option>
                                    )}
                                </select>
                            </div>
                            <div className="col-3">
                                <button className="btn btn-outline-primary mt-4" onClick={handleFilter}>Filter</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="fs-2 text-center fw-medium">All Books in Library</div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Genre</th>
                            <th>Status</th>
                            <th>Renters</th>
                            <th>Rent Now</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {book && book.map((b, i) =>
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{b.title}</td>
                                <td>{b.author}</td>
                                <td>{b.genre}</td>
                                <td>{b.status ? <div className="bg-success p-1 rounded text-light" style={{ width: "max-content" }}><i class="fa fa-lg fa-light fa-check"></i> Available</div> : <div className='bg-danger p-1 rounded text-light' style={{ width: "max-content" }}><i class="fa fa-lg fa-light fa-xmark"></i> Not Available</div>}</td>
                                <td><RentedUsers bookId={b.id}></RentedUsers></td>
                                <td>{b.status ? <RentNow bookId={b.id} setRefresh={setRefresh}></RentNow> :
                                    <button disabled className='btn btn-outline-light'><i class="fa fa-light fa-book-bookmark" style={{ "color": "#63E6BE" }}></i> <span className='text-dark'>Rent</span></button>}
                                </td>
                                <td>{<EditBook setRefresh={setRefresh} bookId={b.id}></EditBook>}</td>
                                <td><button className="btn btn-light" onClick={() => { handleDelete(b.id) }}><i class="fa fa-lg fa-light fa-trash" style={{ "color": "#ff0000" }}></i></button></td>
                            </tr>)}
                        {book.length != 0 ? null :
                            <tr>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>No Data Available</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>}
                    </tbody>
                </Table>
            </div>
        </div >
    )
}

export default BookList