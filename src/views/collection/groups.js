import React, {  } from 'react'
import Collections from './collections'
import { useLocation } from 'react-router-dom';
const Groups = (state) => {
  const location = useLocation();

  return (
    <>
    <Collections type='Group' parent={location.state.parent}></Collections>
    </>
  )
}

export default Groups
