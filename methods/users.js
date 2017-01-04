import { check } from 'meteor/check'
import { User } from '../imports/api/users'

Meteor.methods({
  // TODO: figure out how to get validation to work
  'users.updateMostRecentList' (listId) {
    check(listId, String)
    // err if user not logged in
    if (!this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    user = User.findOne({_id: this.userId})
    if (!user) {
      throw new Meteor.Error('not-found')
    }

    user.set('mostRecentListId', listId)
    user.save()
  }
})
