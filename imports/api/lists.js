import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { _Base, _user } from './_base'

export const Lists = new Mongo.Collection('lists')
export const List = _Base.inherit({
  name: 'List',
  collection: Lists,
  fields: {
    name: {
      type: String,
      validators: [
        {
          type: 'required'
        }
      ]
    },
    // arr of taskIds
    tasks: {
      type: [String],
      // optional so there are not errs if there are no
      // tasks left in the list
      optional: true,
      default: []
    },
    // arr of userIds
    // not optional, bc there must be at least one user
    users: {
      type: [_user],
      default: []
    }
  }
})
