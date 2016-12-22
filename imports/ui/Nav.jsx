import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import Modal from '../components/Modal.jsx'
import NavButton from '../components/buttons/NavButton.jsx'

export default class Nav extends Component {
  // always initially render with the modal 'hidden'
  constructor(props) {
    super(props)

    this.state = {
      isModalOpen: false
    }

    // bind the context so this onClick can pass to NavButton
    this.showModal = this.showModal.bind(this)
    // bind the context so this onClick can pass to the Modal
    this.closeModal = this.closeModal.bind(this)
  }

  showModal(e) {
    if (this.state.isModalOpen === true) {
      return false
    }
    this.setState({isModalOpen: true})
  }

  closeModal(e) {
    if (this.state.isModalOpen === false) {
      return false
    }
    // this slows down the closing of the modal so the user
    // can see dope button animations
    setTimeout(() => {
        this.setState({isModalOpen: false})
    }, 500);
  }

  renderNavButtons() {
    let navButtons = [
      {
        text: 'Create Account',
        target: 'createAccount'
      },
      {
        text: 'Sign In',
        target: 'signIn'
      }
    ]

    return navButtons.map((button) => (
      <NavButton text={button.text} targetModal={button.target} onClick={this.showModal} key={button.target}/>
    ))
  }

  getInputs() {
    return [
      {
        type: 'text',
        ref: 'username',
        placeholder: 'Username',
        mWidth: 6,
        sWidth: 12
      },
      {
        type: 'password',
        ref: 'password',
        placeholder: 'Password',
        mWidth: 6,
        sWidth: 12
      }
    ]
  }

  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <a href="#modal1" className="brand-logo modal-trigger">Weaver-Goetz Household Tasks</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              {this.renderNavButtons()}
            </ul>
          </div>
        </nav>
        <Modal inputs={this.getInputs()} isOpen={this.state.isModalOpen} modalHeader="Sign In" modalClassName="modal-sign-in" closeModal={this.closeModal}/>
      </div>
    )
  }
}
