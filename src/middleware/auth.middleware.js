const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
     const header = req.headers.authorization;
     if (!header || !header.startsWith("Bearer ")) {
          return res.status(401).json({ error: "Unauthorized" });
     }
     const token = header.substring(7);
     try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          req.user = decoded;
          next();
     } catch (error) {
          res.status(401).json({ error: "Invalid token" });
     }
}

exports.isAdmin = (req, res, next) => {
     if (req.user && req.user.role === "admin") {
          next();
     } else {
          res.status(403).json({ error: "Access denied" });
     }
}