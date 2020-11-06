const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// const buyProperty = new Schema({
//     'SITUS STREET ADDRESS': {
//         type: String,
//         require: true,
//         unique: false,
//         trim: true
//     },
//     'SITUS CITY': {
//         type: String,
//         require: true,
//         unique: false,
//         trim: true
//     },
//     'SITUS STATE': {
//         type: String,
//         require: true,
//         unique: false,
//         trim: true
//     },
//     'SITUS ZIP CODE': {
//         type: String,
//         require: true,
//         unique: false,
//         trim: true
//     },
//     'COUNTY': {
//         type: String,
//         require: true,
//         unique: false,
//         trim: true
//     },
//     'LOT AREA': {
//         type: Number,
//         require: true,
//         unique: false,
//         trim: true
//     },
//     'LOT ACREAGE': {
//         type: Number,
//         require: true,
//         unique: false,
//         trim: true
//     },
//     'LEGAL DESCRIPTION': {
//         type: String,
//         require: true,
//         unique: false,
//         trim: true
//     },
//     'LEGAL LOT': {
//         type: String,
//         require: true,
//         unique: false,
//         trim: true
//     },
//     'SUBDIVISION': {
//         type: String,
//         require: true,
//         unique: false,
//         trim: true
//     },
//     'MUNICIPALITY/TOWNSHIP': {
//         type: String,
//         require: true,
//         unique: false,
//         trim: true
//     },
//     'LATITUDE': {
//         type: String,
//         require: true,
//         unique: false,
//         trim: true
//     },
//     'LONGITUDE': {
//         type: String,
//         require: true,
//         unique: false,
//         trim: true
//     },
//     'APN - FORMATTED': {
//         type: String,
//         require: true,
//         unique: false,
//         trim: true
//     },
//     'IN FLOOD ZONE': {
//         type: String,
//         require: true,
//         unique: false,
//         trim: true
//     },
//     'OWNER MAILING NAME': {
//         type: String,
//         require: true,
//         unique: false,
//         trim: true
//     },
//     'MAILING STREET ADDRESS': {
//         type: String,
//         require: true,
//         unique: false,
//         trim: true
//     },
//     'MAIL CITY': {
//         type: String,
//         require: true,
//         unique: false,
//         trim: true
//     },
//     'MAIL STATE': {
//         type: String,
//         require: true,
//         unique: false,
//         trim: true
//     },
//     'MAIL ZIPZIP4': {
//         type: String,
//         require: true,
//         unique: false,
//         trim: true
//     },
//     'MARKET TOTAL VALUE': {
//         type: Number,
//         require: true,
//         unique: false,
//         trim: true
//     },
//     'MARKET IMPROVEMENT VALUE': {
//         type: Number,
//         require: true,
//         unique: false,
//         trim: true
//     },
//     'date': {
//         type: String,
//         require: true,
//         unique: false,
//         trim: true
//     },

//     'pricePerAcre': {
//         type: Number,
//         require: true,
//         unique: false,
//         trim: true
//     },
//     'avgPPA': {
//         type: Number,
//         require: true,
//         unique: false,
//         trim: true
//     },
//     'avgPPA2': {
//         type: Number,
//         require: true,
//         unique: false,
//         trim: true
//     },
//     'avgPPA3': {
//         type: Number,
//         require: true,
//         unique: false,
//         trim: true
//     },
//     'estValue': {
//         type: Number,
//         require: true,
//         unique: false,
//         trim: true
//     },
//     'estValue2': {
//         type: Number,
//         require: true,
//         unique: false,
//         trim: true
//     },
//     'estValue3': {
//         type: Number,
//         require: true,
//         unique: false,
//         trim: true
//     },
//     'offer': {
//         type: Number,
//         require: true,
//         unique: false,
//         trim: true
//     },
//     'offer1': {
//         type: Number,
//         require: true,
//         unique: false,
//         trim: true
//     },
//     'offer2': {
//         type: Number,
//         require: true,
//         unique: false,
//         trim: true
//     },
//     'offer3': {
//         type: Number,
//         require: true,
//         unique: false,
//         trim: true
//     },
//     'offerPPA': {
//         type: Number,
//         require: true,
//         unique: false,
//         trim: true
//     },
//     'jasonOffer': {
//         type: Number,
//         require: true,
//         unique: false,
//         trim: true
//     },
//     'jasonEstValue': {
//         type: Number,
//         require: true,
//         unique: false,
//         trim: true
//     },
//     'statusKey': {
//         type: Number,
//         require: true,
//         unique: false,
//         trim: true
//     },
//     'statusColor': {
//         type: String,
//         require: true,
//         unique: false,
//         trim: true
//     },
//     'marketValueFlag': {
//         type: Boolean,
//         require: true,
//         unique: false,
//         trim: true
//     },
//     'propertyLink': {
//         type: String,
//         require: true,
//         unique: false,
//         trim: true
//     }
// }, { versionKey: false });

