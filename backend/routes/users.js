const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @route GET /users
// @access Public
router.get('/', (req, res) => {
	User.find()
	.then(users => res.json(users))
	.catch(err => res.status(400).json(`Error: ${err}`));
});

// @route POST /users
// @desc Create New User
// @access Public
router.post('/', (req,res) => {
	const { name, password, email } = req.body.user;
	// Fields Required
	if(!name || !email || !password){
		return res.status(400).json({msg: 'Please Enter all fields'});
	}

	// Check for existing user
	User.findOne({ email })
	.then(user => {
		if(user) return res.status(400).json({ msg: 'User already exists'});
		const newUser = new User({name, password, email});

		// Create salt & hash
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(newUser.password, salt, (err, hash) => {
				if (err) throw err;
				newUser.password = hash;
				newUser.save()
				.then((user) => {
					jwt.sign({ id: user.id}, process.env.JWT_SECRET, { expiresIn: 3600}, (err, token) => {
						if(err) throw err;
						res.json({ user: { id: user.id, name: user.name, email: user.email}, token})
						
					});
				})
				.catch(err => res.status(400).json(`Error: ${err}`))
			});
		});
	});
	
	


});

router.get('/:id', (req, res) => {
	User.findById(req.params.id)
		.then(user => res.json(user))
		.catch(err => res.status(400).json(`Error: ${err}`));
});

router.delete('/:id', (req, res) => {
	User.findByIdAndDelete(req.params.id)
		.then(user => res.json('User Deleted'))
		.catch(err => res.status(400).json(`Error: ${err}`));
});

router.patch('/:id', (req, res) => {

	User.findByIdAndUpdate(req.params.id, {$set: req.body})
	     .then(() => res.json('User Updated'))
		.catch(err => res.status(400).json(`Error: ${err}`));
});


module.exports = router;