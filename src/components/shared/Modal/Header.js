import React, { Component } from 'react'

export class Header extends Component {
  render() {
    const { titleId, title } = this.props
    return (
      <div className="modal-header">
        <h5 className="modal-title" id={titleId}>
          {title}
        </h5>
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    )
  }
}

export default Header
