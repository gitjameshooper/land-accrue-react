const router = require('express').Router();
const multer = require('multer');
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
        county = req.body.county.toLowerCase();
    // Add error handling
    // Find state in DB, enter state if it does NOT exist
    let options = { upsert: true };
    USState.findOneAndUpdate({
    	    name: usStateName,
            abbv: usStateAbbv,
            counties: {
                $elemMatch: {
                    'name': county
                }
            }
        }, {
        	name: usStateName,
            abbv: usStateAbbv,
            $push: {
                counties: { 'name': county }
            }

        }, options, (error, result) => {
            if (error) return;

            // do something with the document
        })
        .then(usState => console.log(usState));
    // Find county in DB, enter county if it does NOT exist
    // Get county by object id and enter data into counties by countyID  
    // compareComps(req.body.state, req.body.county);



})


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