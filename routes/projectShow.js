// 該如何抓到準確的project
// 該如何下載檔案
// 根據使用者權限來顯示

var express = require('express');
var router = express.Router();
var multer  =   require('multer');
var fs = require('fs');
const { post } = require('../app');

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
    callback(null, Date.now() + '-' + file.originalname );
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
    let posterName, pptName, docName, codeName;
    if (row[0].PosterPath 
      != null) posterName = row[0].PosterPath.split('\\')[1]
    else posterName = null
    if (row[0].PptPath != null) pptName = row[0].PptPath.split('\\')[1]
    else pptName = null
    if (row[0].DataPath != null) docName = row[0].DataPath.split('\\')[1]
    else docName = null
    if (row[0].ExePath != null) codeName = row[0].ExePath.split('\\')[1]
    else codeName = null
    let sendData = {
      certification: true,
      title: row[0].Name,
      description: row[0].ProjectText,
      poster: posterName,
      ppt: pptName,
      doc: docName,
      code: codeName
    }
    res.json({info: sendData})
  })
})


router.post('/modifyProject', function(req, res, next)
{
  console.log(req.body.title)
  const sql_string = 'UPDATE GraduationProject SET Name = ?, ProjectText = ? WHERE TeamLeader = ?'
  db.run(sql_string, req.body.title, req.body.description, projectKey, function(err)
  {
    if(err) throw err
    res.json({href:'/projectShow'})
  })
})

router.post('/upload',function(req, res, next)
{   
  var upload = multer({ storage : storage}).single('userFile');
  upload(req,res,function(err) {
      if(err) {
          console.log(err)
          // return res.json({href:"Error uploading file."});
      }
      let type = req.body.uploadType
      let pathType = ''
      if (type === 'poster') pathType = 'PosterPath'
      else if(type === 'doc') pathType = 'DataPath'
      else if(type === 'ppt') pathType = 'PptPath'
      else pathType = 'ExePath'

      const sql_string = "UPDATE GraduationProject SET " + pathType + " = ? WHERE TeamLeader = ?"
      db.run(sql_string, req.file.path , projectKey, function(err)
      {
        if(err) throw err
      })
      res.redirect('../projectShow')
      // res.json({href:"Uploading file Success."})
  });
})

router.post('/download', function(req, res, next)
{
  let type = req.body.downloadType

  const sql_string = "SELECT * FROM GraduationProject WHERE TeamLeader = ?"
  db.all(sql_string, projectKey, function(err, row)
  {
    if (err) throw err;
    let filePath = ''
    if (type === 'poster') filePath = row[0].PosterPath
    else if(type === 'ppt') filePath = row[0].PptPath
    else if(type === 'doc') filePath = row[0].DataPath
    else if(type === 'code') filePath = row[0].ExePath
    else{
      res.json({mes: 'error'})
    }
    res.download(filePath)
  })

})

module.exports = router;
