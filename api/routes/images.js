const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Image = require('../models/images')

router.get('/', (req, res, next) => {
  Image.find()
    .exec()
    .then(docs => {
      console.log(docs)

      res.status(200).json(docs)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err })
    })
})
router.post('/', (req, res, next) => {
  const image = new Image({
    _id: new mongoose.Types.ObjectId(),
    link: req.body.link,
    caption: req.body.caption
  })
  image
    .save()
    .then(result => {
      console.log(result)
      res
        .status(201)
        .json({ message: 'image  post works', createdImage: image })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err })
    })
})
router.get('/:id', (req, res, next) => {
  const id = req.params.id
  Image.findById(id)
    .exec()
    .then(doc => {
      if (doc) {
        console.log('From Database', doc)
        res.status(200).json(doc)
      } else res.status(404).json({ message: 'no valid entry found' })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err })
    })
})
router.delete('/:id', (req, res, next) => {
  const id = req.params.id
  Image.remove({ _id: id })
    .exec()
    .then(result => res.status(200).json(result))
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err })
    })
})
module.exports = router
