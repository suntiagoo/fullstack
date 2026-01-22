const mongoose = require("./index");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    trim: true,
  },
  published: {
    type: Number,
    trim: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  },
  genres: [{ type: String, trim: true, required: true }],
});

module.exports = mongoose.model("Book", schema);
