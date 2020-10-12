const router = require('express').Router();
const multer = require('multer');
const USState = require('../models/us-state.model');
const County = require('../models/county.model');
const fs = require("fs");
const _ = require('lodash');
const csvToJson = require('csvtojson');

console.log('sync');

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        let path = `csv/${req.body.usStateAbbv.toLowerCase()}/${req.body.county.toLowerCase()}`;
        // create directory if it doesnt exist
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true }, (err) => {
                if (err) throw err;
            });
        }
        cb(null, path)
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname);
    }
})
let upload = multer({ storage: storage });
router.post('/csv', upload.fields([{ name: 'buy.csv', maxCount: 1 }, { name: 'sold.csv', maxCount: 1 }]), (req, res, next) => {

    // if(!req.file) return res.status(400).json({ msg: 'File does not exist'});
    let usStateAbbv = req.body.usStateAbbv.toLowerCase(),
        usStateName = req.body.usStateName.toLowerCase(),
        countyName = req.body.county.toLowerCase();
    addData(usStateName, usStateAbbv, countyName);

    // Add error handling

})


function getCountyId(usState, countyName) {
    return new Promise((res, rej) => {
        let countyId = null;
        usState.counties.forEach((county) => {
            if (county.name === countyName) {
                console.log('county found');
                countyId = county._id;
                res(countyId);
            }

        });
        if (!countyId) {
            USState.findOneAndUpdate({
                name: usState.name,
                abbv: usState.abbv,
            }, {
                $addToSet: {
                    counties: { 'name': countyName }
                }
            }, { new: true }, (err, doc) => {
                doc.counties.forEach((county) => {
                    if (county.name === countyName) {
                        console.log('county added');
                        countyId = county._id;
                        res(countyId);
                    }
                });

            }).exec();
        }
    });
}

function addProperties(name, usCounty, data) {
    return new Promise((res, rej) => {
        let properties = [];

        data.forEach((property) => {

            properties.push(property);
        })
        usCounty[name] = properties;
        usCounty.save((err, result) => {
        	console.log('Total props added');
			console.log(err);
            res(result);
        });
    });

}


function getFormattedDate() {
    let date = new Date();
    return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
}


function formatSoldData(csv) {
    return new Promise((res, rej) => {
        let orderArr = [];

        csv.forEach(o => {
            let acreSquareFeet = 43560,
                priceArr = o['PRICE'].replace('$', '').replace(',', '').replace(' ', '').split('.');
            orderArr.push({
                'ADDRESS': o['ADDRESS'],
                'CITY': o['CITY'],
                'STATE': o['STATE OR PROVINCE'],
                'ZIP': o['ZIP OR POSTAL CODE'],
                'SOLD PRICE': Number(priceArr[0]),
                'LOT AREA': Number(o['LOT SIZE']),
                'LOT ACREAGE': Number(parseFloat(o['LOT SIZE'] / acreSquareFeet).toFixed(2)),
                'PRICE PER ACRE': Math.round(Number(priceArr[0]) / (o['LOT SIZE'] / acreSquareFeet)),
                'LATITUDE': o['LATITUDE'],
                'LONGITUDE': o['LONGITUDE'],
                'URL': o['URL (SEE http://www.redfin.com/buy-a-home/comparative-market-analysis FOR INFO ON PRICING)'],
                'distance': 0
            })
        })
        res(orderArr);
    });
}

