import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'
import { Class } from 'meteor/jagi:astronomy'

export const _Base = Class.create({
  name: '_Base',
  fields: {
    createdAt: {
      type: Date,
      immutable: true,
      default: () => new Date(),
      validators: [
        {
          type: 'required'
        }
      ]
    }
  }
})

export const _user = Class.create({
  name: '_user',
  fields: {
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
    }
  }
})

export const _email = Class.create({
  name: '_email',
  fields: {
    address: String,
    verified: Boolean
  }
})
