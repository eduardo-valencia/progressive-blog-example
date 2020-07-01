import React, { Component } from 'react'
import TasksContext from '../../TasksContext'

export class Checkbox extends Component {
  static contextType = TasksContext

  updateCompletedState = async (event) => {
    const { id } = this.props.task
    const newTask = {
      ...this.props.task,
      completed: event.target.checked,
    }
    await this.context.update(id, newTask)
  }

  handleChange = async (event) => {
    await this.updateCompletedState(event)
  }

  render() {
    const { id } = this.props.task
    const checkboxId = `${id}-checkbox`
    return (
      <input type="checkbox" id={checkboxId} onChange={this.handleChange} />
    )
  }
}

export default Checkbox
