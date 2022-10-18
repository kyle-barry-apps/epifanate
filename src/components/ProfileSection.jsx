import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateBio } from "../features/users/userSlice"
import { AiOutlineEdit, AiOutlineCheckCircle } from 'react-icons/ai'
import { MdOutlineCancel } from 'react-icons/md'

const ProfileSection = () => {
  const currentUser = useSelector(state => state.users.user)
  const totalEpifanies = useSelector(state => state.epifanies.epifaniesArray)

  const [newBio, setNewBio] = useState('')
  const [editMode, setEditMode] = useState(false)

  const dispatch = useDispatch()
  
  if(currentUser === null) {
    return (
      null
    )
  }

  const userEpifanies = totalEpifanies.filter(epifany => epifany.author._id === currentUser.user._id)

  const parsedDate = currentUser.user.createdAt.split('T')[0].split('-')
  const newDate = new Date(parsedDate[0], parsedDate[1] - 1, parsedDate[2]).toDateString() 

  const userInitials = (currentUser.user.firstname[0] + currentUser.user.lastname[0]).toUpperCase()

  let title = ''

  const NumberOfEpifanies = userEpifanies.length
  switch (true) {
    case (NumberOfEpifanies <= 9):
      title = "Baby Mind"
      break
    case (NumberOfEpifanies <= 19):
      title = "Freethinker"
      break
    case (NumberOfEpifanies <= 29):
      title = "Armchair Philosopher"
      break
    case (NumberOfEpifanies <= 39):
      title = "Scholar"
      break
    case (NumberOfEpifanies > 39):
      title = "Freakin' Genius"
      break
    default: 
      title = "Baby Mind"
  }

  const handleUpdateBio = () => {
    dispatch(updateBio([currentUser.user, newBio, currentUser.token]))  
    setEditMode(!editMode)
    setNewBio('')
  }

  return (
    <section className="profile-section">
      <div className="user-details">
        <div className="user-default-avatar">
          <p>{userInitials}</p>
        </div>
        <span className="username">@{currentUser.user.username}</span>
        <h4 className="user-title">{title}</h4>
      </div>
      <div className="bio-container">
        
        {!editMode ? <>
          <AiOutlineEdit size={16} onClick={() => setEditMode(!editMode)} className="edit-icon"/>
          <p className="user-bio">{currentUser.user.bio}</p>
        </> :
        <>  
          <textarea className="bio-textarea" onChange={(e) => setNewBio(e.target.value)} placeholder={currentUser.user.bio} style={{resize: 'none'}} type="text" />
          <div style={{alignSelf: 'flex-end'}}>
            <MdOutlineCancel size={16} style={{cursor: 'pointer'}} onClick={() => setEditMode(!editMode)}/>
            <AiOutlineCheckCircle size={16} style={{cursor: 'pointer'}} onClick={handleUpdateBio}/>
          </div>
        </> 
        }
      </div>
        

      <div className="user-statistics">
        <h4>Quick Stats</h4>
        <span>Total epifanies: {userEpifanies.length}</span>
        <span>Total favorites: {currentUser.user.favorites.length}</span>
        <span>Total likes: {currentUser.user.likes.length}</span>
      </div>
      <span className="user-joined">Joined: {newDate}</span>
    </section>
    
  )
}

export default ProfileSection