import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { _Base } from './_base'

export const UserActivities = new Mongo.Collection('userActivities')
export const UserActivity = _Base.inherit({
  name: 'UserActivity',
  collection: UserActivities,
  fields: {
    userId: {
      type: String,
      validators: [
        {
          type: 'required'
        }
      ]
    },
    mostRecentListId: {
      type: String,
      validators: [
        {
          type: 'required'
        }
      ]
    }
  }
});
