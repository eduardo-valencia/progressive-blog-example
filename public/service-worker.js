import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies'
import setupDatabase from '../src/services/indexedDb'

precacheAndRoute(self.__WB_MANIFEST)

registerRoute(
  /\.(?:css|html|js|svg)$/,
  new StaleWhileRevalidate({ cacheName: 'static' })
)

registerRoute(
  'https://jsonplaceholder.typicode.com/posts',
  new NetworkFirst({ cacheName: 'api' })
)

registerRoute('/', new StaleWhileRevalidate({ cacheName: 'static' }))

class AddTaskHandler {
  constructor() {
    this.database = setupDatabase()
  }

  getTasksToAdd() {
    return this.database.tasks.toArray()
  }

  getTaskData({ title, isCompleted }) {
    const task = { title, isCompleted }
    return JSON.stringify(task)
  }

  addTask(baseTask) {
    const stringifiedData = this.getTaskData(baseTask)
    const config = {
      method: 'POST',
      body: stringifiedData,
      headers: { 'Content-Type': 'application/json' },
    }
    return fetch('/api/tasks', config)
  }

  async addAllTasks(tasks) {
    const promises = tasks.map(this.addTask.bind(this))
    await Promise.all(promises)
  }

  getTaskIds(tasks) {
    return tasks.map(({ id }) => id)
  }

  async deleteTasks(tasks) {
    const ids = this.getTaskIds(tasks)
    await this.database.tasks.bulkDelete(ids)
  }

  async addTasksAndRemoveOld() {
    const tasks = await this.getTasksToAdd()
    await this.addAllTasks(tasks)
    await this.deleteTasks(tasks)
  }
}

self.addEventListener('sync', async (event) => {
  const { tag } = event
  if (tag === 'addTask') {
    const handler = new AddTaskHandler()
    await handler.addTasksAndRemoveOld()
  }
})
