import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { createContainer } from 'meteor/react-meteor-data'
// collections
import { Tasks } from '../api/tasks.js'
// components
import Task from './Task.jsx'
import Modal from '../components/Modal.jsx'

// App component - represents the whole app
class App extends Component {
  // need to set the state first
  constructor(props) {
    super(props)

    this.state = {
      hideCompleted: false
    }
  }

  handleSubmit(event) {
    event.preventDefault()

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim()

    Tasks.insert({
      text,
      createdAt: new Date(),
      userId: Meteor.userId(),
      username: Meteor.user().username
    })

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = ''
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    })
  }

  // get the tasks on the dom
  renderTasks() {
    let filteredTasks = this.props.tasks
    // if hideCompleted is selected, only show incomplete tasks
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked)
    }
    return filteredTasks.map((task) => (
      <Task key={task._id} task={task} />
    ))
  }

  render() {
    const completedPrompt = this.state.hideCompleted ? 'Show' : 'Hide'

    return (
      <div className="container">
        <header>
          <h1>Tasks To Complete ({this.props.incompleteCount})</h1>

          <label className="hide-completed clickable">
            <input
              className="hidden"
              type="checkbox"
              readOnly
              checked={this.state.hideCompleted}
              onClick={this.toggleHideCompleted.bind(this)}
            />
            {completedPrompt} Completed
          </label>

          {/* events are handled in React by listening directly on the html comp */}
          {this.props.currentUser &&
            <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
              <input
                type="text"
                ref="textInput"
                placeholder="Type to add new tasks"
              />
            </form>
          }
        </header>

        <ul>
          {this.renderTasks()}
        </ul>

      </div>
    )
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
  currentUser: PropTypes.object
}

export default createContainer(() => {
  return {
    tasks: Tasks.find({userId: Meteor.userId()}, {sort: {createdAt: -1}}).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user()
  }
}, App)
