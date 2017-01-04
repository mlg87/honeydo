import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { createContainer } from 'meteor/react-meteor-data'
// collections
import { Lists } from '../api/lists'
// components
import { List } from './List'
import ListContainer from './List'

export class ListBoard extends Component {
  renderLists() {
    let lists = this.props.lists
    return lists.map((list) => (
      // <List key={ list._id } list={ list } />
      <ListContainer params={ list.users.map((user) => user.userId) } key={ list._id } list={ list } />
    ))
  }

  handleSubmit(e) {
    e.preventDefault()

    // Find the text field via the React ref
    const listName = ReactDOM.findDOMNode(this.refs.listInput).value.trim()
    // dont use arrow function here b/c we dont want it to bind
    // to react
    Meteor.call('lists.insert', listName, function(err, id) {
      if (err) {
        console.error('err', err);
        alert(err.reason.reason)
      }
    })

    // clear form
    ReactDOM.findDOMNode(this.refs.listInput).value = ''
  }

  render() {
    const formattedDay = moment().format('dddd')
    return (
      <div>

        { this.props.currentUser &&

          <header>

            <h1>Hi, { this.props.currentUser.username }! {formattedDay} is a great day to get tasks done.</h1>

            <form className="new-list" onSubmit={ this.handleSubmit.bind(this) } >

              <input
                type="text"
                ref="listInput"
                placeholder="Type to create new lists"
                />

            </form>

          </header>

        }

        <ul>

          { this.renderLists() }

        </ul>

      </div>
    )
  }
}

ListBoard.propTypes = {
  lists: PropTypes.array.isRequired
}

export default ListBoardContainer = createContainer(() => {
  Meteor.subscribe('lists', Meteor.userId())

  return {
    lists: Lists.find({'users.userId': {$in: [Meteor.userId()]}}).fetch(),
    currentUser: Meteor.user()
  }
}, ListBoard)
