const router = require('express').Router();
const multer  = require('multer');

 

	      let storage = multer.diskStorage({
			  destination: function (req, file, cb) {
			  	console.log(req.body.county);
			    cb(null, 'csv/'+req.body.county)
			  },
			  filename: function (req, file, cb) {
			  	console.log(file.fieldname);
			    cb(null, file.fieldname + '-' + Date.now())
			  }
			})
 let upload = multer({ storage: storage });
router.post('/csv', upload.array('buy.csv','sold.csv'),(req, res, next)  => {
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