function formatBuyData(csv) {
    return new Promise((res, rej) => {

        let orderArr = [];

        csv.forEach(o => {

            let marketValueArr = o['MARKET TOTAL VALUE'].replace('$', '').replace(',', '').replace(' ', '').split('.'),
                marketImproveValueArr = o['MARKET IMPROVEMENT VALUE'].replace('$', '').replace(',', '').replace(' ', '').split('.');
            orderArr.push({
                'SITUS STREET ADDRESS': o['SITUS STREET ADDRESS'].trim().replace(',', ''),
                'SITUS CITY': o['SITUS CITY'].trim(),
                'SITUS STATE': o['SITUS STATE'].trim(),
                'SITUS ZIP CODE': o['SITUS ZIP CODE'].trim(),
                // 'ALTERNATE APN': o['ALTERNATE APN'].replace('\"', '').replace('\"', '').replace('=', ''),
                'COUNTY': o['COUNTY'],
                'LOT AREA': Number(o['LOT AREA']),
                'LOT ACREAGE': Number(o['LOT ACREAGE']),
                'LEGAL DESCRIPTION': o['LEGAL DESCRIPTION'],
                'LEGAL LOT': o['LEGAL LOT'],
                'SUBDIVISION': o['SUBDIVISION'],
                'MUNICIPALITY/TOWNSHIP': o['MUNICIPALITY/TOWNSHIP'],
                'LATITUDE': o['LATITUDE'],
                'LONGITUDE': o['LONGITUDE'],

                // 'APN - UNFORMATTED': o['APN - UNFORMATTED'].length > o['ALTERNATE APN'].length ? o['ALTERNATE APN'] : o['APN - UNFORMATTED'],
                // 'APN - UNFORMATTED': o['APN - UNFORMATTED'],
                'APN - FORMATTED': o['APN - FORMATTED'],
                // 'IN FLOOD ZONE': o['INSIDE SFHA'].includes('TRUE'),
                // Flood zone A and AE  true;  X  and blank false
                'IN FLOOD ZONE': o['FLOOD ZONE CODE'],
                'OWNER MAILING NAME': o['OWNER MAILING NAME'],
                'MAILING STREET ADDRESS': o['MAILING STREET ADDRESS'].trim(),
                'MAIL CITY': o['MAIL CITY'].trim(),
                'MAIL STATE': o['MAIL STATE'].trim(),
                'MAIL ZIPZIP4': o['MAIL ZIP/ZIP+4'].replace('\"', '').replace('\"', '').replace('=', ''),
                'MARKET TOTAL VALUE': Number(marketValueArr[0]),
                'MARKET IMPROVEMENT VALUE': Number(marketImproveValueArr[0]),
                'date': getFormattedDate(),
                'id': 0,
                'pricePerAcre': 0,
                'avgPPA': 0,
                'avgPPA2': 0,
                'avgPPA3': 0,
                'estValue': 0,
                'estValue2': 0,
                'estValue3': 0,
                'offer': 0,
                'offer1': 0,
                'offer2': 0,
                'offer3': 0,
                'offerPPA': 0,
                'jasonOffer': 0,
                'jasonEstValue': 0,
                'statusColor': '',
                'marketValueFlag': false,
                // 'propertyLink': 'https://www.google.com/search?q='+o['SITUS FULL ADDRESS'].trim().replace(/[ ]/g,'+').replace('++','+')
                'propertyLink': 'https://www.google.com/maps/place/' + o['LATITUDE'] + '+' + o['LONGITUDE']
            })


        })
        res(orderArr);
    });
}


function distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    } else {
        let radlat1 = Math.PI * lat1 / 180,
            radlat2 = Math.PI * lat2 / 180,
            theta = lon1 - lon2,
            radtheta = Math.PI * theta / 180,
            dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") { dist *= 1.609344 }
        if (unit == "N") { dist *= 0.8684 }

        return dist;
    }
}

