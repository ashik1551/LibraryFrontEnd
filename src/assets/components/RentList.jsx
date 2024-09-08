import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { getRentListApi, updateRentApi } from '../services/api'

function RentList() {

  const [rent, setRent] = useState()

  const [status, setStatus] = useState("")

  async function getRentData() {

    let data = "?"

    if (status != "") {
      data += `return_status=${status}`
    }

    let res = await getRentListApi(data)
    if (res.status > 199 && res.status < 300) {
      setRent(res.data);
    }
  }

  async function handleUpdate(id) {
    let c = confirm("Are you sure..?\nClick ok when Book returned...!")
    if (c) {
      let res=await updateRentApi(id)
      if (res.status > 199 && res.status < 300) {
        getRentData()
      }
    }
  }

  useEffect(() => {
    getRentData()
  }, [])

  return (
    <div className='container'>
      <div className="border border-3 rounded shadow p-3">
        <div className="border rounded p-3 mb-4">
          <div className="row">
            <div className="col-3"></div>
            <div className="col-3">
              <select name="" id="" className="form-control" onChange={(e) => { setStatus(e.target.value) }}>
                <option value="" selected>All</option>
                <option value="1">Returned</option>
                <option value="0">Not Returned</option>
              </select>
            </div>
            <div className="col-1"></div>
            <div className="col-2">
              <button className="btn btn-outline-info" onClick={() => { getRentData() }}>Filter</button>
            </div>
            <div className="col-3"></div>
          </div>
        </div>
        <div className="fs-2 text-center fw-medium">Rented Books</div>
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
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {rent && rent.map((r, i) =>
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{r.book}</td>
                <td>{r.created_date}</td>
                <td>{r.member}</td>
                <td>{r.due_date}</td>
                <td>{r.return_status ? <div className='bg-success text-light rounded p-1' style={{ width: "max-content" }}><i class="fa fa fa-light fa-check"></i> Returned</div> : <div className='bg-danger text-light rounded p-1' style={{ width: "max-content" }}><i class="fa fa-light fa-xmark"></i> Not Returned</div>}</td>
                <td>{r.return_date == null ? "Not Returned" : r.return_date}</td>
                <td>
                  {r.return_status ? <button className="btn btn-warning text-light" disabled><i class="fa fa-light fa-pencil"></i> Update</button> :
                    <button className="btn btn-warning text-light" onClick={() => { handleUpdate(r.id) }}><i class="fa fa-light fa-pencil"></i> Update</button>}
                </td>
              </tr>)}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default RentList