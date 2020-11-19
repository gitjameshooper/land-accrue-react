const router = require("express").Router();
const County = require("../models/county.model");
const { parseAsync } = require("json2csv");

// @route Get /
// @desc Get county CSV by id
// @access Public
router.get("/csv/:countyId", (req, res) => {
  let fileName = "";
  County.findOne({ countyId: req.params.countyId })
    .then((county) => {
      fileName = `${county.name}-${county.stateAbbv}-total.csv`;
      const fields = [
        "statusColor",
        "finalEstValue",
        "lotAcreage",
        "finalPPA",
        "finalOffer",
        "subdivision",
        "situsCity",
        "situsZipCode",
        "latitude",
        "longitude",
        "marketTotalValue",
        "marketImprovementValue",
        "municipalityTownship",
        "legalDescription",
        "legalLot",
        "inFloodZone",
        "situsStreetAddress",
        "county",
        "situsState",
        "lotArea",
        "apnFormatted",
        "ownerMailingName",
        "mailingStreetAddress",
        "mailCity",
        "mailState",
        "mailZipZip4",
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
    });
});

module.exports = router;
