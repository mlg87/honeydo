import React from 'react'
import Nav from '../Nav'

// this is a stateless react component that takes an obj
// with property children on it
export const AppLayout = ({children}) => {
  return (
    <div>
      <Nav />
      <div className="container">
        { children }
      </div>
    </div>
  )
}
