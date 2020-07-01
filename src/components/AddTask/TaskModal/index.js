import React from 'react'
import Modal from '../../shared/Modal'
import Footer from './Footer'

export default function TaskModal({ id, formId, ...other }) {
  return (
    <Modal
      id={id}
      footer={<Footer id={formId} />}
      title="Add Task"
      {...other}
    ></Modal>
  )
}
