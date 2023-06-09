import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

// This component is used to display the header
function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    // This function is used to logout the user
    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    return (
        <div>
            <header className='header' >
                <div className='logo' >
                    <Link to='/'>GoalHERO!™</Link>
                </div>
                <ul>
                    {user ? (
                        <li>
                            <button className='btn' onClick={onLogout}>
                                <FaSignOutAlt />
                                Logout
                            </button>
                    
                        </li>
                    ) : (
                        <>
                            <li>
                                <Link to='/login'>
                                    <FaSignInAlt />
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link to='/register'>
                                    <FaUser />
                                    <span>Register</span>
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </header>
        </div>
    )
}

export default Header
