const router = require("express").Router();
const multer = require("multer");
const USState = require("../models/us-state.model");
const County = require("../models/county.model");
const fs = require("fs");
const _ = require("lodash");
const csvToJson = require("csvtojson");
const auth = require("../middleware/auth");

// Save the CSV files
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let path = `csv/${req.body.usStateAbbv.toLowerCase()}/${req.body.county.toLowerCase()}`;
    // create directory if it doesnt exist
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true }, (err) => {
        if (err) throw err;
      });
    }
    cb(null, path);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname);
  },
});
let upload = multer({ storage: storage });

// @route POST /
// @desc Post CSV files to db
// @access Private
router.post(
  "/csv",
  auth,
  upload.fields([
    { name: "buy.csv", maxCount: 1 },
    { name: "sold.csv", maxCount: 1 },
  ]),
  (req, res, next) => {
    if (!req.files) {
      let err = new Error(`Missing files`);
      err.status = 400;
      return next(err);
    }

    let usStateAbbv = req.body.usStateAbbv.toLowerCase(),
      usStateName = req.body.usStateName.toLowerCase(),
      countyName = req.body.county.toLowerCase(),
      maxMileage = Number(req.body.maxMileage);

    addData(usStateName, usStateAbbv, countyName, maxMileage).then((data) => {
      if (data.errStatus) {
        return next(data.err);
      }
      return res.status(201).json({ msg: "Data Entered" });
    });
  }
);

function getCountyId(usState, countyName) {
  return new Promise((res, rej) => {
    let countyId = null;
    usState.counties.forEach((county) => {
      if (county.name === countyName) {
        countyId = county._id;
        res(countyId);
      }
    });
    if (!countyId) {
      USState.findOneAndUpdate(
        {
          name: usState.name,
          abbv: usState.abbv,
        },
        {
          $addToSet: {
            counties: { name: countyName },
          },
        },
        { new: true },
        (err, doc) => {
          doc.counties.forEach((county) => {
            if (county.name === countyName) {
              countyId = county._id;
              res(countyId);
            }
          });
        }
      );
    }
  });
}

function addProperties(name, usCounty, data) {
  let properties = [];

  data.forEach((property) => {
    properties.push(property);
  });
  usCounty[name] = properties;
  return usCounty.save();
}

function getFormattedDate() {
  let date = new Date();
  return (
    (date.getMonth() > 8 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)) +
    "/" +
    (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
    "/" +
    date.getFullYear()
  );
}

