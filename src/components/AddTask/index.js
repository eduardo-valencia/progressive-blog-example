import React, { Component } from 'react'
import TasksContext from '../TasksContext'
import Name from './Name'
import TaskModal from './TaskModal'

export class AddTask extends Component {
  static contextType = TasksContext

  state = {
    title: null,
  }

  setTitle = (title) => this.setState({ title })

  addTask = async () => {
    const task = {
      title: this.state.title,
      isCompleted: false,
    }
    await this.context.create(task)
  }

  onSubmit = async (event) => {
    event.preventDefault()
    await this.addTask()
  }

  render() {
    const id = 'add-task'
    const formId = `${id}__form`
    return (
      <TaskModal id={id} formId={formId}>
        <form onSubmit={this.onSubmit} id={formId}>
          <Name setName={this.setTitle} />
        </form>
      </TaskModal>
    )
  }
}

export default AddTask
