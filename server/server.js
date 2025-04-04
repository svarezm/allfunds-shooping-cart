const express = require('express')
const cors = require('cors')
const fs = require('fs')
const app = express()
const port = 3001

app.use(cors())
app.use(express.json())

const DB_FILE = './db.json'

function readData() {
  return JSON.parse(fs.readFileSync(DB_FILE))
}

function writeData(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2))
}

// GET /grocery
// GET /grocery?favorite=1
app.get('/grocery', (req, res) => {
  const data = readData()
  let { favorite, _page, _limit } = req.query

  let items = data.grocery

  // Filtrar favoritos si es necesario
  if (favorite === '1') {
    items = items.filter(item => item.favorite === true || item.favorite === '1')
  }

  // Paginación
  _page = parseInt(_page) || 1
  _limit = parseInt(_limit) || items.length // Si no se pasa _limit, devolver todos

  const startIndex = (_page - 1) * _limit
  const endIndex = _page * _limit
  const paginatedItems = items.slice(startIndex, endIndex)

  res.setHeader('X-Total-Count', items.length) // Devuelve el total de productos
  res.json(paginatedItems)
})


// PATCH /grocery/:id
app.patch('/grocery/:id', (req, res) => {
  const id = req.params.id // ⬅️ string (UUID compatible)
  const data = readData()
  const index = data.grocery.findIndex(item => item.id === id)

  if (index !== -1) {
    data.grocery[index] = { ...data.grocery[index], ...req.body }
    writeData(data)
    res.json(data.grocery[index])
  } else {
    res.status(404).send({ error: 'Item not found' })
  }
})

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`)
})
