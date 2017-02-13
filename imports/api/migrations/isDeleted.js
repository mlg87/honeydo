import { Task } from '../imports/api/tasks'

Meteor.methods({
  'isDeletedMigration'() {
    const user = Meteor.user()
    if (!this.userId) {
      throw new Meteor.Error('not-authorized')
    } else if (user.username !== 'msmeeve') {
      throw new Meteor.Error('not-authorized: you\'re not Mason')
    }

    Task.update({}, {isDeleted: false}, {multi: true})
  }
})
