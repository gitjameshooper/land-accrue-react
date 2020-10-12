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
    enterData(usStateName, usStateAbbv, countyName);
    // Add error handling


    // compareComps(req.body.state, req.body.county);
// enter in buy properties into county
// enter in sold properties into county


})


const getCountyId = (usState, countyName) => {
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

const addBuyProperties = (usCounty) => {

}



async function enterData(usStateName, usStateAbbv, countyName) {
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
         let buyProps = addBuyProperties(usCounty);
            console.log(usCounty);
            return usCounty;


    } catch (e) {
        console.log(e);
    } finally {
        console.log('\u001b[32m%s\x1b\u001b[0m', 'End of the line');
    }
}

function enterDataDB(data, filename) {
    return new Promise((res, req) => {

        console.log(data);
        res("Entering data");
        console.log('Enter Mongo db data');
    });
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

function getFormattedDate() {
    let date = new Date();
    return ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
}


// Compare Land Comps
async function compareComps(state, county) {
    try {
        let buyD = await csvToJson().fromFile(`./csv/${state}/${county}/buy.csv`).then((data) => formatBuyData(data)).then((data) => enterDataDB(data, 'buy'));
        soldD = await csvToJson().fromFile(`./csv/${state}/${county}/sold.csv`).then((data) => formatSoldData(data)).then((data) => enterDataDB(data, 'sold'));
    } catch (e) {
        console.log(e);
    } finally {
        console.log('\u001b[32m%s\x1b\u001b[0m', 'All Files Ready and Compared Comps Complete');
    }
}

console.log('sync-end');

module.exports = router;