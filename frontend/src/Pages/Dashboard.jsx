import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GoalForm from '../Components/GoalForm'
import GoalItem from '../Components/GoalItem'

import Spinner from '../Components/Spinner'
import { getGoals, reset } from '../features/goals/goalSlice'


function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { goals, isLoading, isError, message } = useSelector((state) => state.goals)

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



  // useEffect(() => {
  //   if (!user) {
  //     navigate('/login')
  //   }

  //   if(isError) {
  //     console.log(message)
  //     };


  //   dispatch(getGoals()) 

  //   return () => {
  //     dispatch(reset())
  //   }

  // }, [user, navigate, isError, message, dispatch])

  if(isLoading) return <Spinner/>

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


export default Dashboard