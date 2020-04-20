import React, { Component } from 'react'
import Task from './Task'
import { get } from 'axios'

export class Posts extends Component {
  state = {
    tasks: null,
  }

  fetchTasks = async () => {
    const { data } = await get('https://jsonplaceholder.typicode.com/posts')
    return data
  }

  fetchAndSetTasks = async () => {
    const tasks = await this.fetchTasks()
    this.setState({ tasks })
  }

  componentDidMount() {
    this.fetchAndSetTasks()
  }

  renderTasks = () => {
    const { tasks } = this.state
    return tasks.map((post, index) => <Task key={index} {...post} />)
  }

  render() {
    if (!this.state.tasks) {
      return <p>Loading...</p>
    }
    return <div>{this.renderTasks()}</div>
  }
}

export default Posts
