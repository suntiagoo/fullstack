const mongoose = require("./index");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
    trim: true,
  },
  born: {
    type: Number,
  },
});

module.exports = mongoose.model("Author", schema);
