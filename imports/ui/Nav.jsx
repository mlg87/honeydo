import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import Modal from '../components/Modal.jsx'
import NavButton from '../components/buttons/NavButton.jsx'

export default class Nav extends Component {
  // always initially render with the modal 'hidden'
  constructor(props) {
    super(props)

    this.state = {
      modal: {
        isModalOpen: false,
        modalHeader: null,
        targetModal: null
      },
      user: {}
    }

    // bind the context so this onClick can pass to the Modal
    this.submitModal = this.submitModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    // HACK: couldnt figure out a better way to get the modal data
    // to be what i wanted based on the click events
    this.renderModalSignIn = this.renderModalSignIn.bind(this)
    this.renderModalCreateAccount = this.renderModalCreateAccount.bind(this)
  }

  closeModal(e) {
    if (this.state.modal.isModalOpen === false) {
      return false
    }
    // this slows down the closing of the modal so the user
    // can see dope button animations
    setTimeout(() => {
        this.setState({modal: {isModalOpen: false}})
    }, 500);
  }

  submitModal(e) {
    e.preventDefault()

    if (this.state.modal.targetModal === 'createAccount') {
      let id = Accounts.createUser(this.state.user)
      console.log('whats the id', id);
    }
    // attempt to signin existing user
    else {

    }
  }

  renderModalSignIn() {
    if (this.state.modal.isModalOpen === true) {
      return false
    }
    this.setState({
      modal: {
        isModalOpen: true,
        modalHeader: 'Sign In',
        targetModal: 'signIn'
      }
    })
  }

  renderModalCreateAccount() {
    if (this.state.modal.isModalOpen === true) {
      return false
    }
    this.setState({
      modal: {
        isModalOpen: true,
        modalHeader: 'Create Account',
        targetModal: 'createAccount'
      }
    })
  }

  renderNavButtons() {
    let navButtons = [
      {
        text: 'Create Account',
        target: 'createAccount',
        click: this.renderModalCreateAccount
      },
      {
        text: 'Sign In',
        target: 'signIn',
        click: this.renderModalSignIn
      }
    ]

    return navButtons.map((button) => (
      <NavButton text={button.text} targetModal={button.target} onClick={button.click} key={button.target}/>
    ))
  }

  getInputs() {
    let inputs = [
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
    if (this.state.modal.targetModal === 'createAccount') {
      inputs.push({
        type: 'email',
        ref: 'email',
        placeholder: 'Email',
        mWidth: 12,
        sWidth: 12
      })
    }
    return inputs
  }

  handleInputChange(e) {
    const key = e.target.id
    // HACK: clone the state so that the value can be assigned
    // to a dynamic key
    let userStateObj = _.cloneDeep(this.state.user)
    userStateObj[key] = e.target.value

    return this.setState({user: userStateObj})
  }

  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <a className="brand-logo modal-trigger">Weaver-Goetz Household Tasks</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              {this.renderNavButtons()}
            </ul>
          </div>
        </nav>
        <Modal
          inputs={this.getInputs()}
          isOpen={this.state.modal.isModalOpen}
          modalHeader={this.state.modal.modalHeader}
          modalClassName="modal-sign-in"
          closeModal={this.closeModal}
          submitModal={this.submitModal}
          handleInputChange={this.handleInputChange}
        />
      </div>
    )
  }
}
