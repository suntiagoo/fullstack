/*require("dotenv").config();
const config = require("../../../utils/config");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("EN INDEX connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

module.exports = mongoose;*/
