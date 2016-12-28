import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

export default class Modal extends Component {
  componentDidMount() {

  }

  // return an array of inputs for the modal
  renderInputs() {
    const handleInputChange = this.props.handleInputChange
    let errInput = this.props.err.key
    let errReason = this.props.err.reason

    return this.props.inputs.map((input, i) => (
      <div key={input.ref + 'Container'} className={'input-field col m' + input.mWidth + ' s' + input.sWidth}>
        <input
          className={`validate ${input.ref === errInput ? 'invalid' : ''}`}
          type={input.type}
          ref={input.ref}
          key={input.ref + 'Input'}
          id={input.ref}
          onChange={handleInputChange}
        />
        <label htmlFor={input.ref} key={input.ref + 'Label'} data-error={`${input.ref === errInput ? errReason : ''}`}>
          {input.placeholder}
        </label>
      </div>

    ))
  }

  render() {
    if (this.props.isOpen === false) {
      return null
    }

    // modal and modal backdrop are contained in a div so it doesnt
    // matter what parent they have
    return (
      <div>
        <div className={this.props.modalClassName + " modal open"}>
          <div className="modal-content">
            <h4>{this.props.modalHeader}</h4>
            <form>
              <div className="row">
                {this.renderInputs()}
              </div>
            </form>
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
