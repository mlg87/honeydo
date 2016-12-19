import React, { Component, PropTypes } from 'react';

// Task component - represents a single todo item
export default class Task extends Component {
  render() {
    return (
      <li><span>{this.props.task.text}</span><span className="text-right right"><strong>ADDED: </strong>{moment(this.props.task.createdAt).format('hh:mm MM/DD/YYYY')}</span></li>
    );
  }
}

Task.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  task: PropTypes.object.isRequired,
};
