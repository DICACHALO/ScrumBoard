const mogoose = require("mongoose");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const userScheme = new mogoose.Schema({
  name: String,
  email: String,
  password: String,
  roleId: { type: mongoose.Schema.ObjectId, ref: "role" },
  date: { type: Date, default: Date.now },
  dbStatus: Boolean,
});

userScheme.methods.generateJWT = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: thist.name,
      iat: moment().unix(), //issued at - emitido en
    },
    process.env.SECRET_KEY_JWT
  );
};

const user = mongoose.model("user", userScheme);
module.exports = user;