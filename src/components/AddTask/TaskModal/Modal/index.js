import React, { Component } from 'react'
import Header from './Header'

export class Modal extends Component {
  render() {
    const { id, children, footer, title } = this.props
    const titleId = `${id}__title`
    return (
      <div
        className="modal fade"
        id={id}
        tabindex="-1"
        role="dialog"
        aria-labelledby={titleId}
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <Header titleId={titleId} title={title} />
            <div className="modal-body">{children}</div>
            <div className="modal-footer">{footer}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal
