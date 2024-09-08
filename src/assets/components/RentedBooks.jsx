import React, { useEffect } from 'react'
import { useState } from 'react';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { retreiveMemberApi } from '../services/api';

function RentedBooks({ memberId }) {

  const [book,setBook]=useState({rented_books:[]})

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function getBookdata(id){
    let res=await retreiveMemberApi(id)
    if(res.status>199 && res.status<300){
      setBook(res.data);
      console.log(res.data);
      
    }
  }

  useEffect(()=>{
    getBookdata(memberId)
  },[])

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
          <Modal.Title>Rented Books</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center fs-3 fw-medium mb-4">Rented Books Details</div>
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Book</th>
                <th>Name</th>
                <th>Rented Date</th>
                <th>Due Date</th>
                <th>Return Date</th>
              </tr>
            </thead>
            <tbody>
              {book && book.rented_books.map((b,i)=>
              <tr>
              <td>{i+1}</td>
              <td>{b.book}</td>
              <td>{b.member}</td>
              <td>{b.created_date}</td>
              <td>{b.due_date}</td>
              <td>{b.return_date==null?"Not Returned":b.return_date}</td>
            </tr>)}
            {book.rented_books.length==0?<tr>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>No Data Available</td>
              <td>-</td>
              <td>-</td>
            </tr>:null}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default RentedBooks