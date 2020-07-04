import React, { Component } from 'react'

export class Permission extends Component {
  render() {
    return (
      <div>
        <h4>Please enable notifications.</h4>
        <p>
          To use reminders, you must enable notifications. Click "Enable
          Notifications" below to continue.
        </p>
        <button
          className="btn btn-primary"
          onClick={this.props.requestPermission}
        >
          Enable Notifications
        </button>
      </div>
    )
  }
}

export default Permission
