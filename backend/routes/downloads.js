// const { AsyncParser } = require("json2csv");
const { count } = require("../models/county.model");
const router = require("express").Router();
const County = require("../models/county.model");
const { parseAsync } = require("json2csv");

router.get("/csv/:countyId", (req, res) => {
  let fileName = "";
  County.findOne({ countyId: req.params.countyId })
    .then((county) => {
      fileName = `${county.name}-${county.stateAbbv}-total.csv`;
      const fields = [
        "statusColor",
        "finalEstValue",
        "LOT ACREAGE",
        "finalPPA",
        "finalOffer",
        "SUBDIVISION",
        "SITUS CITY",
        "SITUS ZIP CODE",
        "LATITUDE",
        "LONGITUDE",
        "MARKET TOTAL VALUE",
        "MARKET IMPROVEMENT VALUE",
        "MUNICIPALITY/TOWNSHIP",
        "LEGAL DESCRIPTION",
        "LEGAL LOT",
        "IN FLOOD ZONE",
        "SITUS STREET ADDRESS",
        "COUNTY",
        "SITUS STATE",
        "LOT AREA",
        "APN - FORMATTED",
        "OWNER MAILING NAME",
        "MAILING STREET ADDRESS",
        "MAIL CITY",
        "MAIL STATE",
        "MAIL ZIPZIP4",
        "date",
        "propertyLink",
      ];
      const opts = { fields };
      return parseAsync(county.totalProperties, opts);
    })
    .then((csv) => {
      res.set({
        "Content-Disposition": `attachment; filename=${fileName}`,
        "Content-Type": "text/csv",
      });
      res.status(200).send(csv);
    })
    .catch((err) => res.status(400).json({ status: false, msg: err }));
});

module.exports = router;