const soldProperty = new Schema({
    'ADDRESS': {
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    'CITY': {
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    'STATE': {
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    'ZIP': {
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    'SOLD PRICE': {
        type: Number,
        require: true,
        unique: false,
        trim: true
    },
    'LOT AREA': {
        type: Number,
        require: true,
        unique: false,
        trim: true
    },
    'LOT ACREAGE': {
        type: Number,
        require: true,
        unique: false,
        trim: true
    },
    'PRICE PER ACRE': {
        type: Number,
        require: true,
        unique: false,
        trim: true
    },
    'LATITUDE': {
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    'LONGITUDE': {
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    'URL': {
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    'distance': {
        type: Number,
        require: true,
        unique: false,
        trim: true
    }
}, { versionKey: false });
const soldCompSchema = new Schema({
    "ADDRESS": {
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    "CITY": {
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    "STATE": {
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    "ZIP": {
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    "SOLD PRICE": {
        type: Number,
        require: true,
        unique: false,
        trim: true
    },
    "LOT AREA": {
        type: Number,
        require: true,
        unique: false,
        trim: true
    },
    "LOT ACREAGE": {
        type: Number,
        require: true,
        unique: false,
        trim: true
    },
    "PRICE PER ACRE": {
        type: Number,
        require: true,
        unique: false,
        trim: true
    },
    "LATITUDE": {
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    "LONGITUDE": {
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    "distance": {
        type: Number,
        require: true,
        unique: false,
        trim: true
    }
}, { versionKey: false });
const totalProperty = new Schema({
    "SITUS STREET ADDRESS": {
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    "SITUS CITY": {
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    "SITUS STATE": {
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    "SITUS ZIP CODE": {
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    "COUNTY": {
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    "LOT AREA": {
        type: Number,
        require: true,
        unique: false,
        trim: true
    },
    "LOT ACREAGE": {
        type: Number,
        require: true,
        unique: false,
        trim: true
    },
    "LEGAL DESCRIPTION": {
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    "LEGAL LOT": {
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    "SUBDIVISION": {
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    "MUNICIPALITY/TOWNSHIP": {
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    "LATITUDE": {
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    "LONGITUDE": {
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    "APN - FORMATTED": {
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    "IN FLOOD ZONE": {
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    "OWNER MAILING NAME": {
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    "MAILING STREET ADDRESS": {
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    "MAIL CITY": {
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    "MAIL STATE": {
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    "MAIL ZIPZIP4": {
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    "MARKET TOTAL VALUE": {
        type: Number,
        require: true,
        unique: false,
        trim: true
    },
    "MARKET IMPROVEMENT VALUE": {
        type: Number,
        require: true,
        unique: false,
        trim: true
    },
    "date": {
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    "finalPPA": {
        type: Number,
        require: true,
        unique: false,
        trim: true
    },
    "avgPPA1": {
        type: Number,
        require: true,
        unique: false,
        trim: true
    },
    "avgPPA2": {
        type: Number,
        require: true,
        unique: false,
        trim: true
    },
    "avgPPA3": {
        type: Number,
        require: true,
        unique: false,
        trim: true
    },
    "estValue1": {
        type: Number,
        require: true,
        unique: false,
        trim: true
    },
    "estValue2": {
        type: Number,
        require: true,
        unique: false,
        trim: true
    },
    "estValue3": {
        type: Number,
        require: true,
        unique: false,
        trim: true
    },
    "offer1": {
        type: Number,
        require: true,
        unique: false,
        trim: true
    },
    "offer2": {
        type: Number,
        require: true,
        unique: false,
        trim: true
    },
    "offer3": {
        type: Number,
        require: true,
        unique: false,
        trim: true
    },
    "offerPPA": {
        type: Number,
        require: true,
        unique: false,
        trim: true
    },
    "finalOffer": {
        type: Number,
        require: true,
        unique: false,
        trim: true
    },
    "finalEstValue": {
        type: Number,
        require: true,
        unique: false,
        trim: true
    },
    'statusKey': {
        type: Number,
        require: true,
        unique: false,
        trim: true
    },
    "statusColor": {
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    "marketValueFlag": {
        type: Boolean,
        require: true,
        unique: false,
        trim: true
    },
    "propertyLink": {
        type: String,
        require: true,
        unique: false,
        trim: true
    },
    "soldArr": [soldCompSchema]
}, { versionKey: false });



const countySchema = new Schema({


    name: {
        type: String,
        require: true,
        unique: false,
        trim: true,
        minlength: 1
    },
    stateAbbv: {
        type: String,
        require: true,
        unique: false,
        trim: true,
        minlength: 2
    },
    countyId: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        minlength: 2
    },
    // buy: {
    //     type: [buyProperty],

    // },
    // sold: {
    //     type: [soldProperty],

    // },
    totalProperties: {
        type: [totalProperty],

    },
}, { versionKey: false })

module.exports = County = mongoose.model('County', countySchema);