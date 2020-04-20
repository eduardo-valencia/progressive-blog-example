import React from 'react'

export default function Footer({ id }) {
  return (
    <div>
      <button type="button" className="btn btn-secondary" data-dismiss="modal">
        Close
      </button>
      <button type="submit" className="btn btn-primary" form={id}>
        Add Task
      </button>
    </div>
  )
}
