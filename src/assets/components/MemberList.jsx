import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { getMemberApi } from '../services/api'
import AddMember from './AddMember'
import RentedBooks from './RentedBooks'

function MemberList() {

    const [member, setMember] = useState()

    const [refresh,setRefresh]=useState()

    async function getMemberData() {
        let res = await getMemberApi()
        if (res.status > 199 && res.status < 300) {
            setMember(res.data);
        }
    }
    

    useEffect(() => {
        getMemberData()
    }, [refresh])

    return (
        <div className='container'>
            <div className="border border-3 rounded shadow p-3">
                <div className="fs-2 text-center fw-medium">Registered Members</div>
                <div className='mb-3'><AddMember setRefresh={setRefresh}></AddMember></div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>ID</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Joined On</th>
                            <th>Rented Books</th>
                        </tr>
                    </thead>
                    <tbody>
                        {member && member.map((m, i) =>
                            <tr key={i}>
                                <td>{i+1}</td>
                                <td>{m.name}</td>
                                <td>{m.id}</td>
                                <td>+91 {m.phone}</td>
                                <td>{m.address}</td>
                                <td>{m.created_date}</td>
                                <td><RentedBooks memberId={m.id}></RentedBooks></td>
                            </tr>)}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default MemberList