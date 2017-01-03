import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { _Base, _email } from './_base'

export const Users = Meteor.users
export const User = _Base.inherit({
  name: 'User',
  collection: Users,
  fields: {
    username: {
      type: String,
      validators: [
        {
          type: 'required'
        },
        {
          type: 'minLength',
          param: 1
        }
      ]
    },
    emails: {
      type: [_email],
      default: []
    }
  }
});
