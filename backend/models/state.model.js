const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stateSchema = new Schema({

	name:{
		type: String,
		require: true,
		unique: true,
		trim: true,
		minlength: 1
	},
	abbv: {
	    type: String,
		require: true,
		unique: true,
		trim: true,
		minlength: 2
	},
	counties: {
		type: Object
	}
})

module.exports = State  = mongoose.model('State', stateSchema);