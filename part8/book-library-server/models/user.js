const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
  },
  favoriteGenre: {
    type: String,
    required: true,
  },
  passwordHash: String,
});

schema.plugin(uniqueValidator);

schema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

module.exports = mongoose.model("User", schema);
