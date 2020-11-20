const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const bearerToken = req.header("authorization");

  // Check for token
  if (!bearerToken) return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const bearer = bearerToken.split(" ");
    const token = bearer[1];
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ action: "remove-token", msg: "Token is not valid" });
  }
}

module.exports = auth;
