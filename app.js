const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const articleRoutes = require('./api/routes/articles')
const imageRoutes = require('./api/routes/images')
const mongoose = require('mongoose')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
pw = process.env.MONGO_ATLAS_PW
mongoose.connect(
  `mongodb+srv://cocomposte:cocomposte31@cocomposte-rest-api-12djo.mongodb.net/test?retryWrites=true&w=majority`,

  { useNewUrlParser: true, useUnifiedTopology: true }
  // { useMongoClient: true }
)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, PATCH, POST, DELETE, GET')
    return res.status(200).json({})
  }
  next()
})

app.use('/articles', articleRoutes)
app.use('/images', imageRoutes)
app.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({ error: { message: error.message } })
})
module.exports = app
