import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div>
        <header className='header' >
            <div className='logo' >
                <Link to='/'>Goal Setter</Link>
            </div>
            <ul>
                <li>
                    <Link to='/login'>
                        <FaSignInAlt />
                        <span>Login</span>
                    </Link>
                </li>
                <li>
                    <Link to='/register'>
                        <FaUser />
                        <span>Register</span>
                    </Link>
                </li>
            </ul>
        </header>
      
    </div>
  )
}

export default Header
