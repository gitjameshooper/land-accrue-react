const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const usCountySchema = new Schema({

	name:{
		type: String,
		require: true,
		unique: false,
		trim: true,
		minlength: 1,
		auto: true
	}
},{ versionKey: false})

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
	counties: [usCountySchema]
},{ versionKey: false})

module.exports = USState  = mongoose.model('us-state', usStateSchema);