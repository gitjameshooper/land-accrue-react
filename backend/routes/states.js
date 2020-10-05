const router = require('express').Router();
const State = require('../models/state.model');
const auth = require('../middleware/auth');

router.get('/', auth, (req, res) => {
	State.find()
	.then(states => res.json(states))
	.catch(err => res.status(400).json(`Error: ${err}`));
});

router.post('/add', auth, (req, res) => {
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


