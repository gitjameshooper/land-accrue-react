const router = require("express").Router();
const USState = require("../models/us-state.model");
const auth = require("../middleware/auth");

router.get("/", (req, res) => {
  USState.find()
    .then((usStates) => res.json(usStates))
    .catch((err) => res.status(400).json({ status: false, msg: err }));
});

// router.post('/add', auth, (req, res) => {
// 	const state = req.body.state;
// 	const abbv = req.body.abbv;
// 	const county = req.body.county;

// 	const newState = new USState({
// 		state,
// 		abbv,
// 		county
// 	});

// 	newState.save()
// 	.then(() => res.json('US State Added'))
// 	.catch(err => res.status(400).json(`Error: ${err}`))

// });

module.exports = router;
