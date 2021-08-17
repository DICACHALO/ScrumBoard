const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  let jwtToken = req.header("Authorization");
  if (!jwtToken) return res.status(400).send("Authorization denied: No token");
  //console.log(jwtToken);
  // jwtToken = Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTEzZjc0ZjI0NDVjMzIzODA5ZmIxOWIiLCJuYW1lIjoiRGlhbmEgQ2hhY8OzbiIsImlhdCI6MTYyOTIyODY5Nn0.jP-dDL8MD3oH6YX6SdNq3SM0uRpnMlHxAwnQneRoS_g
  // luego del split (separamos por el espacio)
  // Queda como un array = [Bearer, eyJhbGciO...]
  // Necesitamos la posición 1
  jwtToken = jwtToken.split(" ")[1];
  //console.log(jwtToken);
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

module.exports = auth;