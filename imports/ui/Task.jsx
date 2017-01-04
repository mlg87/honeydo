import React, { Component, PropTypes } from 'react'
import { colors } from '../styles/colors'

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
    const completedStyle = {
      marginLeft: '10px',
      fontSize: '1rem',
      color: colors.completed
    }

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

        <div className="text">{ this.props.task.text }</div>

        <div className='task-author margin-left-10'>added by: { this.props.task.username } @ { moment(this.props.task.createdAt).format('k:mm MM/DD/YYYY') }</div>

        { this.props.task.isChecked &&

          <div style={ completedStyle }>completed by: { this.props.task.completedBy } @ { moment(this.props.task.completedAt).format('k:mm MM/DD/YYYY')}</div>

        }

      </li>
    )
  }
}

Task.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  task: PropTypes.object.isRequired
}
