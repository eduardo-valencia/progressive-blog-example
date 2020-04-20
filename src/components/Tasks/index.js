import React, { Component } from 'react'
import Task from './Task/index'
import TasksContext from '../TasksContext'

export class Posts extends Component {
  static contextType = TasksContext

  state = {
    tasks: null,
  }

  renderTasks = () => {
    const { tasks } = this.context
    return tasks.map((post, index) => <Task key={index} {...post} />)
  }

  render() {
    if (!this.context.tasks) {
      return <p>Loading...</p>
    }
    return <div>{this.renderTasks()}</div>
  }
}

export default Posts
