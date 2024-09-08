import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Background from '../components/Background'

function Index() {
  return (
    <div>
        <div className="mb-3"><Header></Header></div>
        <div className="mb-5">0</div>
        <div className="mb-3"><Background></Background></div>
        <div className="mb-3"><Footer></Footer></div>
    </div>
  )
}

export default Index