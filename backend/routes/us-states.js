const router = require("express").Router();
const USState = require("../models/us-state.model");

router.get("/", (req, res, next) => {
  USState.fin({ al: "it" })
    .then((usStates) => res.status(200).json(usStates))
    .catch((error) => {
      // console.log(error);
      // const err = new Error("States NOT found");
      // err.status = 404;
      // next(err);
    });
});

module.exports = router;
