// 該如何抓到準確的project
// 該如何下載檔案
// 根據使用者權限來顯示

var express = require('express');
var router = express.Router();
var multer  =   require('multer');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
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

router.post('/modifyProject', function(req, res, next)
{
  console.log(req.body.title)
})

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

router.post('/download', function(req, res, next)
{
  var filePath = path.join(__dirname, '/uploads/p1.txt');
  var stat = fileSystem.statSync(filePath);

  res.writeHead(200, {
    'Content-Type': 'audio/mpeg',
    'Content-Length': stat.size,
    'Content-Disposition': 'attachment; filename=p1.txt'
  });
  var file = fs.readFile(filePath, 'binary');

  res.setHeader('Content-Length', stat.size);
  res.setHeader('Content-Type', 'audio/mpeg');
  res.setHeader('Content-Disposition', 'attachment; filename=p1.txt');
  res.write(file, 'binary');
  res.end();
})

module.exports = router;
