import React, { Component } from 'react'
import Navbar from './Navbar'

export class Layout extends Component {
  render() {
    const { children } = this.props

    return (
      <div className="container">
        <Navbar />
        <div className="py-5">{children}</div>
      </div>
    )
  }
}

export default Layout
