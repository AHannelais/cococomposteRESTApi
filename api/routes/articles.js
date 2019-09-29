const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Article = require("../models/articles");

router.get("/", (req, res, next) => {
  Article.find()
    .exec()
    .then(docs => {
      console.log(docs);

      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
router.post("/", (req, res, next) => {
  const article = new Article({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    author: req.body.author,
    content: req.body.content,
    image: req.body.image,
  });
  article
    .save()
    .then(result => {
      console.log(result);
      res
        .status(201)
        .json({ message: "articles  post works", createdArticle: article });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  Article.findById(id)
    .exec()
    .then(doc => {
      if (doc) {
        console.log("From Database", doc);
        res.status(200).json(doc);
      } else res.status(404).json({ message: "no valid entry found" });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
router.patch("/:id", (req, res, next) => {
  const id = req.params.id;

  Article.update(
    { _id: id },
    {
      $set: {
        title: req.body.title,
        author: req.body.author,
        content: req.body.content,
        image: req.body.image,
      },
    }
  )
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        _id: id,
        title: req.body.title,
        author: req.body.author,
        content: req.body.content,
        image: req.body.image,
      });
    })
    .catch(err => {
      console.log(err).json({ error: err });
    });
});
router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  Article.remove({ _id: id })
    .exec()
    .then(result => res.status(200).json(result))
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
module.exports = router;
