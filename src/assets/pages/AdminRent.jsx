import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import RentList from '../components/RentList'

function AdminRent() {
  return (
    <div>
        <div>
        <div className="mb-3"><Header></Header></div>
        <div className="mb-5">0</div>
        <div className="mb-3"><RentList></RentList></div>
        <div className="mb-3"><Footer></Footer></div>
    </div>
    </div>
  )
}

export default AdminRent