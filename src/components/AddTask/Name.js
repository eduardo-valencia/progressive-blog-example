import React from 'react'
import Field from './Field'

export default function Name({ setName }) {
  const onChange = (event) => setName(event.target.value)
  return (
    <Field id="name" onChange={onChange}>
      Name
    </Field>
  )
}
