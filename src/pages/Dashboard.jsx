import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { AiFillLock } from 'react-icons/ai'
import AddEpifany from "../features/epifanies/AddEpifany"
import Epifany from "../features/epifanies/Epifany"
import Loading from "../components/Loading"
import Error from "../components/Error"

const Dashboard = ({ epifanies }) => {
  const [selected, setSelected] = useState('epifanies')

  const isLoading = useSelector(state => state.epifanies.isLoading) 
  const errMsg = useSelector(state => state.epifanies.errMsg) 
  const currentUser = useSelector(state => state.users.user)

  if(!currentUser) {
    return(
      <div className="dashboard-error">
        <AiFillLock size={30}/>
        <p>Please log in to access your dashboard</p>
        <Link to='/login'>Login</Link>
      </div>
    )
  }
  
  const userFavorites = currentUser.user.favorites
  const userLikes = currentUser.user.likes  

  const userEpifanies = epifanies.filter(epifany => epifany.author._id === currentUser.user._id)
  const userEpifaniesMapped = userEpifanies.slice(0).reverse().map((epifany) => {
      return (
        <Epifany key={epifany._id} epifany={epifany}/>
      )
    }
  )

  let userFavesMapped = epifanies.map((epifany) => {
    if(userFavorites.includes(epifany._id)) {
      return (
        <Epifany key={epifany._id} epifany={epifany}/>
      )
    }
  })
  userFavesMapped = userFavesMapped.filter(fave => fave !== undefined)
  

  let userLikesMapped = epifanies.map((epifany) => {
    if(userLikes.includes(epifany._id)) {
      return (
        <Epifany key={epifany._id} epifany={epifany}/>
      )
    }
  })
  userLikesMapped = userLikesMapped.filter(like => like !== undefined)

  if(isLoading) {
    return <Loading />
  }

  if(errMsg) {
    return <Error errMsg={errMsg} />
  }



  return (
    <section className="dashboard-container">
      <h1 style={{letterSpacing: '2px'}}>Dashboard</h1>
      <AddEpifany />
      <div className="dashboard-btn-container">
        <a onClick={() => setSelected('epifanies')} className={selected === 'epifanies' ? 'active' : null}>My Epifanies</a>
        <a onClick={() => setSelected('favorites')} className={selected === 'favorites' ? 'active' : null}>My Favorites</a>
        <a onClick={() => setSelected('likes')} className={selected === 'likes' ? 'active' : null}>My Likes</a>
      </div>
      <div className="dashboard-feed-container">
        {selected === 'epifanies' ? userEpifaniesMapped : selected === 'favorites' ? userFavesMapped : userLikesMapped}
        {selected === 'epifanies' && userEpifaniesMapped.length === 0 && 
        <div className="empty-dashboard-container">Start epifanating!</div>
        }
        {selected === 'favorites' && userFavesMapped.length === 0 && 
        <div className="empty-dashboard-container">Favorite some epifanies!</div>
        }
        {selected === 'likes' && userLikesMapped.length === 0 && 
        <div className="empty-dashboard-container">You must like something...</div>
        }
      </div>
    </section>
  )
}

export default Dashboard