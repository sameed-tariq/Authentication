const jwt = require("jsonwebtoken");
require('dotenv').config();

function verifyTokenMiddleware(req, res, next) {
    const token = req.header("Authorization");
  
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
  
    jwt.verify(token, process.env.JWT_KEY, (err) => {
      if (err) {
        return res.status(403).json({ message: "Failed to authenticate token" });
      }
      next();
    });
  }

  module.exports = verifyTokenMiddleware