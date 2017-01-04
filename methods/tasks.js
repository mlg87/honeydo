import { check } from 'meteor/check'
import { Task } from '../imports/api/tasks'

Meteor.methods({
  // TODO: figure out how to get validation to work
  'tasks.insert' (text, listId) {
    check(text, String)
    check(listId, String)
    // err if user not logged in
    if (!this.userId) {
      throw new Meteor.Error('not-authorized')
    }
    // getting the whole user bc username will be stored
    // on the task and this only has userId on it
    const user = Meteor.user()

    const task = new Task()
    task.set({
      text: text,
      userId: user._id,
      username: user.username,
      listId: listId
    })
    // if (!task.validate()) {
    //   throw new Meteor.Error('not-valid')
    // }
    task.save((err) => {
      if (err) {
        throw new Meteor.Error('not-valid', err)
      }
    })

  },
  'tasks.remove' (taskId) {
    check(taskId, String)
    // err if user not logged in
    if (!this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    const task = Task.findOne({_id: taskId})
    if (!task) {
      throw new Meteor.Error('not-found')
    }
    // remove only returns an id, so not really a point to do
    // anything with it
    task.remove()
  },
  'tasks.check' (taskId) {
    check(taskId, String)
    // err if user not logged in
    if (!this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    const task = Task.findOne({_id: taskId})
    if (!task) {
      throw new Meteor.Error('not-found')
    }
    task.set({
      isChecked: !task.isChecked
    })
    task.save((err) => {
      if (err) {
        throw new Meteor.Error('not-valid', err)
      }
    })
  }
})
