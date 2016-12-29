// REVIEW: can most likely get rid of mounter
// import { mount } from 'react-mounter'
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
// app container
import { AppLayout } from '../../ui/layouts/AppLayout'
// components
import TaskBoard from '../../ui/TaskBoard'
import ProfilePage from '../../ui/ProfilePage'
// not found
import { NotFound } from '../../ui/pages/not-found'

// react router way
Meteor.startup( () => {
  render(
    <Router history={ browserHistory }>
      <Route path='/' component={ AppLayout }>
        <IndexRoute component={ TaskBoard } />
        <Route path='/profile' component={ ProfilePage } />
        {/* similar to express, this 404 route needs to be the last route (its a last resort) */}
        <Route path='*' component={ NotFound } />
      </Route>
    </Router>,
    document.getElementById( 'react-root' )
  );
});
