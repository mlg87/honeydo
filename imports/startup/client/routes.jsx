// REVIEW: can most likely get rid of mounter
// import { mount } from 'react-mounter'
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
// app container
import { AppLayout } from '../../ui/layouts/AppLayout'
// components
import TaskBoard from '../../ui/TaskBoard'
import ListBoardContainer from '../../ui/ListBoard'
// not found
import { NotFound } from '../../ui/pages/not-found'

const routes = {
  path: '/',
  component: AppLayout,
  indexRoute: { component: TaskBoard },
  childRoutes: [
    {
      path: 'lists',
      component: ListBoardContainer
    },
    {
      path: 'logout',
      onEnter: ({params}, replace) => {
        Meteor.logout()
        replace('/')
      }
    },
    {
      path: '*',
      component: NotFound}
  ]
}

// react router way #1
Meteor.startup( () => {
  render(
    <Router history={ browserHistory } routes={ routes } />, document.getElementById( 'react-root' )
  )
})

// react router way #2
// Meteor.startup( () => {
//   render(
//     <Router history={ browserHistory }>
//       <Route path='/' component={ AppLayout }>
//         <IndexRoute component={ TaskBoard } />
//         <Route path='/profile' component={ ListBoard } />
//         {/* similar to express, this 404 route needs to be the last route (its a last resort) */}
//         <Route path='*' component={ NotFound } />
//       </Route>
//     </Router>,
//     document.getElementById( 'react-root' )
//   )
// })
