import Dexie from 'dexie'

const setupDatabase = () => {
  const database = new Dexie('ProgressiveApp')
  database.version(1).stores({
    tasks: '++id,title',
  })
  return database
}

export default setupDatabase
