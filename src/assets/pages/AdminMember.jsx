import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MemberList from '../components/MemberList'

function AdminMember() {
  return (
    <div>
        <div className="mb-3"><Header></Header></div>
        <div className="mb-5">0</div>
        <div className="mb-3"><MemberList></MemberList></div>
        <div className="mb-3"><Footer></Footer></div>
    </div>
  )
}

export default AdminMember