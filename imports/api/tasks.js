import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { _Base } from './_base'

export const Tasks = new Mongo.Collection('tasks')
export const Task = _Base.inherit({
  name: 'Task',
  collection: Tasks,
  fields: {
    listId: {
      type: String,
      validators: [
        {
          type: 'required'
        }
      ]
    },
    text: {
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
    userId: {
      type: String,
      validators: [
        {
          type: 'required'
        }
      ]
    },
    username: {
      type: String,
      validators: [
        {
          type: 'required'
        }
      ]
    },
    isChecked: {
      type: Boolean,
      default: false
    },
    completedAt: {
      type: Date,
      optional: true
    },
    // username
    completedBy: {
      type: String,
      optional: true
    },
    completedByUserId: {
      type: String,
      optional: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  }
});
