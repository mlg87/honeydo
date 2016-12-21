import React from 'react'
import { Meteor } from 'meteor/meteor'
import { render } from 'react-dom'

import App from '../imports/ui/App.jsx'
import Nav from '../imports/ui/Nav.jsx'

Meteor.startup(() => {
  render(<Nav />, document.getElementById('render-target-nav'))
  render(<App />, document.getElementById('render-target-app'))
});
