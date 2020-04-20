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
    const { id, title } = this.props.task
    const checkboxId = `${id}-checkbox`
    return (
      <div className="custom-control custom-checkbox">
        <input
          type="checkbox"
          className="custom-control-input"
          id={checkboxId}
          onChange={this.handleChange}
        />
        <label className="custom-control-label" htmlFor={checkboxId}>
          <h5>{title}</h5>
        </label>
      </div>
    )
  }
}

export default Checkbox
