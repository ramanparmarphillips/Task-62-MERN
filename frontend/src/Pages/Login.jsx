// Description: Login page

//Dependencies
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaSignInAlt } from 'react-icons/fa'

//State from Redux store
import {login, reset} from '../features/auth/authSlice';

//Components
import Spinner from '../Components/Spinner'

//Error notifications
import { toast } from 'react-toastify'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  //State for form data
  const [formData, setFormData] = useState({
    email:     '',
    password:  ''
  })
  const { email, password } = formData
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  //Submit form
  const onSubmit = (e) => {
    e.preventDefault()
    const userData = {
        email,
        password
    }
    dispatch(login(userData))
  }

  //Handle form changes
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }) )
  }

  //Redirect to dashboard if logged in
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  //Show spinner if loading
  if (isLoading) {
      return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>
            Login
            <span className='loginIcon'>
            <FaSignInAlt />
            </span>
        </h1>
        <p>Login here and start setting goals today!</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
            />
          </div>

          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
            />
          </div>

          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
          
        </form>
      </section>
    </>
  )
}

export default Login
