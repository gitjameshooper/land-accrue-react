const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const countySchema = new Schema({

 
	counties: {
		type: Object
	}
})

module.exports = County = mongoose.model('County', countySchema);