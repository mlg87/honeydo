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
