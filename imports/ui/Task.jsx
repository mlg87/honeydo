import React, { Component, PropTypes } from 'react'
// collection
import { Tasks } from '../api/tasks.js'

// Task component - represents a single todo item
export default class Task extends Component {
  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Tasks.update(this.props.task._id, {
      $set: { checked: !this.props.task.checked },
    })
  }

  deleteTask() {
    Tasks.remove(this.props.task._id)
  }

  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    const taskClassName = this.props.task.checked ? 'checked' : ''
    const checkboxId = this.props.task._id + 'check'

    return (
      <li className={taskClassName}>
        <button className="delete clickable" onClick={this.deleteTask.bind(this)}>
          &times;
        </button>

        <input
          className="clickable checkbox-blue"
          id={checkboxId}
          type="checkbox"
          readOnly
          checked={this.props.task.checked}
        />
        <label
          htmlFor={checkboxId}
          onClick={this.toggleChecked.bind(this)}
        />


        <span className="text">{this.props.task.text}</span><span className="task-added margin-left-10">{moment(this.props.task.createdAt).format('k:mm MM/DD/YYYY')}</span>
      </li>
    )
  }
}

Task.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  task: PropTypes.object.isRequired,
}
