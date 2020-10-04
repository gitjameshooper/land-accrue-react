const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const countySchema = new Schema({

 
	counties: {
		type: Object
	}
})

const County = mongoose.model('County', stateSchema);

module.exports = County;