function mergeData(buyData, soldData) {

    return new Promise((res, rej) => {
        let dupArr = [],
            uniqueId = 1,
            BD = [],
            buyDataAll = [],
            buyDataFlood = [],
            buyDataNonFlood = [];
        _.forEach(buyData, (bv, bk) => {
            let soldArr = [],
                totalPricePerAcre = 0;
            buyData[bk]['id'] = uniqueId++;

            // 8 miles radius from buy property - Loops through each mile adding to the sold array
            _.forEach([0, 1, 2, 3, 4, 5, 6, 7, 8], (v, k) => {
                _.forEach(soldData, (sv, sk) => {
                    let soldProp = { ...soldData[sk] },
                        soldDistance = distance(bv['LATITUDE'], bv['LONGITUDE'], sv['LATITUDE'], sv['LONGITUDE'], 'M'),
                        minAcre,
                        maxAcre;
                    switch (true) {
                        case buyData[bk]['LOT ACREAGE'] > 12:
                            minAcre = buyData[bk]['LOT ACREAGE'] - 7;
                            maxAcre = buyData[bk]['LOT ACREAGE'] + 7;
                            break;
                        case buyData[bk]['LOT ACREAGE'] > 8:
                            minAcre = buyData[bk]['LOT ACREAGE'] - 4;
                            maxAcre = buyData[bk]['LOT ACREAGE'] + 4;
                            break;
                        case buyData[bk]['LOT ACREAGE'] > 5:
                            minAcre = buyData[bk]['LOT ACREAGE'] - 2;
                            maxAcre = buyData[bk]['LOT ACREAGE'] + 2;
                            break;
                        case buyData[bk]['LOT ACREAGE'] > 3:
                            minAcre = buyData[bk]['LOT ACREAGE'] - 1;
                            maxAcre = buyData[bk]['LOT ACREAGE'] + 1;
                            break;
                        case buyData[bk]['LOT ACREAGE'] > .50:
                            minAcre = buyData[bk]['LOT ACREAGE'] - .50;
                            maxAcre = buyData[bk]['LOT ACREAGE'] + .50;
                            break;

                        default:
                            minAcre = buyData[bk]['LOT ACREAGE'] - .25;
                            maxAcre = buyData[bk]['LOT ACREAGE'] + .25;
                            break;
                    }

                    // Less than 5 sold properties on array and Less than (d) miles away and close to the same lot acreage
                    if (soldArr.length < 5 && soldDistance < v + 1 && soldDistance > v && minAcre < soldProp['LOT ACREAGE'] && maxAcre > soldProp['LOT ACREAGE']) {

                        soldProp['distance'] = Math.round(soldDistance * 100) / 100;
                        totalPricePerAcre += soldData[sk]['PRICE PER ACRE'];
                        soldArr.push(soldProp);
                    }
                });
            });
            buyData[bk]['soldArr'] = soldArr;

            // Top 3 Closests by distance: Properties Price per Acre
            let sortedDistanceSoldArr = _.sortBy(soldArr, ['distance']),
                totalPPADistance = 0,
                totalPPADistanceDivider = 0;


            if (sortedDistanceSoldArr[0] && sortedDistanceSoldArr[1] && sortedDistanceSoldArr[2]) {

                totalPPADistance = sortedDistanceSoldArr[0]['PRICE PER ACRE'] + sortedDistanceSoldArr[1]['PRICE PER ACRE'] + sortedDistanceSoldArr[2]['PRICE PER ACRE'];
                totalPPADistanceDivider = 3;
            } else if (sortedDistanceSoldArr[0] && sortedDistanceSoldArr[1]) {
                totalPPADistance = sortedDistanceSoldArr[0]['PRICE PER ACRE'] + sortedDistanceSoldArr[1]['PRICE PER ACRE'];
                totalPPADistanceDivider = 2;
            } else if (sortedDistanceSoldArr[0]) {
                totalPPADistance = sortedDistanceSoldArr[0]['PRICE PER ACRE'];
                totalPPADistanceDivider = 1;
            }

            buyData[bk]['avgPPA'] = totalPPADistance / totalPPADistanceDivider;


            // 3 middle with avg. Price per Acre
            let sortedPPASoldArr = _.sortBy(soldArr, ['PRICE PER ACRE']),
                totalPPAMiddle = 0,
                totalPPAMiddleDivider = 0;
            if (sortedPPASoldArr[1] && sortedPPASoldArr[2] && sortedPPASoldArr[3]) {
                totalPPAMiddle = sortedPPASoldArr[1]['PRICE PER ACRE'] + sortedPPASoldArr[2]['PRICE PER ACRE'] + sortedPPASoldArr[3]['PRICE PER ACRE'];
                totalPPAMiddleDivider = 3;
            } else if (sortedPPASoldArr[1] && sortedPPASoldArr[2]) {
                totalPPAMiddle = sortedPPASoldArr[1]['PRICE PER ACRE'] + sortedPPASoldArr[2]['PRICE PER ACRE'];
                totalPPAMiddleDivider = 2;
            } else if (sortedPPASoldArr[1]) {
                totalPPAMiddle = sortedPPASoldArr[1]['PRICE PER ACRE'];
                totalPPAMiddleDivider = 1;
            }
            buyData[bk]['avgPPA2'] = totalPPAMiddle / totalPPAMiddleDivider;

            // All 5 avg. Price per Acre
            buyData[bk]['avgPPA3'] = totalPricePerAcre > 0 ? Math.round(totalPricePerAcre / soldArr.length) : 0;

            // Flood Zone TRUE-> discount 25%
            // if (buyData[bk]['IN FLOOD ZONE']) {
            //     buyData[bk]['avgPPA'] *= .75;
            //     buyData[bk]['avgPPA2'] *= .75;
            //     buyData[bk]['avgPPA3'] *= .75;
            // }

            // Calculates Estimated Values and Offers
            buyData[bk]['estValue'] = Math.round(buyData[bk]['avgPPA'] * buyData[bk]['LOT ACREAGE']);
            buyData[bk]['estValue2'] = Math.round(buyData[bk]['avgPPA2'] * buyData[bk]['LOT ACREAGE'])
            buyData[bk]['estValue3'] = Math.round(buyData[bk]['avgPPA3'] * buyData[bk]['LOT ACREAGE'])
            buyData[bk]['offer1'] = Math.floor((buyData[bk]['estValue'] * .50) / 100) * 100;
            buyData[bk]['offer2'] = Math.floor((buyData[bk]['estValue2'] * .50) / 100) * 100;
            buyData[bk]['offer3'] = Math.floor((buyData[bk]['estValue3'] * .50) / 100) * 100;
            buyData[bk]['offerPPA'] = Math.round(buyData[bk]['offer'] / buyData[bk]['LOT ACREAGE']);


            // Add status color based off the amount of sold propeties
            if (soldArr.length > 3) {
                buyData[bk]['statusColor'] = 'green';
                buyData[bk]['offer'] = buyData[bk]['offer2'];
                buyData[bk]['estimatedValue'] = buyData[bk]['estValue2'];

            } else if (soldArr.length <= 3 && soldArr.length > 1) {
                buyData[bk]['statusColor'] = 'yellow';
                buyData[bk]['offer'] = buyData[bk]['offer3']
                buyData[bk]['estimatedValue'] = buyData[bk]['estValue3'];
            } else {
                buyData[bk]['statusColor'] = 'red';
                buyData[bk]['offer'] = buyData[bk]['offer3']
                buyData[bk]['estimatedValue'] = buyData[bk]['estValue3'];
            }

            // Calculate Price Per Acre
            buyData[bk]['pricePerAcre'] = Math.round(buyData[bk]['estimatedValue'] / buyData[bk]['LOT ACREAGE']);
            // MARKET TOTAL VALUE vs Estimated Value
            buyData[bk]['marketValueFlag'] = (buyData[bk]['statusColor'] !== 'red') && (buyData[bk]['MARKET TOTAL VALUE'] / buyData[bk]['estValue']) > 2 ? true : false;

            if (buyData[bk]['marketValueFlag']) {
                buyData[bk]['statusColor'] = 'red';
            }

            buyDataAll[bk] = buyData[bk];

        });
        res(_.differenceBy(buyData, dupArr, 'id'));
    });
}



