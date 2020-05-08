import Dexie from 'dexie'

const setupDatabase = () => {
  const database = new Dexie('MyNewDatabase')
  database.version(1).stores({
    songs: '++id',
  })
  return database
}

const database = setupDatabase()

const addSong = async () => {
  await database.songs.add({
    name: 'myNewSong',
  })
}

const getSong = (id) => database.songs.get(id)

const getAllSongs = () => {
  return database.songs.toArray()
}

const updateSong = (id) =>
  database.songs.update(id, { name: 'My Updated Name' })

const deleteSong = (id) => database.songs.delete(id)

const logSongs = async () => {
  await addSong()
  const songs = await getAllSongs()
  console.log(songs)
}
