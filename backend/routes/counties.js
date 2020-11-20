const router = require("express").Router();
const auth = require("../middleware/auth");
const County = require("../models/county.model");

// @route GET /
// @desc Get county by id
// @access Public
router.get("/:id", (req, res) => {
  County.find({ countyId: req.params.id }).then((county) => res.status(200).json(county));
});

// @route PATCH /
// @desc Update property by id
// @access Private
router.patch("/:id/properties", auth, (req, res, next) => {
  let rowData = req.body.rowData;

  County.findOne({ countyId: req.params.id }, (err, doc) => {
    // Multiple rows
    if (rowData.length > 1) {
      rowData.forEach((row) => {
        let i = doc.totalProperties.findIndex((property) => property._id == row._id);
        doc.totalProperties[i].finalOffer = row.finalOffer;
      });
      // 1 Row
    } else if (rowData) {
      let i = doc.totalProperties.findIndex((property) => property._id == rowData[0]._id);
      doc.totalProperties[i].finalOffer = rowData[0].finalOffer;
    }
    doc.save((err) => {
      if (err) next(err);
      res.status(200).json({ status: "success" });
    });
  });
});

// @route DELETE /
// @desc Delete property by id
// @access Private
router.delete("/:id/properties", auth, (req, res, next) => {
  County.findOnendUpdate(
    { countyId: req.params.id },
    {
      $pull: { totalProperties: { _id: { $in: req.body.rowData } } },
    },
    (err, doc) => {
      if (err) next(err);
      res.status(200).json({ status: "success" });
    }
  );
});

module.exports = router;
