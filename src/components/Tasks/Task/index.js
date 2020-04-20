import React, { Component } from 'react'
import Checkbox from './Checkbox'

export class Task extends Component {
  render() {
    const { body } = this.props
    return (
      <div className="card my-3">
        <div className="card-body">
          <Checkbox task={this.props} />
          <p className="card-text">{body}</p>
        </div>
      </div>
    )
  }
}

export default Task
