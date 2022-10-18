import { useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'


const SearchEpifany = ({ setSearchQuery }) => {

  return (
    <form className="search-form">
      <input onChange={(e) => setSearchQuery(e.target.value.toLowerCase())} className='search-input' type="text" placeholder='Search epifanies' />
      <AiOutlineSearch size={24}/>
      <button type='submit' className='search-epifany-submit'>Submit</button>
    </form>
  )
}

export default SearchEpifany