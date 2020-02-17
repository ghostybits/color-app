import express from 'express'
import { openDatabase, closeDatabase } from './db'
import config from '../../config'

const app = express()
const port = config.PORT

app.use('/public', express.static('dist'))

app.get('/api/list/:page', (req, res) => {
  const page = parseInt(req.params['page']) - 1
  const db = openDatabase()
  
  // TODO: MOVE THIS TO CONFIG FILE 
  const PAGE_SIZE = config.LIST_PAGE_SIZE

  const currentPageData = db.prepare(`
    SELECT *
    FROM colors
    WHERE luminance = 50
    LIMIT ${PAGE_SIZE}
    OFFSET ${PAGE_SIZE * page};
  `).all()

  const totalPages = db.prepare(`SELECT count(*) as total_pages FROM colors WHERE luminance = 50;`).get().total_pages / PAGE_SIZE

  closeDatabase(db)

  return res.json({
    currentPageData,
    totalPages
  })
})

app.get('/api/color/:id', (req, res) => {
  const db = openDatabase()

  const colorDetail = db.prepare(`
    SELECT *
    FROM colors
    WHERE id = ${req.params.id};
  `).get()

  const shades = db.prepare(`
    SELECT *
    FROM colors
    WHERE hue = ${colorDetail.hue}
  `).all()

  return res.json({
    ...colorDetail,
    shades
  })
})

app.get('*', (req, res) => {
  res.sendFile(config.HTML_PATH)
})

app.listen(port, () => console.log(`color-app listening on port ${port}...`))