const upload = async (req, res, next) => {
  if (req.files.image.type) {
    let type = req.files.image.type; //.fill
    if (
      type !== "image/png" &&
      type !== "image/jpg" &&
      type !== "image/jpeg" &&
      type !== "image/gif"
    ) {
        return res.status(400).send("Invalid format: only .png .jpg .jpeg .gif");
        next();
    } else{
        next();
    }
  }
};

module.exports = upload;
