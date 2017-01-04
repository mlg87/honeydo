import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'

export class HomeBoard extends Component {
  render() {
    return (
      <div>

        { this.props.isLoading ?

          <p>fetching data...</p> :

          <header>

            <h1>Welcome { this.props.currentUser.username }!</h1>

            <h3>Today is { moment().format('dddd, MM/DD/YYYY')}. Get cracking on some tasks.</h3>

          </header>

        }


      </div>
    )
  }
}

HomeBoard.propTypes = {
  currentUser: PropTypes.object,
  isLoading: PropTypes.bool
}

export default HomeBoardContainer = createContainer(({ params }) => {
  const currentUser = Meteor.user()
  let isLoading = true
  if (currentUser) {
    isLoading = false
  }

  return { currentUser, isLoading }
}, HomeBoard)
