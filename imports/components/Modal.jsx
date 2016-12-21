import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

export default class Modal extends Component {
  render() {
    console.log('props for modal', this.props);
    if (this.props.isOpen === false) {
      return null
    }

    console.log('rendering a modal');
    return (
      <div>
        <div id="modal1" className={this.props.modalClassName + " modal open"}>
          <div className="modal-content">
            <h4>{this.props.modalHeader}</h4>
            <p>{this.props.modalBody}</p>
          </div>
          <div className="modal-footer">
            <a className="modal-action modal-close waves-effect waves-green btn-flat" onClick={this.closeModal}>Agree</a>
          </div>
        </div>
        <div className="modal-backdrop" />
      </div>
    )
  }
}
