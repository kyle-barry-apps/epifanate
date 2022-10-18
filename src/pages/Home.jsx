import { useState } from "react"
import { useSelector } from "react-redux"

import SearchEpifany from "../features/epifanies/SearchEpifany"
import Epifany from "../features/epifanies/Epifany"
import Loading from "../components/Loading"
import Error from "../components/Error"

const Home = () => {
  const currentUser = useSelector(state => state.users.user)
  const epifanies = useSelector(state => state.epifanies.epifaniesArray)
  const isLoading = useSelector(state => state.epifanies.isLoading) 
  const errMsg = useSelector(state => state.epifanies.errMsg) 
  const [searchQuery, setSearchQuery] = useState('')

  const epifaniesFiltered = epifanies.filter((epifany) => {
    if(epifany.text.toLowerCase().includes(searchQuery) || epifany.description.toLowerCase().includes(searchQuery)) {
      return epifany
    }
  })

  const displayEpifanies = epifaniesFiltered.slice(0).reverse().map((epifany) => {
    if(currentUser) {
      if(epifany.author._id !== currentUser.user._id)
      return (
        <Epifany key={epifany._id} epifany={epifany}/>
      )
    } else {
      return (
        <Epifany key={epifany._id} epifany={epifany}/>
      ) 
    }
  })


  if(isLoading) {
    return <Loading />
  }

  if(errMsg) {
    return <Error errMsg={errMsg} />
  }

  return (
    <section className="feed">
      <h1 style={{letterSpacing: '2px'}}>Epifany Feed</h1>
      <SearchEpifany setSearchQuery={setSearchQuery}/>
      <div className="epifany-feed-container">
        {isLoading && <Loading />}
        {errMsg && <Error />}
        {displayEpifanies}
      </div>
    </section>
  )
}

export default Home