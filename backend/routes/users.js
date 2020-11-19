const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

// @route Post /
// @desc Auth user when logging in
// @access Public
router.post("/auth", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ status: false, msg: "Missing fields" });
  }

  // Check for existing user
  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ status: false, msg: "User does not exist" });

    // Validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ status: false, msg: "Invalid password" });
      jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.status(200).json({ status: true, user: { id: user.id, name: user.name, email: user.email }, token });
      });
    });
  });
});

// @route Post /
// @desc Create New Admin
// @access Public
router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ status: false, msg: "Missing fields" });
  }

  // Check for existing user
  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ status: false, msg: "User already exists" });

    let newUser = new User({
      name: name,
      email: email,
      password: password,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
            if (err) throw err;

            res.status(200).json({ status: true, token, user: { id: user.id, name: user.name, email: user.email } });
          });
        });
      });
    });
  });
});

// @route GET /
// @desc Get user data from token
// @access Private
router.get("/", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.status(200).json({ status: true, user }));
});

module.exports = router;
