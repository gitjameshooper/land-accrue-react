const router = require("express").Router();
const USState = require("../models/us-state.model");

// @route Get /
// @desc Get all us states data
// @access Public
router.get("/", (req, res, next) => {
  USState.find().then((usStates) => res.status(200).json(usStates));
});

module.exports = router;
