import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AiFillHome } from 'react-icons/ai'
import { RiDashboardFill } from 'react-icons/ri'
import { IoIosInformationCircle } from 'react-icons/io'
import { IoMdLogOut, IoMdLogIn } from 'react-icons/io'
import { useSelector } from 'react-redux'
import { logoutUser } from '../features/users/userSlice'
import { useDispatch } from 'react-redux'

const Navigation = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.users.user)
  const location = useLocation()

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <nav className='nav'>
      <ul>
        <li>
          <NavLink to='/home' className='nav-link'>
            <button className={location.pathname === '/home' ? 'nav-button active' : 'nav-button'}>
              <AiFillHome size={16} className='nav-icon'/>
              <span className='nav-text'>Home</span>
            </button>
          </NavLink>
        </li>
        {currentUser && 
        <li>
        <NavLink to='/dashboard' className='nav-link'>
            <button className={location.pathname === '/dashboard' ? 'nav-button active' : 'nav-button'}>
              <RiDashboardFill size={16} className='nav-icon'/>
              <span className='nav-text'>Dashboard</span>
            </button>
          </NavLink> 
        </li>
        }
        <li>
        <NavLink to='/about' className='nav-link'>
            <button className={location.pathname === '/about' ? 'nav-button active' : 'nav-button'}>
              <IoIosInformationCircle size={16} className='nav-icon'/>
              <span className='nav-text'>About</span>
            </button>
          </NavLink>  
        </li>
        <li>
          { currentUser ?
          <NavLink to='/home' className='nav-link'>
            <button onClick={handleLogout} className={location.pathname === '/logout' ? 'nav-button active' : 'nav-button'}>
              <IoMdLogOut size={16} className='nav-icon'/>
              <span className='nav-text'>Logout</span>
            </button>
          </NavLink> :
          <NavLink to='/login' className='nav-link'>
            <button className={location.pathname === '/login' ? 'nav-button active' : 'nav-button'}>
              <IoMdLogIn size={16} className='nav-icon'/>
              <span className='nav-text'>Log In</span>
            </button>
          </NavLink> 
          }
        </li>
      </ul>
    </nav>
  )
}

export default Navigation