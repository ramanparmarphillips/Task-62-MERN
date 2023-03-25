// Description: Dashboard page for users and admins

//Dependencies
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

//State from Redux store
import { deleteGoal } from '../features/goals/goalSlice'
import { getGoals, reset } from '../features/goals/goalSlice'

//Components
import GoalForm from '../Components/GoalForm'
import GoalItem from '../Components/GoalItem'
import Spinner from '../Components/Spinner'
import {AiFillDelete} from 'react-icons/ai'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  //Check if user is admin from local storage
  const isAdmin = JSON.parse(localStorage.getItem('user'));
  
  //State from Redux store
  const { user } = useSelector((state) => state.auth)
  const { goals, isLoading, isError, message } = useSelector((state) => state.goals)

  //State for users and userGoals
  const [users, setUsers] = useState([])
  const [userGoals, setUserGoals] = useState([])

  //Get all users(Admin only)
  useEffect(() => {
    axios.get('/api/goals/all')
    .then(res => {
      setUserGoals(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [userGoals, setUserGoals])

  //Redirect to login if not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login')
    } else {
      dispatch(getGoals())
    }
    
    if(isError) {
      console.log(message)
    };
    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  //Get all users(Admin only)
  useEffect(() => {
    axios.get('/api/users/all')
    .then(res => {
      setUsers(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [users, setUsers])

  //Make/Revoke user admin(Admin only)
  const makeAdmin = (id) => {
    axios.put(`/api/users/update/${id}`)
    .then(res => {
      console.log(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  //Loading spinner
  if(isLoading) return <Spinner/>

  //===================================================
  //================= ADMIN DASHBOARD =================
  //===================================================
  if(isAdmin && (isAdmin.role === 'admin')) {
    return (
      <div className='adminDash'>
        <section className="heading">
          <h1>Welcome, {user && user.name}</h1>
          <p>You are an Admin!</p>
        </section>
    
        <section className="content">
          <h3 className='title'>GoalHERO!™ Users:</h3>
          <div className='userContainer'>
            {users.map(user => (
              <div className='user' key={user._id}>
              <h4><span className='label'>Name:</span> {user.name}{isAdmin.name === user.name ? <p className='you'>You</p> : <p></p>}</h4>
              <p><span className='label'>Email:</span> {user.email}</p>
              <p><span className='label'>Date started:</span> {new Date(user.createdAt).toLocaleDateString('en-GB')}</p>
              <h3><span className='label'>Role:</span> {user.role}</h3>
              {user.role !== 'admin' && isAdmin.name !== user.name ? <button className='btn btn-block' onClick={() => makeAdmin(user._id)}>Make Admin</button> : null}
              {user.role === 'admin' && isAdmin.name !== user.name ? <button className='btn btn-block' onClick={() => makeAdmin(user._id)} >Revoke Admin</button> : null}
            </div>
            ))}
          </div>
        </section>

        <h3 className='title'>GoalHERO!™ Users Goals:</h3>

        <div className='content'>
          <div className='userContainer'>
            {userGoals.map((goal) => {
              const matchingUser = users.find((user) => user._id === goal.user);
              if (matchingUser) {
                return (
                    <div className='user' key={goal._id}>
                      {/* <p>Name: {matchingUser.name}</p> */}
                      {matchingUser.name === isAdmin.name ? <p className='you'>You</p> : <h4>{matchingUser.name}:</h4>}
                      <p><span className='label'>Goal:</span> {goal.text}</p>
                      <p><span className='label'>Created on:</span> {new Date(goal.createdAt).toLocaleDateString('en-GB')}</p>
                      <button onClick={() => dispatch(deleteGoal(goal._id))} className="close">
                        <AiFillDelete />
                      </button>
                    </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>

        <h3 className='title'>Add your own goals:</h3>

        <GoalForm/>
        <section className="content">
          {goals.length > 0 ? (
            <div>
              {goals.map((goal) => (
                <GoalItem key={goal._id} goal={goal}/>
                ))}
            </div>
          ) : (<h3>You have not set any goals!</h3>)}
        </section>
      </div>
        )
    //==================================================
    //================= USER DASHBOARD =================
    //==================================================
  } else {
    return (
      <>
        <section className="heading">
          <h1>Welcome, {user && user.name}</h1>
          <p>Goals Dashboard</p>
        </section>
        <GoalForm/>
        <section className="content">
          {goals.length > 0 ? (
            <div>
              {goals.map((goal) => (
                <GoalItem key={goal._id} goal={goal}/>
                ))}
            </div>
          ) : (<h3>You have not set any goals!</h3>)}
        </section>
      </>
    )
  }
}

export default Dashboard