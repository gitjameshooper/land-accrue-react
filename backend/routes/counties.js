const router = require('express').Router();
const County = require('../models/county.model');


// @route GET /
// @desc Get county by id
// @access Private

///  add in auth
router.get('/:id', (req, res) => {
	County.find({countyId: req.params.id})
		.then(county => res.json(county));
});

 


module.exports = router;