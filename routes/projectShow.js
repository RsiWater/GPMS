// 該如何抓到準確的project
// 該如何下載檔案
// 根據使用者權限來顯示

var express = require('express');
var router = express.Router();
var multer  =   require('multer');
var fs = require('fs');

let sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('db_GPMS.db', function(err)
{
  if(err) throw err;
})

/* GET home page. */
let projectKey = undefined
router.get('/', function(req, res, next) {
  res.render('projectShow');
});


// POST below
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


router.post('/sendProject', function(req, res, next)
{
  projectKey = req.body.teamLeader
  res.json({href: '/systemManage/projectManage/projectShow'})
})
router.post('/getData', function(req, res, next)
{
  const sql_string = 'SELECT * FROM GraduationProject WHERE TeamLeader = ?'
  db.all(sql_string, projectKey, function(err, row)
  {
    if(err) throw err;
    let sendData = {
      certification: true,
      title: row[0].Name,
      description: row[0].ProjectText,
      poster: '123',
      ppt: '456',
      doc: '789',
      code: 'fuck'
    }
    res.json({info: sendData})
  })
})


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
  console.log(req.body.testPath)
  res.download('uploads/p1.txt')
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
