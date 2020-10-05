const router = require('express').Router();
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// @route Post /auth
// @desc Auth user
// @access Public
router.post('/', (req,res) => {
	const { email, password } = req.body.user;
	// Fields Required
	if(!email || !password){
		return res.status(400).json({msg: 'Please Enter all fields'});
	}

	// Check for existing user
	User.findOne({ email })
	.then(user => {
		if(!user) return res.status(400).json({ msg: 'User does not exist'});

		// Validate password
		bcrypt.compare(password, user.password)
			.then(isMatch => {
				if(!isMatch) return res.status(400).json({ msg: 'Invalid Creds'});
					jwt.sign({ id: user.id}, process.env.JWT_SECRET, { expiresIn: 3600}, (err, token) => {
						if(err) throw err;
						res.json({ user: { id: user.id, name: user.name, email: user.email}, token})
						
					});
			})

	});
	
	


});

// @route GET /auth/user
// @desc Get user data
// @access Private

router.get('/user', auth, (req, res) => {
	User.findById(req.user.id)
		.select('-password')
		.then(user => res.json(user));
});

 


module.exports = router;