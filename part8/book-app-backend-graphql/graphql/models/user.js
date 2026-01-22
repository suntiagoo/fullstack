const mongoose = require("./index");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: [3, "Username must be at least 3 characters long"],
    unique: true,
    trim: true,
  },
  /*email: {
    type: String,
    //required: true,
    //unique: true,
    //trim: true,
    //lowercase: true,
    //match: [/\S+@\S+\.\S+/, "is invalid"],
  },*/
  passwordHash: {
    type: String,
  },
  favoriteGenre: {
    type: String,
  },
  role: {
    enum: ["employee", "manager", "admin", "guest"], // Restricts the value to one of these options
    //default: "employee",
    //required: true,
  },
  team: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});
//userSchema.index({ role: 1 });
module.exports = mongoose.model("User", userSchema);
