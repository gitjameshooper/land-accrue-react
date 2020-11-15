const router = require("express").Router();
const USState = require("../models/us-state.model");
const auth = require("../middleware/auth");

router.get("/", (req, res) => {
  USState.find()
    .then((usStates) => res.json(usStates))
    .catch((err) => res.status(400).json({ status: false, msg: err }));
});

module.exports = router;
