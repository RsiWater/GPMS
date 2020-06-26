var express = require('express');
var router = express.Router();
var multer  =   require('multer');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('asd')
  res.render('projectShow');
});


var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
      callback(null, './uploads')
  //   fs.mkdir('./uploads', function(err) {
  //       if(err) {
  //           console.log(err.stack)
  //       } else {
  //           callback(null, './uploads');
  //       }
  //   })
  },
  filename: function (req, file, callback) {
      
    callback(null, file.fieldname + '-' + Date.now());
  }
});

router.post('/upload',function(req, res, next)
{   
  var upload = multer({ storage : storage}).single('userFile');
  upload(req,res,function(err) {
      if(err) {
          console.log(err)
          // return res.json({href:"Error uploading file."});
      }
      // res.json({href:"File is uploaded"});
  });
})

module.exports = router;
