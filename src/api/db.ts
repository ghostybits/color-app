import Database from 'better-sqlite3'
import config from '../../config'

export function openDatabase() {
  const db = new Database(config.DB_PATH)
  console.info('Connected to color_app db...')
  return db
}

export function closeDatabase(db) {
  db.close(err => {
    if (err) { console.error(err.message) }
    console.info('Closed connection to color_app db...')
  })
}