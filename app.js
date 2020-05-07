const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const fs = require('fs')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'files')))
app.use((req, res) => {
  const filesDir = path.join(__dirname, 'files', req.url)
  const filename = path.basename(filesDir)
  const index = filename.lastIndexOf('.')
  const basename = filename.slice(0, index)
  const ext = filename.slice(index + 1)

  const basePath = path.dirname(filesDir)

  const regex = new RegExp(`${basename}_[0-9]+\.${ext}`)
  fs.readdir(basePath, (err, files) => {
    if (err) {
      console.error(err)
      return res.sendStatus(404)
    }
    const possibleFiles = []
    files.forEach(file => {
      if (regex.test(file)) {
        possibleFiles.push(file)
      }
    })
    if (!possibleFiles.length) {
      return res.sendStatus(404)
    }
    const randomIndex = Math.floor(Math.random() * possibleFiles.length)
    const chosenFile = possibleFiles[randomIndex]

    const outputFilePath = path.join(basePath, chosenFile)
    return res.sendFile(outputFilePath)
  })
})

module.exports = app
