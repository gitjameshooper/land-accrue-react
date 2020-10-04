const router = require('express').Router();
let State = require('../models/state.model');

router.route('/').get((req, res) => {
	State.find()
	.then(states => res.json(states))
	.catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req, res) => {
	const state = req.body.state;
	const abbv = req.body.abbv;
	const county = req.body.county;

	const newState = new State({
		state,
		abbv,
		county
	});

	newState.save()
	.then(() => res.json('State Added'))
	.catch(err => res.status(400).json(`Error: ${err}`))

});


module.exports = router;


