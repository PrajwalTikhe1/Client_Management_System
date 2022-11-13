const mongoose = require("mongoose");
const { Schema } = mongoose;

const ArticleSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  article_ID: {
    type: Number,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  comment: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Articles = mongoose.model("articles", ArticleSchema);
module.exports = Articles;
