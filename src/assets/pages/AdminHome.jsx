import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import BookList from '../components/BookList'

function AdminHome() {
  return (
    <div>
        <div className="mb-3"><Header></Header></div>
        <div className="mb-5">0</div>
        <div className="mb-3"><BookList></BookList></div>
        <div className="mb-3"><Footer></Footer></div>
    </div>
  )
}

export default AdminHome