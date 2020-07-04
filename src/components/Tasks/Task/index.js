import React, { Component } from 'react'
import Checkbox from './Checkbox'
import Modal from './Modal'

export class Task extends Component {
  render() {
    const { id, title } = this.props
    const modalId = `modal-${id}`
    return (
      <>
        <Modal id={modalId} />
        <div className="card my-3">
          <div className="card-body d-flex align-items-center">
            <Checkbox task={this.props} />
            <button
              className="btn btn-link"
              data-target={`#${modalId}`}
              data-toggle="modal"
            >
              <h5 className="card-title text-body">{title}</h5>
            </button>
          </div>
        </div>
      </>
    )
  }
}

export default Task
