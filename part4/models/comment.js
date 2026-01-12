const mongoose = require("./index");
const date = new Date();
const commentSchema = new mongoose.Schema({
  title: String,
  body: String,
  date: {
    type: String,
    default: `${date.toLocaleString()}`,
  },
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  },
});

commentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
module.exports = mongoose.model("Comment", commentSchema);
