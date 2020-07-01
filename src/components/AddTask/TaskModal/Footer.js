import React from 'react'
import Close from '../../shared/Close'

export default function Footer({ id }) {
  return (
    <div>
      <Close />
      <button type="submit" className="btn btn-primary" form={id}>
        Add Task
      </button>
    </div>
  )
}
