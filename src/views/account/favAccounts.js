import React, {  } from 'react'
import Accounts from './accounts'
import { useLocation } from 'react-router-dom';
const FavAccounts = (state) => {
  const location = useLocation();

  return (
    <>
    <Accounts type='fav'></Accounts>
    </>
  )
}

export default FavAccounts
