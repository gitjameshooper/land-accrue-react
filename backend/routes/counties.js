const router = require("express").Router();
const { Save } = require("@material-ui/icons");
const County = require("../models/county.model");

// @route GET /
// @desc Get county by id
// @access Public
router.get("/:id", (req, res) => {
  County.find({ countyId: req.params.id }).then((county) => res.json(county));
});

// @route PATCH /
// @desc Delete property by id
// @access Private
router.patch("/:id/properties", (req, res) => {
  let rowData = req.body.rowData;
  County.findOne({ countyId: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    rowData.forEach((row) => {
      let i = doc.totalProperties.findIndex((property) => property._id == row._id);
      doc.totalProperties[i].finalOffer = row.finalOffer;
    });
    doc.save(function (err) {
      if (err) {
        console.error("ERROR!");
      }
    });
    res.status(200).json({ status: "success" });
  });
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
      res.status(200).json({ status: "success" });
    }
  );
});

module.exports = router;
