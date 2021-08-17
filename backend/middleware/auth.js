const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  let jwtToken = req.header("Authorization");
  if (!jwtToken) return res.status(400).send("Authorization denied: No token");
  console.log(jwtToken);
  // jwtToken = Bearer 224ASGEFDFdfdr
  // luego del split (separamos por el espacio)
  // Queda como un array = [Bearer, 224ASGEFDFdfdr]
  // Necesitamos la posición 1
  jwtToken = jwtToken.split(" ")[1];
  console.log(jwtToken);
  // Cuando el usuario cierra sesión muere el token
  // Cuando inicia sesión se genera un nuevo token
  if (!jwtToken) return res.status(400).send("Authorization denied: No token");

  try {
    const payload = await jwt.verify(jwtToken, process.env.SECRET_KEY_JWT);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(400).send("Authorization denied: Invalid token");
  }
};

module.exports = { auth };