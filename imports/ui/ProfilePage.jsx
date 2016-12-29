import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { createContainer } from 'meteor/react-meteor-data'

export class ProfilePage extends Component {
  render() {
    const formattedDay = moment().format('dddd')
    return (
      <div>
        <header>
          <h1>Hi, { this.props.currentUser.username }! {formattedDay} is a great day to get tasks done.</h1>
        </header>
      </div>
    )
  }
}

export default createContainer(() => {
  return {
    currentUser: Meteor.user()
  }
}, ProfilePage)
