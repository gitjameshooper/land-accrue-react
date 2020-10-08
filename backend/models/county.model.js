const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const buyProperty = new Schema({
		name:{
		type: String,
		require: true,
		unique: false,
		trim: true,
		minlength: 1
	}
})

const soldProperty = new Schema({
		name:{
		type: String,
		require: true,
		unique: false,
		trim: true,
		minlength: 1
	}
})
const totalProperty = new Schema({
		name:{
		type: String,
		require: true,
		unique: false,
		trim: true,
		minlength: 1
	}
})


const countySchema = new Schema({

 
	name:{
		type: String,
		require: true,
		unique: false,
		trim: true,
		minlength: 1
	},
	countyId: {
	    type: String,
		require: true,
		unique: true,
		trim: true,
		minlength: 2
	},
	buy: {
		type: [buyProperty],

	},
	sold: {
		type: [soldProperty],

	},
	total: {
		type: [totalProperty],

	},
})

module.exports = County = mongoose.model('County', countySchema);