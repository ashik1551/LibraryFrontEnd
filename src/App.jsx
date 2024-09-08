import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Index from './assets/pages/Index'
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminHome from './assets/pages/AdminHome';
import AuthorGenreList from './assets/pages/AuthorGenreList';
import AdminMember from './assets/pages/AdminMember';
import AdminRent from './assets/pages/AdminRent';

function App() {
  return (
    <div>
      <BrowserRouter>

        <Routes>

          <Route path='/' element={<Index></Index>}></Route>
          <Route path='/book' element={<AdminHome></AdminHome>}></Route>
          <Route path='/book/manage' element={<AuthorGenreList></AuthorGenreList>}></Route>
          <Route path='/member' element={<AdminMember></AdminMember>}></Route>
          <Route path='/rent' element={<AdminRent></AdminRent>}></Route>

        </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App