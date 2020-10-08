const router = require('express').Router();
const multer = require('multer');
const fs = require("fs"); 



let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        let path = `csv/${req.body.state}/${req.body.county}`;
        // create directory if it doesnt exist
        if (!fs.existsSync(path)) {
            fs.mkdir(path, { recursive: true }, (err) => {
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
    // console.log(req.file);
    // if(!req.file) return res.status(400).json({ msg: 'File does not exist'});
    //   res.status(200);
    // console.log(req.body);
    //    let upload = multer({ dest: 'uploads/' }).single('buy.csv');
    //   upload(req, res, function (err) {
    //   	console.log(req.body);
    //   if (err instanceof multer.MulterError) {
    //     // A Multer error occurred when uploading.
    //   } else if (err) {
    //     // An unknown error occurred when uploading.
    //   }

    //   // Everything went fine.
    // })

})




module.exports = router;