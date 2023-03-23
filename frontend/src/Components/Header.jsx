import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user,} = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }
  return (
    <div>
        <header className='header' >
            <div className='logo' >
                <Link to='/'>Goal Setter</Link>
            </div>
            <ul>
                {user ? (
                    <li>
                        <button className='btn' onClick={onLogout}>
                            <FaSignOutAlt />
                            <span>Logout</span>
                        </button>
                   
                    </li>
                ) : (
                    <>
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
                </>)}
            </ul>
        </header>
      
    </div>
  )
}

export default Header
