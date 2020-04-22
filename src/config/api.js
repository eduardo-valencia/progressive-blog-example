import axios from 'axios'

const tasksApi = axios.create({ baseURL: '/api/tasks' })

export default tasksApi
