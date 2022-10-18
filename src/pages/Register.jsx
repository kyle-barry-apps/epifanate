import { registerUser } from "../features/users/userSlice"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate} from "react-router-dom"
import { useEffect } from "react"
import { reset } from "../features/users/userSlice"
import { validateRegistration } from "../validation/validate"
import Loading from "../components/Loading"
import Error from '../components/Error'

const Register = () => { 
  const {user, isLoading, isSuccess, isError, message} = useSelector((state) => state.users) 
  const dispatch = useDispatch()
  const navigate = useNavigate()  


  const handleSubmit = (e) => {
    e.preventDefault()
    const firstname = e.target.firstname.value
    const lastname = e.target.lastname.value
    const email = e.target.email.value
    const username = e.target.username.value
    const password = e.target.password.value

    dispatch(registerUser({firstname, lastname, email, username, password})) 
  }

  useEffect(() => {
    if(isSuccess || user) {
      setTimeout(() => {    
        dispatch(reset())
        navigate('/login')
      }, 1000)
    }
  }, [user, isError, message, isSuccess, navigate, dispatch])

  return (
    <section className="login-container">
      {message && !isSuccess && <div className="registration-fail">{message}</div>}
      {isSuccess && <div className="registration-success">Registration Successful, please log in</div>}
      <h1>Epifanate</h1>
      <p>Sign up to share your most insightful moments, and steal everyone else’s</p>
      <form className="login-form" onSubmit={handleSubmit}>
      <div className="form-control">
          <input type="text" name="firstname" className="firstname-input" placeholder="First Name"/>
        </div>
        <div className="form-control">
          <input type="text" name="lastname" className="lastname-input" placeholder="Last Name"/>
        </div>
        <div className="form-control">
          <input type="email" name="email" className="email-input" placeholder="Email"/>
        </div>
        <div className="form-control">
          <input type="text" name="username" className="username-input" placeholder="Username"/>
        </div>
        <div className="form-control">
          <input type="password" name="password" className="password-input" placeholder="Password"/>
        </div>
        <button type="submit">Register</button>
        <Link to='/login'>Already have an account? Log in</Link>
      </form>
    </section>
  )
}

export default Register