function formatSoldData(csv) {
  return new Promise((res, rej) => {
    let orderArr = [];

    csv.forEach((o) => {
      let acreSquareFeet = 43560,
        priceArr = o["PRICE"]
          .trim()
          .replace(/[=$,"]/g, "")
          .split(".");
      orderArr.push({
        address: o["ADDRESS"] ? o["ADDRESS"].trim().replace(/[=,"]/g, "") : "",
        city: o["CITY"] ? o["CITY"].trim().replace(/[=,"]/g, "") : "",
        state: o["STATE OR PROVINCE"] ? o["STATE OR PROVINCE"].trim().replace(/[=,"]/g, "") : "",
        zip: o["ZIP OR POSTAL CODE"] ? o["ZIP OR POSTAL CODE"].trim().replace(/[=,"]/g, "") : "",
        soldPrice: priceArr[0] ? Number(priceArr[0].trim().replace(/[$=,"]/g, "")) : 0,
        lotArea: o["LOT SIZE"] ? Number(o["LOT SIZE"].trim().replace(/[=,"]/g, "")) : 0,
        lotAcreage: o["LOT SIZE"]
          ? Number(parseFloat(o["LOT SIZE"].trim().replace(/[=,"]/g, "") / acreSquareFeet).toFixed(2))
          : 0,
        pricePerAcre:
          priceArr[0] && o["LOT SIZE"]
            ? Math.round(Number(priceArr[0]) / (o["LOT SIZE"].trim().replace(/[=,"]/g, "") / acreSquareFeet))
            : 0,
        latitude: o["LATITUDE"] ? o["LATITUDE"] : "",
        longitude: o["LONGITUDE"] ? o["LONGITUDE"] : "",
        url: o["URL (SEE http://www.redfin.com/buy-a-home/comparative-market-analysis FOR INFO ON PRICING)"] || "",
        distance: 0,
      });
    });
    res(orderArr);
  });
}

function formatBuyData(csv) {
  return new Promise((res, rej) => {
    let orderArr = [];

    csv.forEach((o) => {
      let marketValueArr = o["MARKET TOTAL VALUE"]
          .trim()
          .replace(/[=$,"]/g, "")
          .split("."),
        marketImproveValueArr = o["MARKET IMPROVEMENT VALUE"]
          .trim()
          .replace(/[=$,"]/g, "")
          .split(".");
      orderArr.push({
        situsStreetAddress: o["SITUS STREET ADDRESS"] ? o["SITUS STREET ADDRESS"].trim().replace(/[=,"]/g, "") : "",
        situsCity: o["SITUS CITY"] ? o["SITUS CITY"].trim().replace(/[=,"]/g, "") : "",
        situsState: o["SITUS STATE"] ? o["SITUS STATE"].trim().replace(/[=,"]/g, "") : "",
        situsZipCode: o["SITUS ZIP CODE"] ? o["SITUS ZIP CODE"].trim().replace(/[=,"]/g, "") : "",
        county: o["COUNTY"] ? o["COUNTY"].trim().replace(/[=,"]/g, "") : "",
        lotArea: o["LOT AREA"] ? Number(o["LOT AREA"].trim().replace(/[=,"]/g, "")) : 0,
        lotAcreage: o["LOT ACREAGE"] ? Number(o["LOT ACREAGE"].trim().replace(/[=,"]/g, "")) : 0,
        legalDescription: o["LEGAL DESCRIPTION"] ? o["LEGAL DESCRIPTION"].trim().replace(/[,"]/g, "") : "",
        legalLot: o["LEGAL LOT"] ? o["LEGAL LOT"].trim().replace(/[=,"]/g, "") : "",
        subdivision: o["SUBDIVISION"] ? o["SUBDIVISION"].trim().replace(/[=,"]/g, "") : "",
        municipalityTownship: o["MUNICIPALITY/TOWNSHIP"] ? o["MUNICIPALITY/TOWNSHIP"].trim().replace(/[=,"]/g, "") : "",
        latitude: o["LATITUDE"] ? o["LATITUDE"].trim().replace(/[=,"]/g, "") : "",
        longitude: o["LONGITUDE"] ? o["LONGITUDE"].trim().replace(/[=,"]/g, "") : "",
        // 'ALTERNATE APN': o['ALTERNATE APN'].replace('\"', '').replace('\"', '').replace('=', ''),
        // 'APN - UNFORMATTED': o['APN - UNFORMATTED'].length > o['ALTERNATE APN'].length ? o['ALTERNATE APN'] : o['APN - UNFORMATTED'],
        // 'APN - UNFORMATTED': o['APN - UNFORMATTED'],
        apnFormatted: o["APN - FORMATTED"] ? o["APN - FORMATTED"].trim().replace(/[=,"]/g, "") : "",
        // Flood zone A and AE  true;  X and blank false
        inFloodZone: o["FLOOD ZONE CODE"] ? o["FLOOD ZONE CODE"].trim().replace(/[=,"]/g, "") : "",
        ownerMailingName: o["OWNER MAILING NAME"] ? o["OWNER MAILING NAME"].trim().replace(/[=,"]/g, "") : "",
        mailingStreetAddress: o["MAILING STREET ADDRESS"]
          ? o["MAILING STREET ADDRESS"].trim().replace(/[=,"]/g, "")
          : "",
        mailCity: o["MAIL CITY"] ? o["MAIL CITY"].trim().replace(/[=,"]/g, "") : "",
        mailState: o["MAIL STATE"] ? o["MAIL STATE"].trim().replace(/[=,"]/g, "") : "",
        mailZipZip4: o["MAIL ZIP/ZIP+4"] ? o["MAIL ZIP/ZIP+4"].trim().replace(/[=,"]/g, "") : "",
        marketTotalValue: marketValueArr[0] ? Number(marketValueArr[0].trim().replace(/[=,"]/g, "")) : 0,
        marketImprovementValue: marketImproveValueArr[0]
          ? Number(marketImproveValueArr[0].trim().replace(/[=,"]/g, ""))
          : 0,
        date: getFormattedDate(),
        id: 0,
        finalPPA: 0,
        avgPPA1: 0,
        avgPPA2: 0,
        avgPPA3: 0,
        estValue1: 0,
        estValue2: 0,
        estValue3: 0,
        offer1: 0,
        offer2: 0,
        offer3: 0,
        offerPPA: 0,
        finalOffer: 0,
        finalEstValue: 0,
        statusColor: "",
        marketValueFlag: false,
        // 'propertyLink': 'https://www.google.com/search?q='+o['SITUS FULL ADDRESS'].trim().replace(/[ ]/g,'+').replace('++','+')
        propertyLink: "https://www.google.com/maps/place/" + o["LATITUDE"] + "+" + o["LONGITUDE"],
      });
    });
    res(orderArr);
  });
}

function distance(lat1, lon1, lat2, lon2, unit) {
  if (lat1 == lat2 && lon1 == lon2) {
    return 0;
  } else {
    let radlat1 = (Math.PI * lat1) / 180,
      radlat2 = (Math.PI * lat2) / 180,
      theta = lon1 - lon2,
      radtheta = (Math.PI * theta) / 180,
      dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit == "K") {
      dist *= 1.609344;
    }
    if (unit == "N") {
      dist *= 0.8684;
    }

    return dist;
  }
}

// Finds the closests 5 sold properties based off location
function calculateSoldArr(buyProperty, soldData, mileageArr) {
  let totalPPA = 0,
    soldArr = [];

  // x miles radius from buy property - Loops through each mile adding to the sold array
  _.forEach(mileageArr, (v, k) => {
    _.forEach(soldData, (sv, sk) => {
      let soldProp = { ...soldData[sk] },
        soldDistance = distance(
          buyProperty["latitude"],
          buyProperty["longitude"],
          sv["latitude"],
          sv["longitude"],
          "M"
        ),
        lotAcre = buyProperty["lotAcreage"],
        minAcre,
        maxAcre;
      switch (true) {
        case lotAcre > 12:
          minAcre = lotAcre - 7;
          maxAcre = lotAcre + 20;
          break;
        case lotAcre > 8:
          minAcre = lotAcre - 4;
          maxAcre = lotAcre + 4;
          break;
        case lotAcre > 5:
          minAcre = lotAcre - 2;
          maxAcre = lotAcre + 2;
          break;
        case lotAcre > 3:
          minAcre = lotAcre - 1;
          maxAcre = lotAcre + 1;
          break;
        case lotAcre > 0.5:
          minAcre = lotAcre - 0.5;
          maxAcre = lotAcre + 0.5;
          break;

        default:
          minAcre = lotAcre - 0.25;
          maxAcre = lotAcre + 0.25;
          break;
      }

      // Less than 5 sold properties on array and Less than (d) miles away and close to the same lot acreage
      if (
        soldArr.length < 5 &&
        soldDistance < v + 1 &&
        soldDistance > v &&
        minAcre < soldProp["lotAcreage"] &&
        maxAcre > soldProp["lotAcreage"]
      ) {
        soldProp["distance"] = Math.round(soldDistance * 100) / 100;
        totalPPA += soldData[sk]["pricePerAcre"];
        soldArr.push(soldProp);
      }
    });
  });

  return { soldArr: soldArr, totalPPA: totalPPA };
}

function mergeData(buyData, soldData, mileageArr) {
  return new Promise((res, rej) => {
    let dupArr = [],
      uniqueId = 1;
    _.forEach(buyData, (bv, bk) => {
      let calculatedSoldData = calculateSoldArr(buyData[bk], soldData, mileageArr),
        totalPricePerAcre = calculatedSoldData.totalPPA;
      buyData[bk]["soldArr"] = calculatedSoldData.soldArr;
      buyData[bk]["id"] = uniqueId++;

      // PPA 1: Top 3 Closests by distance: Properties Price per Acre
      let soldArr1 = _.sortBy(buyData[bk]["soldArr"], ["distance"]).slice(0, 3),
        ppa1 = 0;

      if (soldArr1[0] && soldArr1[1] && soldArr1[2]) {
        ppa1 = soldArr1[0]["pricePerAcre"] + soldArr1[1]["pricePerAcre"] + soldArr1[2]["pricePerAcre"];
      } else if (soldArr1[0] && soldArr1[1]) {
        ppa1 = soldArr1[0]["pricePerAcre"] + soldArr1[1]["pricePerAcre"];
      } else if (soldArr1[0]) {
        ppa1 = soldArr1[0]["pricePerAcre"];
      }

      buyData[bk]["avgPPA1"] = ppa1 !== 0 && soldArr1.length !== 0 ? Math.round(ppa1 / soldArr1.length) : 0;

      // PPA 2: middle 3 with the avg. pricePerAcre
      let soldArr2 = _.sortBy(buyData[bk]["soldArr"], ["pricePerAcre"]).slice(1, 4),
        ppa2 = 0;

      if (soldArr2[1] && soldArr2[2] && soldArr2[3]) {
        ppa2 = soldArr2[1]["pricePerAcre"] + soldArr2[2]["pricePerAcre"] + soldArr2[3]["pricePerAcre"];
      } else if (soldArr2[1] && soldArr2[2]) {
        ppa2 = soldArr2[1]["pricePerAcre"] + soldArr2[2]["pricePerAcre"];
      } else if (soldArr2[1]) {
        ppa2 = soldArr2[1]["pricePerAcre"];
      }

      buyData[bk]["avgPPA2"] = ppa2 !== 0 && soldArr2.length !== 0 ? Math.round(ppa2 / soldArr2.length) : 0;
      // if (buyData[bk]["situsStreetAddress"] === "907 Creechville Rd") {
      //   console.log(buyData[bk]);
      //   console.log(soldArr2);
      // }

      // PPA 3:  All 5 avg. pricePerAcre
      buyData[bk]["avgPPA3"] =
        totalPricePerAcre !== 0 && buyData[bk]["soldArr"].length !== 0
          ? Math.round(totalPricePerAcre / buyData[bk]["soldArr"].length)
          : 0;

      // Flood Zone TRUE-> discount 25%
      // if (buyData[bk]['IN FLOOD ZONE']) {
      //     buyData[bk]['avgPPA1'] *= .75;
      //     buyData[bk]['avgPPA2'] *= .75;
      //     buyData[bk]['avgPPA3'] *= .75;
      // }

      // Calculates Estimated Values and Offers
      buyData[bk]["estValue1"] = Math.round(buyData[bk]["avgPPA1"] * buyData[bk]["lotAcreage"]);
      buyData[bk]["estValue2"] = Math.round(buyData[bk]["avgPPA2"] * buyData[bk]["lotAcreage"]);
      buyData[bk]["estValue3"] = Math.round(buyData[bk]["avgPPA3"] * buyData[bk]["lotAcreage"]);
      buyData[bk]["offer1"] = Math.floor((buyData[bk]["estValue1"] * 0.5) / 100) * 100;
      buyData[bk]["offer2"] = Math.floor((buyData[bk]["estValue2"] * 0.5) / 100) * 100;
      buyData[bk]["offer3"] = Math.floor((buyData[bk]["estValue3"] * 0.5) / 100) * 100;
      buyData[bk]["offerPPA"] = Math.round(buyData[bk]["offer1"] / buyData[bk]["lotAcreage"]);

      // Add status color based off the amount of sold propeties
      if (buyData[bk]["soldArr"].length > 3) {
        buyData[bk]["statusColor"] = "green";
        buyData[bk]["statusKey"] = 1;
        buyData[bk]["finalOffer"] = buyData[bk]["offer2"];
        buyData[bk]["finalEstValue"] = buyData[bk]["estValue2"];
      } else if (buyData[bk]["soldArr"].length <= 3 && buyData[bk]["soldArr"].length > 1) {
        buyData[bk]["statusColor"] = "yellow";
        buyData[bk]["statusKey"] = 2;
        buyData[bk]["finalOffer"] = buyData[bk]["offer3"];
        buyData[bk]["finalEstValue"] = buyData[bk]["estValue3"];
      } else {
        buyData[bk]["statusColor"] = "red";
        buyData[bk]["statusKey"] = 3;
        buyData[bk]["finalOffer"] = buyData[bk]["offer3"];
        buyData[bk]["finalEstValue"] = buyData[bk]["estValue3"];
      }

      // Calculate Price Per Acre
      buyData[bk]["finalPPA"] =
        buyData[bk]["finalEstValue"] !== 0 && buyData[bk]["lotAcreage"] !== 0
          ? Math.round(buyData[bk]["finalEstValue"] / buyData[bk]["lotAcreage"])
          : 0;
      // MARKET TOTAL VALUE vs Estimated Value
      buyData[bk]["marketValueFlag"] =
        buyData[bk]["statusColor"] !== "red" && buyData[bk]["marketTotalValue"] / buyData[bk]["estValue1"] > 2
          ? true
          : false;

      if (buyData[bk]["marketValueFlag"]) {
        buyData[bk]["statusColor"] = "red";
      }
    });

    res(_.differenceBy(buyData, dupArr, "id"));
  });
}

async function addData(usStateName, usStateAbbv, countyName, maxMileage, next) {
  try {
    // Create Mileage Arr for Radius concentric circles
    let mileageArr = [],
      mile = 0;
    maxMileage += 1;
    while (mile < maxMileage) {
      mileageArr.push(mile);
      mile++;
    }
    // Check for state in us-states collection. if null enter state into DB with county
    let usState =
      (await USState.findOne({ name: usStateName, abbv: usStateAbbv }).exec()) ||
      (await new USState({
        name: usStateName,
        abbv: usStateAbbv,
        counties: [{ name: countyName, stateAbbv: usStateAbbv }],
      }).save());
    // Check for county in us-states collection. if null enter county and get id
    let countyId = await getCountyId(usState, countyName);
    // Check for county in counties collection. if null enter county
    let usCounty =
      (await County.findOne({ countyId: countyId }).exec()) ||
      (await new County({ name: countyName, countyId: countyId, stateAbbv: usStateAbbv }).save());

    // Add Buy and sold properties into counties collection in DB
    let buyData = await csvToJson()
      .fromFile(`./csv/${usStateAbbv}/${countyName}/buy.csv`)
      .then((data) => formatBuyData(data));
    let soldData = await csvToJson()
      .fromFile(`./csv/${usStateAbbv}/${countyName}/sold.csv`)
      .then((data) => formatSoldData(data));
    // Merge data by making calculations
    return await mergeData(buyData, soldData, mileageArr).then((data) =>
      addProperties("totalProperties", usCounty, data)
    );
  } catch (err) {
    return { errStatus: true, err: err };
  }
}

module.exports = router;
