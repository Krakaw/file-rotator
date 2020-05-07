const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const indexRouter = require('./routes/index')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use((req, res, next) => {
  const filesDir = path.join(__dirname, 'files', req.url)
  const filename = path.basename(filesDir)
  const index = filename.lastIndexOf('.')
  const basename = filename.slice(0, index)
  const ext = filename.slice(index + 1)

  console.log(filename, basename, ext)

  return res.json(req.url)

  console.log(req)
})
app.use('/', indexRouter)

module.exports = app
