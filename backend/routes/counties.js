const router = require("express").Router();
const County = require("../models/county.model");

// @route GET /
// @desc Get county by id
// @access Public
router.get("/:id", (req, res) => {
  County.find({ countyId: req.params.id }).then((county) => res.json(county));
});

// @route DELETE /
// @desc Delete property by id
// @access Private
router.delete("/:id/properties", (req, res) => {
  County.findOneAndUpdate(
    { countyId: req.params.id },
    {
      $pull: { totalProperties: { _id: { $in: req.body.rowData } } },
    },
    function (err, doc) {
      console.log(err, doc);
      res.send("success");
    }
  );
});

module.exports = router;
// const idArr = rowData.filter((property) => property.county && property.finalOffer).map((property) => property["_id"]);
// console.log(properties);
// console.log(idArr);

// idArr.forEach((value) => {
//   let i = properties.findIndex((property) => property._id === value);
//   properties.splice(i, 1);
// });
// console.log(typeof properties);
// setProperties(properties);
