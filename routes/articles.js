const express = require("express");
const router = express.Router();
var fetchUser = require("../middleware/fetchUser");
var fetchAdmin = require("../middleware/fetchAdmin");
const Articles = require("../models/Articles");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get all articles using: GET "/api/articles/fetchallarticles". login required
router.get("/fetchallarticles", fetchUser, async (req, res) => {
  try {
    const articles = await Articles.find();
    res.json(articles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: Get all articles using: GET "/api/articles/fetchuserarticles". login required
router.get("/fetchuserarticles", fetchUser, async (req, res) => {
  try {
    const articles = await Articles.find({ user: req.user.id });
    res.json(articles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 3: Add a new Article using: POST "/api/article/addarticle". Login required
router.post(
  "/addarticle",
  fetchUser,
  [
    body("article_ID", "Enter a article id number").isLength({ min: 1 }),
    body("link", "Enter a valid link of article").isURL(),
    body("status").isBoolean().withMessage("Must be a boolean Yes or No"),
    body("comment", "Enter a valid comment").isLength({ min: 6 }),
  ],
  async (req, res) => {
    try {
      // If there are errors, return Bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { article_ID, link, status, comment } = req.body;

      const article = new Articles({
        article_ID,
        link,
        status,
        comment,
      });
      const savedArticle = await article.save();

      res.json(savedArticle);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 4: Update an existing article using: PUT "/api/articles/updatearticle". login required
router.put("/updatearticle/:id", fetchUser, async (req, res) => {
  try {
    const { article_ID, link, status, comment } = req.body;

    // Create a newArticle object
    const newArticle = {};

    if (article_ID) {
      newArticle.article_ID = article_ID;
    }
    if (link) {
      newArticle.link = link;
    }
    if (article_ID) {
      newArticle.status = status;
    }
    if (article_ID) {
      newArticle.comment = comment;
    }

    // Find the Article to be updated and update it
    let article = await Articles.findById(req.params.id);
    if (!article) {
      return res.status(404).send("Not Found");
    }

    article = await Articles.findByIdAndUpdate(
      req.params.id,
      { $set: newArticle },
      { new: true }
    );

    res.json({ article });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 5: Delete an existing article using: DELETE "/api/articles/deletearticle". login required
router.delete("/deletearticle/:id", fetchUser, async (req, res) => {
  try {
    // Find the Article to be deleted and delete it
    let article = await Articles.findById(req.params.id);
    if (!article) {
      return res.status(404).send("Not Found");
    }

    article = await Articles.findByIdAndDelete(req.params.id);
    res.json("Article has been deleted");
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error);
  }
});

module.exports = router;
