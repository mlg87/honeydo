// collections
import { Tasks } from '../imports/api/tasks'
import { Lists } from '../imports/api/lists'
import { Users } from '../imports/api/users'

if (Meteor.isServer) {
  // task publications
  Meteor.publish('tasks', () => {
    return Tasks.find()
  })

  // list publications
  Meteor.publish('lists', (userId) => {
    return Lists.find()
  })

  // user publications
  Meteor.publish('users', () => {
    return Users.find()
  })
}
