import React, { Component } from 'react'
import Tasks from './Tasks'
import Layout from './Layout'
import TasksContext from './TasksContext'
import AddTask from './AddTask'
import axios from 'axios'

class App extends Component {
  state = {
    tasks: null,
  }

  tasksApi = axios.create({ baseURL: '/api/tasks' })

  setTasks = (tasks) => this.setState({ tasks })

  fetchTasks = async () => {
    const { data } = await this.tasksApi.get('/')
    this.setTasks(data)
  }

  create = async (task) => {
    await this.tasksApi.post('/', task)
    await this.fetchTasks()
  }

  update = async (id, task) => {
    await this.tasksApi.put(`/${id}`, task)
    await this.fetchTasks()
  }

  delete = async (id) => {
    await this.tasksApi.delete(`/${id}`)
    await this.fetchTasks()
  }

  getProviderValue = () => ({
    tasks: this.state.tasks,
    create: this.create,
    update: this.update,
    delete: this.delete,
  })

  async componentDidMount() {
    await this.fetchTasks()
  }

  render() {
    return (
      <TasksContext.Provider value={this.getProviderValue()}>
        <Layout>
          <h1>Tasks</h1>
          <AddTask />
          <Tasks />
        </Layout>
      </TasksContext.Provider>
    )
  }
}

export default App
