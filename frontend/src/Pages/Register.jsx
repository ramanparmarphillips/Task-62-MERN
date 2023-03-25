// Description: Register page

//Dependencies
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'

//State from Redux store
import {register, reset} from '../features/auth/authSlice';

//Components
import Spinner from '../Components/Spinner'

//Error notifications
import { toast } from 'react-toastify'


function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  //State for form data
  const [formData, setFormData] = useState({
      name:      '',
      email:     '',
      password:  '',
      password2: ''
  })
  const { name, email, password, password2 } = formData
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  //Submit form
  const onSubmit = (e) => {
    e.preventDefault()
    if (password !== password2) {
        toast.error('Passwords do not match')
    } else {
      const userData = {
        name,
        email,
        password
      }
      dispatch(register(userData))
    }
  }

  //Navigate to dashboard if logged in
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    if (isSuccess || user) {
      navigate('/')
    }
    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  //Handle form changes
  const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }) )
  }

  //Show spinner if loading
  if (isLoading) {
      return <Spinner />
  }


  return (
    <>
        <section className='heading'>
            <h1>
                <FaUser />
                Register
            </h1>
            <p>Create your free GoalHERO!™ account today!</p>
        </section>

        <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              placeholder='Enter your name'
              onChange={onChange}
            />
          </div>
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
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              placeholder='Confirm password'
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

export default Register