import React from 'react'


// wait
const Wait = React.lazy(() => import('./views/Wait'))
// images
const Collections = React.lazy(() => import('./views/collection/collections'))
const Groups = React.lazy(() => import('./views/collection/groups'))
const Accounts = React.lazy(() => import('./views/account/accounts'))
const FavAccounts = React.lazy(() => import('./views/account/favAccounts'))
const PasswordOptions = React.lazy(() => import('./views/passwordOptions/passwordOptions'))
const tools = React.lazy(()=>import('./views/tool/tools'))



const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/collections', name: 'Collections', element: Collections },
  { path: '/groups', name: 'Groups', element: Groups },
  { path: '/accounts', name: 'Accounts', element: Accounts },
  { path: '/favorite', name: 'Favorite', element: FavAccounts },
  { path: '/password-options', name: 'Password Options', element: PasswordOptions },
  { path: '/tools', name: 'tools', element: tools },


  { path: '/wait', name: 'Wait', element: Wait },


]

export default routes
