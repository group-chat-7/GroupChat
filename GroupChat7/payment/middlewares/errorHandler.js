async function errHandler(error, req, res, next) {
  switch (error.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      const errors = error.errors[0].message;
      res.status(400).json({ message: errors });
      break;
    case "JsonWebTokenError":
    case "Invalid token":
      res.status(401).json({ message: "Invalid token" });
      break;
    default:
      res.status(500).json({ message: "Internal server error" });
      break;
  }
}

module.exports = errHandler;