async function addData(usStateName, usStateAbbv, countyName) {
    try {
        // Check for state. if not enter state into DB with county
        let usState = await USState.findOne({ name: usStateName, abbv: usStateAbbv }).exec();
        if (!usState) {
            console.log('state does not exist');
            let newState = await new USState({
                name: usStateName,
                abbv: usStateAbbv,
                counties: [{ name: countyName }]
            }).save((err, doc) => {
                if (err) console.log(err);
                console.log('state added');
                usState = doc;
            });
        }
        // Check for county in us-states collection. if not enter county and get id
        let countyId = await getCountyId(usState, countyName);
        // Check for county in counties collection. if no enter county 
        let usCounty = await County.findOne({ 'countyId': countyId }).exec();
        if (!usCounty) {
            console.log('county does not exist');
            const newCounty = new County({
                name: countyName,
                countyId: countyId
            }).save((err, doc) => {
                if (err) console.log(err);
                console.log('county added 2');
                usCounty = doc;
            });
        }
        // Add Buy and sold properties into counties collection in DB
        let buyData = await csvToJson().fromFile(`./csv/${usStateAbbv}/${countyName}/buy.csv`).then((data) => formatBuyData(data));
        let soldData = await csvToJson().fromFile(`./csv/${usStateAbbv}/${countyName}/sold.csv`).then((data) => formatSoldData(data));
        let totalData = await mergeData(buyData, soldData).then((data) => addProperties('totalProperties', usCounty, data));

        return totalData;
    } catch (e) {
        console.log(e);
    } finally {
        console.log('\u001b[32m%s\x1b\u001b[0m', 'End of the line');
    }
}




console.log('sync-end');

module.exports = router;