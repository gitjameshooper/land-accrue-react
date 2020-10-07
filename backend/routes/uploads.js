const router = require('express').Router();
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' })
 

 
router.post('/csv', upload.single('buy.csv'), function (req, res, next, err) {
 
	 
	console.log(req.body);
    console.log(req.file);
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})
 
 
// var cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
// app.post('/cool-profile', cpUpload, function (req, res, next) {
//   // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
//   //
//   // e.g.
//   //  req.files['avatar'][0] -> File
//   //  req.files['gallery'] -> Array
//   //
//   // req.body will contain the text fields, if there were any
// })
 



module.exports = router;