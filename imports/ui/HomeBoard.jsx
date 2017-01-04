import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { colors } from '../styles/colors'
// routes
import { Link } from 'react-router'

// need a var for the interval so we can unmount it 
let timer;
export class HomeBoard extends Component {

  constructor(props) {
    super(props)

    this.state = {
      time: null
    }
  }

  componentWillMount() {
    this.setTime()
  }

  componentDidMount() {
    timer = window.setInterval(function () {
     this.setTime();
    }.bind(this), 1000);
  }

  componentWillUnmount() {
    window.clearInterval(timer)
  }

  setTime() {
    const time = moment().format('k:mm:ss')
    return this.setState({
      time: time
    })
  }

  getTaskLink() {
    return <Link to='/tasks'>tasks</Link>
  }

  render() {
    const h3Style = {
      fontSize: '2rem'
    }

    const clockStyle = {
      fontSize: '1.5rem',
      float: 'right',
      color: colors.primaryBlue
    }

    const greetingStyle = {
      fontSize: '1.5rem'
    }

    return (
      <div>

        { this.props.isLoading ?

          <p>fetching data...</p> :

          <header>

            <span style={ greetingStyle }>Welcome { this.props.currentUser.username }!</span>
            <span style={ clockStyle }>{this.state.time}</span>

            <h3 style={ h3Style }>Today is { moment().format('dddd, MM/DD/YYYY')}. Get cracking on some { this.getTaskLink() }.</h3>

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
