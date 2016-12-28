import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { createContainer } from 'meteor/react-meteor-data'
import Modal from '../components/Modal.jsx'
import NavButton from '../components/nav/NavButton.jsx'

class Nav extends Component {
  // always initially render with the modal 'hidden'
  constructor(props) {
    super(props)

    this.state = {
      modal: {
        isModalOpen: false,
        modalHeader: null,
        targetModal: null
      },
      user: {},
      // err is either null or the key that has an err so the class
      // invalid can be added in the Modal
      err: {}
    }

    // bind the context so this onClick can pass to the Modal
    this.submitModal = this.submitModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    // HACK: couldnt figure out a better way to get the modal data
    // to be what i wanted based on the click events
    this.renderModalSignIn = this.renderModalSignIn.bind(this)
    this.renderModalCreateAccount = this.renderModalCreateAccount.bind(this)
    this.logout = this.logout.bind(this)
  }

  // componentDidMount() {
  //
  // }
  //
  // componentWillUnmount() {
  //
  // }

  closeModal(e) {
    if (this.state.modal.isModalOpen === false) {
      return false
    }
    // this slows down the closing of the modal so the user
    // can see dope button animations
    setTimeout(() => {
        this.setState({modal: {isModalOpen: false}, err: {}})
    }, 500);
  }

  submitModal(e) {
    e.preventDefault()

    if (this.state.modal.targetModal === 'createAccount') {
      // bind the context on the cb so we can access Nav state
      Accounts.createUser(this.state.user, err => {
        if (err) {
          const errReason = err.reason
          // new switch example
          const errKey = (() => {
            switch (err.reason) {
              case 'Username already exists.':
                return 'username';
              case 'Email already exists.':
                return 'email';
            }
          })();
          this.setState({
            err: {
              key: errKey,
              reason: errReason
            }
          })
          // break out and keep modal open
          return false
        }
        return this.closeModal()
      })
    }
    // attempt to signin existing user
    else {
      // loginWithPassword takes a string for username and string
      // for user pw
      Meteor.loginWithPassword(this.state.user.username, this.state.user.password, err => {
        if (err) {
          const errReason = err.reason
          // new switch example
          const errKey = (() => {
            switch (err.reason) {
              case 'User not found':
                return 'username';
              case 'Incorrect password':
                return 'password';
            }
          })();
          this.setState({
            err: {
              key: errKey,
              reason: errReason
            }
          })
          // break out and keep modal open
          return false
        }
        return this.closeModal()
      })
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

  logout() {
    Meteor.logout(err => {
      if (err) {
        return Alert(err.reason)
      }
      this.setState({loggedInUser: null})
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

    if (this.props.currentUser) {
      navButtons = [
        {
          text: 'Hi, ' + this.props.currentUser.username,
          target: 'accountMenu',
          type: 'dropdown',
          options: [
            {
              text: 'Profile',
              click: console.log('take me to profile')
            },
            {
              text: 'Lists',
              click: console.log('take me to lists')
            },
            {
              text: 'Log Out',
              click: this.logout
            }
          ]
        }
      ]
    }
    // always put the key on the component, not the root li
    return navButtons.map((button) => (
      <NavButton text={button.text} targetModal={button.target} onClick={button.click} key={button.target} buttonType={button.type} options={button.options}/>
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
    // by setting the err to an empty obj, err msgs on dom will
    // go away
    return this.setState({user: userStateObj, err:{}})
  }

  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <a className="brand-logo modal-trigger">HoneyDo</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              {this.renderNavButtons()}
            </ul>
          </div>
        </nav>
        {/*HACK: the modal was just hiding on the dom the way i
          previously had this, so now dont render it unless isOpen*/}
        {this.state.modal.isModalOpen &&
          <Modal
            err={this.state.err}
            inputs={this.getInputs()}
            isOpen={this.state.modal.isModalOpen}
            modalHeader={this.state.modal.modalHeader}
            modalClassName="modal-sign-in"
            closeModal={this.closeModal}
            submitModal={this.submitModal}
            handleInputChange={this.handleInputChange}
            />
        }
      </div>
    )
  }
}

Nav.propTypes = {
  currentUser: PropTypes.object
}

export default createContainer(() => {
  return {
    currentUser: Meteor.user()
  }
}, Nav)
