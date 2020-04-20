import React from 'react'

export default function Field({ id, children, ...other }) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{children}</label>
      <input id={id} className="form-control" {...other}></input>
    </div>
  )
}
