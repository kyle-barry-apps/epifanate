import React, { useEffect } from 'react';
import { fetchEpifanies } from './features/epifanies/epifanySlice';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Layout from './components/Layout';
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchEpifanies())
  }, [dispatch])

  const epifanies = useSelector(state => state.epifanies.epifaniesArray)
  
  return (
  <Router>
    <Layout>
      <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard epifanies={epifanies}/>}/> 
          <Route path='/about' element={<About />}/>
      </Routes>
    </Layout>
  </Router>
  );
}

export default App;
