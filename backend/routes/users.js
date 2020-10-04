const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
	User.find()
	.then(users => res.json(users))
	.catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/add').post((req,res) => {

	const username = req.body.username;
	const password = req.body.password;
	const newUser = new User({username, password});

	newUser.save()
	.then(() => res.json('User added'))
	.catch(err => res.status(400).json(`Error: ${err}`))
});

router.route('/:id').get((req, res) => {
	User.findById(req.params.id)
		.then(user => res.json(user))
		.catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').delete((req, res) => {
	User.findByIdAndDelete(req.params.id)
		.then(user => res.json('User Deleted'))
		.catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').patch((req, res) => {

	User.findByIdAndUpdate(req.params.id, {$set: req.body})
	     .then(() => res.json('User Updated'))
		.catch(err => res.status(400).json(`Error: ${err}`));
});


module.exports = router;