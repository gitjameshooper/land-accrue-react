const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const countySchema = new Schema({

	name:{
		type: String,
		require: true,
		unique: true,
		trim: true,
		minlength: 1,
		auto: true
	}
})

const usStateSchema = new Schema({

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
		type: [countySchema]
	}
},{ versionKey: false })

module.exports = USState  = mongoose.model('us-state', usStateSchema);