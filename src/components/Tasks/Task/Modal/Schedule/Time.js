import React, { Component } from 'react'

export class Time extends Component {
  render() {
    return (
      <label className="mt-3 form-group">
        Select Time
        <input type="time" className="form-control" {...this.props} />
      </label>
    )
  }
}

export default Time
