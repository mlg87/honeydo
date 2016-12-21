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

    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal(e) {
    this.setState({isModalOpen: !this.state.isModalOpen})
  }

  // showModal(event) {
  //   event.preventDefault()
  //   console.log('state at the start of show modal', this.state);
  //   // console.log('args', arguments);
  //   // console.log('do we have props?', this.props);
  //   // console.log('what is ref', this.refs);
  //
  //   // change the state
  //   this.openModal()
  //
  //   this.setState({isModalOpen: true})
  //   console.log('state after it should be set', this.state);
  //
  //   return (
  //     <Modal modalHeader="Johnson" modalBody="dammit"/>
  //   )
  // }

  openModal() {
    Session.set('isModalOpen', true)
  }

  closeModal() {
    Session.set('isModalOpen', false)
  }

  renderNavButtons() {
    let navButtons = [
      {
        text: 'Modal',
        target: 'modal1'
      },
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
      <NavButton text={button.text} targetModal={button.target} onClick={this.toggleModal} key={button.target}/>
    ))
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
        <Modal isOpen={this.state.isModalOpen} modalHeader="Sign In" modalBody="Do it" modalClassName="modal-sign-in"/>
      </div>
    )
  }
}
