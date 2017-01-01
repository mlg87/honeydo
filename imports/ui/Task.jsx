import React, { Component, PropTypes } from 'react'

// Task component - represents a single todo item
export default class Task extends Component {
  toggleChecked() {
    Meteor.call('tasks.check', this.props.task._id)
  }

  deleteTask() {
    Meteor.call('tasks.remove', this.props.task._id)
  }

  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    const taskClassName = this.props.task.isChecked ? 'checked' : ''
    // id is used for materialze so the label works with
    // the input
    const checkboxId = this.props.task._id + 'check'

    return (
      <li className={taskClassName + ' fader'}>

        <button className="delete clickable" onClick={ this.deleteTask.bind(this) }>
          &times;
        </button>

        <input
          className="clickable checkbox-blue"
          id={ checkboxId }
          type="checkbox"
          readOnly
          checked={ this.props.task.isChecked }
        />

        <label
          htmlFor={ checkboxId }
          onClick={ this.toggleChecked.bind(this) }
        />

        <span className="text">{ this.props.task.text }</span><span className="task-added margin-left-10">{ moment(this.props.task.createdAt).format('k:mm MM/DD/YYYY') }</span>

      </li>
    )
  }
}

Task.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  task: PropTypes.object.isRequired
}
