import { loginUser, reset} from "../features/users/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate} from "react-router-dom"
import { useEffect } from "react"
import Loading from "../components/Loading"
import Error from '../components/Error'

const Login = () => {   
  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.users) 
  const navigate = useNavigate()
  const dispatch = useDispatch()


  useEffect(() => {
    if(user) {
      navigate('/dashboard')
    }

    dispatch(reset())
  }, [user, isError, message, navigate, dispatch])


  const handleSubmit = (e) => {
    e.preventDefault()
    const username = e.target.username.value
    const password = e.target.password.value

    dispatch(loginUser({username, password}))   
    dispatch(reset())
    e.target.reset()
  }
 

  return (
    <section className="login-container">
      {isError && <div className="login-error">{message}</div>}
      <h1>Epifanate</h1>
      <p>Log in in to share your most insightful moments, and steal everyone else’s</p>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <input type="text" name="username" className="username-input" placeholder="Username"/>
        </div>
        <div className="form-control">
          <input type="password" name="password" className="password-input" placeholder="Password"/>
        </div>
        <button type="submit">Log In</button>
        <Link to='/register'>Create new account</Link>
      </form>
    </section>
  )
}

export default Login