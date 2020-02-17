import fs from 'fs'

import config from '../config'
import { openDatabase, closeDatabase } from '../src/api/db'
import { hslToHex } from './conversion'

function main() {
  
  try {
    fs.unlinkSync(config.DB_PATH)
  } catch (err) {
    // If we get an ENOENT, the db file does not exist, throw all other errors
    if (err.code !== 'ENOENT') {
      throw err
    }
  }


  console.info('Creating color_app db...')
  const db = openDatabase()

  console.info('Creating colors table...')
  db.exec(`
  CREATE TABLE colors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    hue INTEGER NOT NULL,
    saturation INTEGER NOT NULL,
    luminance INTEGER NOT NULL,
    hex TEXT NOT NULL
  );`)

  console.info('Populating colors table...')
  for (let h = 1; h <= 360; h+=2) {
    for (let l = 20; l <= 80; l += 15) {
      db.exec(`
      INSERT INTO colors (hue, saturation, luminance, hex)
      VALUES (${h}, 100, ${l}, "${hslToHex(h, 100, l)}");
      `)
    }
  }

  closeDatabase(db)
}

main()