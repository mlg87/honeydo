import { check } from 'meteor/check'
// collections
// import { _user } from '../imports/api/_base'
import { List } from '../imports/api/lists'
import { Task } from '../imports/api/tasks'
import { User } from '../imports/api/users'

Meteor.methods({
  'lists.insert' (name) {
    check(name, String)
    // err if user not logged in
    if (!this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    const list = new List()
    const user = Meteor.user()
    list.set({
      name: name,
      // default the users arr to include the creator of the list
      users: [{userId: user._id, username: user.username}]
    })
    list.save()
  },
  'lists.remove' (listId) {
    check(listId, String)
    // err if user not logged in
    if (!this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    const list = List.findOne({_id: listId})
    if (!list) {
      throw new Meteor.Error('not-found')
    }
    // (1 / 2) remove all of the tasks associated with the list
    Task.remove({_id: {$in: [list.tasks]}})
    list.remove()
  },
  // taks an arr of userIds to batch add them to a list
  'lists.addUsers' (listId, userIds) {
    check(listId, String)
    check(userIds, [String])
    // err if user not logged in
    if (!this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    const list = List.findOne({_id: listId})
    if (!list) {
      throw new Meteor.Error('not-found')
    }
    const users = User.find({_id: {$in: userIds}})
    const _users = users.map((user) => {
      return {
        userId: user._id,
        username: user.username
      }
    })
    const newUsersArr = list.users.concat(_users)

    list.set('users', newUsersArr)
    list.save()
  },
  'lists.removeUser' (listId, userId) {
    check(listId, String)
    check(userId, String)
    // err if user not logged in
    if (!this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    const list = List.findOne({_id: listId})
    if (!list) {
      throw new Meteor.Error('not-found')
    }

    let _users = _.cloneDeep(list.users)
    _.pullAllBy(_users, [{userId: userId}], 'userId')
    list.set('users', _users)
    list.save()
  },
  // soft deletes all tasks marked as done
  'lists.cleanList' (listId) {
    check(listId, String)
    // err if user not logged in
    if (!this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    const list = List.findOne({_id: listId})
    if (!list) {
      throw new Meteor.Error('not-found')
    }

    // update all tasks that are completed to
    Task.update({listId: listId, isChecked: true}, {isDeleted: true}, {multi: true})
  }
})
