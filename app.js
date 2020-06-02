const express = require('express')
const path = require('path')
const logger = require('morgan')
const fs = require('fs')

const app = express()
app.use(logger('dev'))
app.use(express.static(path.join(__dirname, 'files')))
app.get('/', (req, res) => {
  return res.sendStatus(200)
})
app.use((req, res) => {
  const filesDir = path.join(__dirname, 'files', req.url)
  // Check if the req.url is a path
  if (fs.existsSync(filesDir) && fs.lstatSync(filesDir).isDirectory() && fs.existsSync(`${filesDir}/.index`)) {
    const files = fs.readdirSync(filesDir)
    return res.json(files.filter(f => f.indexOf('.') !== 0))
  }

  const filename = path.basename(filesDir)

  const index = filename.lastIndexOf('.')
  const basename = filename.slice(0, index)
  if (!basename) {
    return res.sendStatus(404)
  }
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
      if (regex.test(file) || file === filename) {
        possibleFiles.push(file)
      }
    })
    if (!possibleFiles.length) {
      return res.sendStatus(404)
    }
    const randomIndex = Math.floor(Math.random() * possibleFiles.length)
    const chosenFile = possibleFiles[randomIndex]

    const outputFilePath = path.join(basePath, chosenFile)
    res.header('X-Original-Filename', chosenFile)
    return res.sendFile(outputFilePath)
  })
})

module.exports = app
