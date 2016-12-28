import { FlowRouter } from 'meteor/kadira:flow-router-ssr'
import { mount } from 'react-mounter'
import React from 'react'

FlowRouter.route('/', {
  action() {
    console.log('we routing (this)', this);
    mount(Login)
  }
});
