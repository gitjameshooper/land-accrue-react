const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

// @route Post /
// @desc Auth user when logging in
// @access Public
router.post("/auth", (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    let err = new Error(`Missing fields`);
    err.status = 400;
    return next(err);
  }
  // Check for existing user
  User.findOne({ email }).then((user) => {
    if (!user) {
      let err = new Error(`User does not exist`);
      err.status = 400;
      return next(err);
    }
    // Validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) {
        let err = new Error(`Invalid Password`);
        err.status = 400;
        return next(err);
      }
      jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" }, (err, token) => {
        if (err) return next(err);
        res.status(200).json({ user: { id: user.id, name: user.name, email: user.email }, token });
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
    .then((user) => res.status(200).json({ user }));
});

// @route Post /
// @desc Create New Admin
// @access Public
// router.post("/", (req, res) => {
//   const { name, email, password } = req.body;

//   if (!name || !email || !password) {
//     return res.status(400).json({ status: false, msg: "Missing fields" });
//   }

//   // Check for existing user
//   User.findOne({ email }).then((user) => {
//     if (user) return res.status(400).json({ status: false, msg: "User already exists" });

//     let newUser = new User({
//       name: name,
//       email: email,
//       password: password,
//     });

//     bcrypt.genSalt(10, (err, salt) => {
//       bcrypt.hash(newUser.password, salt, (err, hash) => {
//         if (err) throw err;
//         newUser.password = hash;
//         newUser.save().then((user) => {
//           jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 3600 }, (err, token) => {
//             if (err) throw err;

//             res.status(200).json({ status: true, token, user: { id: user.id, name: user.name, email: user.email } });
//           });
//         });
//       });
//     });
//   });
// });

module.exports = router;
