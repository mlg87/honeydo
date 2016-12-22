import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

export default class Modal extends Component {
  // return an array of inputs for the modal
  renderInputs() {
    console.log('what are the props', this.props);
    return this.props.inputs.map((input) => (
      <div key={input.ref + 'Container'} className={'input-field col m' + input.mWidth + ' s' + input.sWidth}>
        <input
          className="validate"
          type={input.type}
          ref={input.ref}
          key={input.ref + 'Input'}
          id={input.ref}
        />
        <label htmlFor={input.ref} key={input.ref + 'Label'}>
          {input.placeholder}
        </label>
      </div>

    ))
  }

  render() {
    if (this.props.isOpen === false) {
      return null
    }

    console.log('rendering a modal');
    // modal and modal backdrop are contained in a div so it doesnt
    // matter what parent they have
    return (
      <div>
        <div id="modal1" className={this.props.modalClassName + " modal open"}>
          <div className="modal-content">
            <h4>{this.props.modalHeader}</h4>
            <div className="row">
              {this.renderInputs()}
            </div>
          </div>
          <div className="modal-footer">
            <a className="modal-action modal-close waves-effect waves-red btn-flat" onClick={this.props.closeModal}>Cancel</a>
            <a className="modal-action modal-close waves-effect waves-green btn-flat" onClick={this.props.submitModal}>Submit</a>
          </div>
        </div>
        <div className="modal-backdrop" />
      </div>
    )
  }
}
