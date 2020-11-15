const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const soldCompSchema = new Schema(
  {
    address: {
      type: String,
      require: true,
      unique: false,
      trim: true,
    },
    city: {
      type: String,
      require: true,
      unique: false,
      trim: true,
    },
    state: {
      type: String,
      require: true,
      unique: false,
      trim: true,
    },
    zip: {
      type: String,
      require: true,
      unique: false,
      trim: true,
    },
    soldPrice: {
      type: Number,
      require: true,
      unique: false,
      trim: true,
    },
    lotArea: {
      type: Number,
      require: true,
      unique: false,
      trim: true,
    },
    lotAcreage: {
      type: Number,
      require: true,
      unique: false,
      trim: true,
    },
    pricePerAcre: {
      type: Number,
      require: true,
      unique: false,
      trim: true,
    },
    latitude: {
      type: String,
      require: true,
      unique: false,
      trim: true,
    },
    longitude: {
      type: String,
      require: true,
      unique: false,
      trim: true,
    },
    distance: {
      type: Number,
      require: true,
      unique: false,
      trim: true,
    },
  },
  { versionKey: false }
);
const totalProperty = new Schema(
  {
    situsStreetAddress: {
      type: String,
      require: true,
      unique: false,
      trim: true,
    },
    situsCity: {
      type: String,
      require: true,
      unique: false,
      trim: true,
    },
    situsState: {
      type: String,
      require: true,
      unique: false,
      trim: true,
    },
    situsZipCode: {
      type: String,
      require: true,
      unique: false,
      trim: true,
    },
    county: {
      type: String,
      require: true,
      unique: false,
      trim: true,
    },
    lotArea: {
      type: Number,
      require: true,
      unique: false,
      trim: true,
    },
    lotAcreage: {
      type: Number,
      require: true,
      unique: false,
      trim: true,
    },
    legalDescription: {
      type: String,
      require: true,
      unique: false,
      trim: true,
    },
    legalLot: {
      type: String,
      require: true,
      unique: false,
      trim: true,
    },
    subdivision: {
      type: String,
      require: true,
      unique: false,
      trim: true,
    },
    municipalityTownship: {
      type: String,
      require: true,
      unique: false,
      trim: true,
    },
    latitude: {
      type: String,
      require: true,
      unique: false,
      trim: true,
    },
    longitude: {
      type: String,
      require: true,
      unique: false,
      trim: true,
    },
    apnFormatted: {
      type: String,
      require: true,
      unique: false,
      trim: true,
    },
    inFloodZone: {
      type: String,
      require: true,
      unique: false,
      trim: true,
    },
    ownerMailingName: {
      type: String,
      require: true,
      unique: false,
      trim: true,
    },
    mailingStreetAddress: {
      type: String,
      require: true,
      unique: false,
      trim: true,
    },
    mailCity: {
      type: String,
      require: true,
      unique: false,
      trim: true,
    },
    mailState: {
      type: String,
      require: true,
      unique: false,
      trim: true,
    },
    mailZipZip4: {
      type: String,
      require: true,
      unique: false,
      trim: true,
    },
    marketTotalValue: {
      type: Number,
      require: true,
      unique: false,
      trim: true,
    },
    marketImprovementValue: {
      type: Number,
      require: true,
      unique: false,
      trim: true,
    },
    date: {
      type: String,
      require: true,
      unique: false,
      trim: true,
    },
    finalPPA: {
      type: Number,
      require: true,
      unique: false,
      trim: true,
    },
    avgPPA1: {
      type: Number,
      require: true,
      unique: false,
      trim: true,
    },
    avgPPA2: {
      type: Number,
      require: true,
      unique: false,
      trim: true,
    },
    avgPPA3: {
      type: Number,
      require: true,
      unique: false,
      trim: true,
    },
    estValue1: {
      type: Number,
      require: true,
      unique: false,
      trim: true,
    },
    estValue2: {
      type: Number,
      require: true,
      unique: false,
      trim: true,
    },
    estValue3: {
      type: Number,
      require: true,
      unique: false,
      trim: true,
    },
    offer1: {
      type: Number,
      require: true,
      unique: false,
      trim: true,
    },
    offer2: {
      type: Number,
      require: true,
      unique: false,
      trim: true,
    },
    offer3: {
      type: Number,
      require: true,
      unique: false,
      trim: true,
    },
    offerPPA: {
      type: Number,
      require: true,
      unique: false,
      trim: true,
    },
    finalOffer: {
      type: Number,
      require: true,
      unique: false,
      trim: true,
    },
    finalEstValue: {
      type: Number,
      require: true,
      unique: false,
      trim: true,
    },
    statusKey: {
      type: Number,
      require: true,
      unique: false,
      trim: true,
    },
    statusColor: {
      type: String,
      require: true,
      unique: false,
      trim: true,
    },
    marketValueFlag: {
      type: Boolean,
      require: true,
      unique: false,
      trim: true,
    },
    propertyLink: {
      type: String,
      require: true,
      unique: false,
      trim: true,
    },
    soldArr: [soldCompSchema],
  },
  { versionKey: false }
);

const countySchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      unique: false,
      trim: true,
      minlength: 1,
    },
    stateAbbv: {
      type: String,
      require: true,
      unique: false,
      trim: true,
      minlength: 2,
    },
    countyId: {
      type: String,
      require: true,
      unique: true,
      trim: true,
      minlength: 2,
    },
    totalProperties: {
      type: [totalProperty],
    },
  },
  { versionKey: false }
);

module.exports = County = mongoose.model("County", countySchema);
