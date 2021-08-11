const mongoose = require("mongoose"); //Para que se vuelva un esquema de base de datos mongo
const jwt = require("jsonwebtoken");
const moment = require("moment");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  roleId: { type: mongoose.Schema.ObjectId, ref: "role" },
  date: { type: Date, default: Date.now }, //Para que automáticamente guarde la fecha del sistema del servidor
  dbStatus: Boolean,
});

// Generación de token para la validación de usuarios en sesión
// Aquí no se pone información sensible

userSchema.methods.generateJWT = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      iat: moment().unix(), //issued at - emitido en
    },
    process.env.SECRET_KEY_JWT
  );
};

const user = mongoose.model("user", userSchema);
module.exports = user;