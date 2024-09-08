import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AuthorGenreTable from '../components/AuthorGenreTable'

function AuthorGenreList() {
  return (
    <div>
        <div className="mb-3"><Header></Header></div>   
        <div className="mb-5">0</div>
        <div className="mb-3"><AuthorGenreTable></AuthorGenreTable></div>
        <div className="mb-3"><Footer></Footer></div>
    </div>
  )
}

export default AuthorGenreList