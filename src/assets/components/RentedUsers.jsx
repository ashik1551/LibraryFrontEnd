import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { retreiveBookApi, retreiveMemberApi, retrieveRentApi } from '../services/api';

function RentedUsers({ bookId }) {

    const [book, setBook] = useState("")

    const [member, setMember] = useState({ name: '', id: '', phone: '', address: '' })

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function getBookDetail(id) {
        let res = await retreiveBookApi(id)
        if (res.status > 199 && res.status < 300) {
            setBook(res.data);
            let rentId = res.data.current_renter[0].id
            let res2 = await retrieveRentApi(rentId)
            let memberId = res2.data.member
            let res3 = await retreiveMemberApi(memberId)
            setMember(res3.data)
        }
    }

    useEffect(() => {
        getBookDetail(bookId)
    }, [])

    return (
        <div>
            <Button variant="outline-light" onClick={handleShow}>
                <i class="fa fa-light fa-eye" style={{ "color": "#74C0FC" }}></i>
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                fullscreen={true}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Rented Users</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="border border-3 shadow rounded p-3">
                        {member.id != '' ? <div className="border rounded p-3 mb-4">
                            <div className="fs-4 mb-3 fw-medium text-center">Book Currently with</div>
                            <div className="row">
                                <div className="col-3">
                                    <label htmlFor="">Name</label>
                                    <input type="text" value={member.name} className="form-control" readOnly />
                                </div>
                                <div className="col-3">
                                    <label htmlFor="">ID</label>
                                    <input type="text" value={member.id} className="form-control" readOnly />
                                </div>
                                <div className="col-3">
                                    <label htmlFor="">Phone</label>
                                    <input type="text" value={"+91 " + member.phone} className="form-control" readOnly />
                                </div>
                                <div className="col-3">
                                    <label htmlFor="">Address</label>
                                    <input type="text" value={member.address} className="form-control" readOnly />
                                </div>

                            </div>
                        </div> : null}
                        <div className="fs-4 fw-medium text-center mb-4">Rented Users Details</div>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Book</th>
                                    <th>Rented Date</th>
                                    <th>Member</th>
                                    <th>Due Date</th>
                                    <th>Status</th>
                                    <th>Returned Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {book && book.rent_details.map((m, i) =>
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{m.book}</td>
                                        <td>{m.created_date}</td>
                                        <td>{m.member}</td>
                                        <td>{m.due_date}</td>
                                        <td>{m.return_status ? <div className='bg-success text-light rounded p-1' style={{ width: "max-content" }}><i class="fa fa fa-light fa-check"></i> Returned</div> : <div className='bg-danger text-light rounded p-1' style={{ width: "max-content" }}><i class="fa fa-light fa-xmark"></i> Not Returned</div>}</td>
                                        <td>{m.return_date == null ? "Not Returned" : m.return_date}</td>
                                    </tr>)}

                                {book.rent_details!=0 ?null:
                                <tr>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>No Data Available</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>}
                            </tbody>
                        </Table>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default RentedUsers