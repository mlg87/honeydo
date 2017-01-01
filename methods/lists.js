import { check } from 'meteor/check'
import { List } from '../imports/api/lists'
import { Task } from '../imports/api/tasks'

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
  }
})
