import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BiErrorCircle } from 'react-icons/bi'
import { postEpifany } from "./epifanySlice"
import { validateEpifanyText, validateEpifanyDescription } from '../../validation/validate'

const AddEpifany = () => {
  const currentUser = useSelector(state => state.users.user)
  const dispatch = useDispatch()

  const [text, setText] = useState()
  const [description, setDescription] = useState()
  const [textError, setTextError] = useState('')
  const [descriptionError, setDescriptionError] = useState('')
  const author = currentUser.user._id
  const username = currentUser.user.username
  const token = currentUser.token

  const handleTextChange = (e) => {
    const textValue = e.target.value
    setText(textValue)
    setTextError(validateEpifanyText(textValue))
  }

  const handleDescriptionChange = (e) => {
    const descriptionValue = e.target.value
    setDescription(descriptionValue)
    setDescriptionError(validateEpifanyDescription(descriptionValue))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()


    const newEpifany = {
      text: text,
      description, description,
      author: author,
      token: token,
      username: username
    }

    if(textError || descriptionError) {
      return
    }

    if(text && description) {
      dispatch(postEpifany(newEpifany))
      e.target.reset() 
      setText('')
      setDescription('')
      setTextError('')
      setDescriptionError('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="add-epifany-form">
      <input autoComplete="off" onChange={(e) => handleTextChange(e)} name='text' type="text" className="add-epifany-text" placeholder="What have you come up with?"/>
      {textError && <div className='epifany-error-message'><BiErrorCircle size={18} />{textError}</div>}
      {text && <textarea onChange={(e) => handleDescriptionChange(e)} className="add-epifany-description" rows={3} placeholder="You're a genius. How'd you come up with that?"/>}
      {descriptionError && <div className='epifany-error-message'><BiErrorCircle size={18} />{descriptionError}</div>}
      {text && description && <button type='submit'>Epifanate</button>}
    </form>
  )
}

export default AddEpifany