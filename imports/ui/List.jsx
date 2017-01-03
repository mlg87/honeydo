import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
// collection
import { Lists } from '../api/lists'
import { Users } from '../api/users'
// components
import { User } from './User'
import { MultiSelect } from '../components/inputs/MultiSelect'

export class List extends Component {
  // b/c this is a state class component, we need this
  constructor(props) {
    super(props)

    this.addUserToList = this.addUserToList.bind(this)
  }

  componentDidMount() {
    $('.tooltipped').tooltip({delay: 50})
  }

  componentWillUnmount() {
    $('.tooltipped').tooltip('remove')
  }

  // not sure why the fuck this wont work?
  renderUsers(users) {
    return users.map((user) => {
      <User key={ user.userId } user={ user } />
    })
  }

  deleteList() {
    Meteor.call('lists.remove', this.props.list._id)
  }

  getOptionsForUserSelect() {
    return this.props.users.map((user) => {
      return {
        value: user._id,
        placeholder: user.username
      }
    })
  }

  // takes an arr of user _ids
  addUserToList(userIds) {
    Meteor.call('lists.addUsers', this.props.list._id, userIds)
  }

  render() {
    const users = this.props.list.users

    return (
      <li className='fader'>

        <button
          className='list-delete clickable tooltipped'
          onClick={ this.deleteList.bind(this) }
          data-position='top'
          data-tooltip={`This will permanently remove ${this.props.list.name} and all of it\'s tasks`}
        >
          &times;
        </button>

        <h5>
          { this.props.list.name }
        </h5>

        <ul>

          { users.map((user) =>
            <User key={ user.userId} user={ user } />
          )}

        </ul>

        <div className='margin-left-15'>

          { this.props.isLoading ?

            <p>fetching users...</p> :

              <MultiSelect
                placeholder='Choose user(s) to add'
                label='Share list'
                onSubmit={ this.addUserToList }
                options={ this.getOptionsForUserSelect() }
                submitPrompt='Add'
                />
            }

        </div>


      </li>
    )
  }
}

List.propTypes = {
  list: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
  isLoading: PropTypes.bool
}

// params expects an arr of user _ids
export default ListContainer = createContainer(({ params }) => {
  const userQuery = {
    _id: {
      $nin: params
    }
  }
  const userSubscription = Meteor.subscribe('users')
  const isLoading = !userSubscription.ready()
  const users = Users.find(userQuery).fetch()

  return { isLoading, users }
}, List)

//
// export default ListPageContainer = createContainer(({ params }) => {
//   const { id } = params;
//   const todosHandle = Meteor.subscribe('todos.inList', id);
//   const loading = !todosHandle.ready();
//   const list = Lists.findOne(id);
//   const listExists = !loading && !!list;
//   return {
//     loading,
//     list,
//     listExists,
//     todos: listExists ? list.todos().fetch() : [],
//   };
// }, ListPage);
