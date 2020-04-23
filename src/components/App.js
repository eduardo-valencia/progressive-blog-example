import React, { Component } from 'react'
import Tasks from './Tasks'
import Layout from './Layout'
import TasksContext from './TasksContext'
import AddTask from './AddTask'
import setupDatabase from '../services/indexedDb'
import tasksApi from '../config/api'

class App extends Component {
  state = {
    tasks: null,
  }

  database = setupDatabase()

  setTasks = (tasks) => this.setState({ tasks })

  fetchTasks = async () => {
    const { data } = await tasksApi.get('/')
    this.setTasks(data)
  }

  registerBackgroundSync = async () => {
    const registration = await navigator.serviceWorker.ready
    await registration.sync.register('addTask')
  }

  storeTaskAndSendSignal = async (task) => {
    await tasksApi.post('/', task)
    await this.registerBackgroundSync()
  }

  requestAddTask = (task) => tasksApi.post('/', task)

  useBackgroundSyncOrRequest = (task) => {
    const serviceWorkerExists = navigator.serviceWorker
    if (serviceWorkerExists) {
      return this.storeTaskAndSendSignal(task)
    }
    return this.requestAddTask(task)
  }

  create = async (task) => {
    await this.useBackgroundSyncOrRequest(task)
    await this.fetchTasks()
  }

  update = async (id, task) => {
    await tasksApi.put(`/${id}`, task)
    await this.fetchTasks()
  }

  delete = async (id) => {
    await tasksApi.delete(`/${id}`)
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
