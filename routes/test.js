var express = require('express');
var router = express.Router();
var multer  =   require('multer');
// var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('test');
});

var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
        console.log(file)
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
      // console.log(req)
      callback(null, file.fieldname + '-' + Date.now());
    }
  });


router.post('/upload',function(req,res){
    var upload = multer({storage : storage}).single('userFile');
    // console.log(file)
    upload(req,res,function(err) {
      // console.log(res)
        if(err) {
            console.log(err)
            return res.end("Error uploading file.");
        }
        // console.log(req.file)
        res.end("File is uploaded");
    });
});

router.post('/download', function(req, res, next)
{
  res.download('uploads/p2.doc')
  // var filePath = path.join(__dirname, '/uploads/p1.txt');
  // var stat = fileSystem.statSync(filePath);

  // res.writeHead(200, {
  //   'Content-Type': 'audio/mpeg',
  //   'Content-Length': stat.size,
  //   'Content-Disposition': 'attachment; filename=p1.txt'
  // });
  // var file = fs.readFile(filePath, 'binary');

  // res.setHeader('Content-Length', stat.size);
  // res.setHeader('Content-Type', 'audio/mpeg');
  // res.setHeader('Content-Disposition', 'attachment; filename=p1.txt');
  // res.write(file, 'binary');
  // res.end();
})


module.exports = router;
