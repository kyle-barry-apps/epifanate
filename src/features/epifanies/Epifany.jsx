import { useState } from 'react'
import { AiOutlineHeart, AiFillHeart, AiOutlineStar, AiFillStar } from 'react-icons/ai'
import { BsTrash } from 'react-icons/bs'
import { MdExpandMore, MdExpandLess } from 'react-icons/md'
import { postLike, postFavorite, deleteEpifany } from './epifanySlice'
import { useDispatch, useSelector } from 'react-redux'
import { updateFavorites, updateLikes } from '../users/userSlice'

const Epifany = ({ epifany }) => {
  const dispatch = useDispatch()
  const [expanded, setExpanded] = useState(false)

  const currentUser = useSelector(state => state.users.user)
  const token = currentUser ? currentUser.token : null

  const parsedDate = epifany.createdAt.split('T')[0].split('-')
  const newDate = new Date(parsedDate[0], parsedDate[1] - 1, parsedDate[2]).toDateString()

  const userInitials = (epifany.author.firstname.charAt(0) + epifany.author.lastname.charAt(0)).toUpperCase() 

  const handleDelete = () => {
    dispatch(deleteEpifany([epifany, token]))
  }

  const handleUnlike = () => {
    dispatch(postLike([epifany, 'unlike']))
    dispatch(updateLikes([currentUser.user, epifany._id]))
  }

  const handleLike = () => {
    dispatch(postLike([epifany, 'like']))
    dispatch(updateLikes([currentUser.user, epifany._id]))
  }

  const handleUnfavorite = () => {
    dispatch(postFavorite([epifany, 'unfavorite']))
    dispatch(updateFavorites([currentUser.user, epifany._id]))    
  }

  const handleFavorite = () => {
    dispatch(postFavorite([epifany, 'favorite']))
    dispatch(updateFavorites([currentUser.user, epifany._id])) 
  }

  return (
    <div className='epifany-container'>
      <div className='epifany-user-details'>
        <div className='epifany-photo-username'>
          <div className='profile-thumbnail-default'>
            <p>{userInitials}</p>
          </div>
          <span>@{epifany.author.username}</span>
        </div>
        <span>{newDate}</span>
      </div>
      <div className='epifany-icons-container'>
        <div style={{display: 'flex', alignItems: 'center', gap: '.2rem'}}>
         {currentUser && currentUser.user.likes.includes(epifany._id) ? <AiFillHeart className={!currentUser ? 'unclickable-icon' : null} style={{cursor: 'pointer'}} onClick={handleUnlike} size={18}/> : <AiOutlineHeart className={!currentUser ? 'unclickable-icon' : null} style={{cursor: 'pointer'}} onClick={handleLike} size={18}/>}
          <span>{epifany.likes}</span>
        </div> 
        <div style={{display: 'flex', alignItems: 'center', gap: '.2rem'}}>
          {currentUser && currentUser.user.favorites.includes(epifany._id) ? <AiFillStar className={!currentUser ? 'unclickable-icon' : null} style={{cursor: 'pointer'}} size={18} onClick={handleUnfavorite} /> : <AiOutlineStar className={!currentUser ? 'unclickable-icon' : null} style={{cursor: 'pointer'}} size={18} onClick={handleFavorite} />}
          <span>{epifany.favorites}</span>
        </div>
        {currentUser && epifany.author._id === currentUser.user._id ? <BsTrash onClick={handleDelete} size={18} style={{cursor: 'pointer'}} /> : null}
        <div className='epifany-expand'>
          {expanded ? <MdExpandLess size={18} onClick={() => setExpanded(!expanded)}/> : <MdExpandMore size={18} onClick={() => setExpanded(!expanded)}/>}
        </div> 
      </div>
      <div>
        <p className='epifany-text'>{epifany.text}</p>
      </div>
      {expanded && epifany.description && <div className='epifany-description'>{epifany.description}</div>}
    </div>
  )
}

export default Epifany