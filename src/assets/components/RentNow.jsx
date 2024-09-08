import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getMemberApi, postRentApi, retreiveBookApi } from '../services/api';

function RentNow({ bookId, setRefresh }) {

    const [book, setBook] = useState({ title: '', id: '' })

    const [member, setMember] = useState(0)

    const [dueDate, setDueDate] = useState({ due_date: '' })

    const [memberId, setMemberId] = useState()

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function getBookData(id) {
        let res = await retreiveBookApi(id)
        if (res.status > 199 && res.status < 300) {
            setBook(res.data);
        }
    }

    async function getMemberData() {
        let res = await getMemberApi()
        if (res.status > 199 && res.status < 300) {
            setMember(res.data);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault()
        let args = "?"
        args += 'member=' + memberId + "&book=" + bookId

        let c = confirm("Are You Sure..?")
        if (c) {
            let res = await postRentApi(args, dueDate)

            if (res.status > 199 && res.status < 300) {
                handleClose()
                setRefresh(Math.random())
            }
        }
    }

    useEffect(() => {
        getBookData(bookId)
        getMemberData()
    }, [])

    return (
        <div>
            <Button variant="outline-light" onClick={handleShow}>
                <i class="fa fa-light fa-book-bookmark" style={{ "color": "#63E6BE" }}></i> <span className='text-dark'>Rent</span>
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Rent Book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="border rounded p-3">
                        <form action="" onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <div className="row">
                                    <div className="col-6">
                                        <label htmlFor="">Book</label>
                                        <input type="text" value={book.title} className="form-control" readOnly />
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="">ID</label>
                                        <input type="text" value={book.id} className="form-control" readOnly />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="row">
                                    <div className="col-6">
                                        <label htmlFor="">Member</label>
                                        <select name="" id="" className="form-control" onChange={(e) => setMemberId(e.target.value)} required>
                                            <option value="" selected disabled>select</option>
                                            {member && member.map((m, i) =>
                                                <option key={i} value={m.id}>ID: {m.id} -- {m.name}</option>)}
                                        </select>
                                    </div>
                                    <div className="col-6">
                                        <label htmlFor="">Due Date</label>
                                        <input type="date" min={new Date().toISOString().slice(0, 10)} onChange={(e) => { setDueDate({ ...dueDate, due_date: e.target.value }) }} className="form-control" required />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <Button variant="secondary me-2" onClick={handleClose}>
                                    Close
                                </Button>
                                <Button type='submit' variant="primary">Submit</Button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>

            </Modal>
        </div>
    )
}

export default RentNow