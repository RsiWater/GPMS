// 該如何抓到準確的project
// 該如何下載檔案
// 根據使用者權限來顯示

var express = require('express');
var router = express.Router();
var multer  =   require('multer');
var fs = require('fs');
const { post } = require('../app');
const { triggerAsyncId } = require('async_hooks');

let sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('db_GPMS.db', function(err)
{
  if(err) throw err;
})

/* GET home page. */
let projectKey = undefined
router.get('/', function(req, res, next) {
  console.log('show')
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
  console.log(projectKey)
  res.json({href: '/systemManage/projectManage/projectShow'})
})
router.post('/getData', function(req, res, next)
{
  function passCer(cer)
  {
    console.log(cer)
    const sql_string = 'SELECT * FROM GraduationProject WHERE TeamLeader = ?'
    db.all(sql_string, projectKey, function(err, row)
    {
      let studentList = []
      const sel_sql_string = 'SELECT * FROM student WHERE TeamLeader = ?'
      db.all(sel_sql_string, projectKey, function(err, row_s)
      {
        if(err) throw err
        for(let item of row_s)
        {
          studentList.push(item.Name)
        }
        let posterName, pptName, docName, codeName;
        if (row[0].PosterPath != null) posterName = row[0].PosterPath.split('\\')[1]
        else posterName = null
        if (row[0].PptPath != null) pptName = row[0].PptPath.split('\\')[1]
        else pptName = null
        if (row[0].DataPath != null) docName = row[0].DataPath.split('\\')[1]
        else docName = null
        if (row[0].ExePath != null) codeName = row[0].ExePath.split('\\')[1]
        else codeName = null
        let sendData = {
          certification: cer,
          title: row[0].Name,
          description: row[0].ProjectText,
          poster: posterName,
          ppt: pptName,
          doc: docName,
          code: codeName,
          teacher: row[0].GuideTeacher,
          student: studentList
        }
        res.json({info: sendData})
      })
    })
  }

  const sql_string = 'SELECT * FROM GraduationProject WHERE TeamLeader = ?'
  db.all(sql_string, projectKey, function(err, row)
  {
    if(err) throw err;
    if(row.length == 0)
    {
      let sendData = {
        certification: true,
        title: null,
        description: null,
        poster: null,
        ppt: null,
        doc: null,
        code: null,
        teacher: null,
        student: null
      }
      // console.log(studentList)
      res.json({info: sendData})
    }
    else
    {
      let certification = false
      db.all('SELECT * FROM account WHERE Passkey = ?', req.cookies.PassKey, function(err, row)
      {
        if(err) throw err;
        if(row[0] == undefined) passCer(false)
        else{
          if(row[0].Permission == 0) passCer(true)
          else if (row[0].Permission == 1)
          {
            db.all('SELECT * FROM GraduationProject WHERE GuideTeacher = ?', row[0].EmployeeNumber, function(err, row)
            {
              if(err) throw err;
              db.all('SELECT * FROM GraduationProject WHERE TeamLeader = ?', projectKey, function(err, row_s)
              {
                if(err) throw err;
                console.log(row_s)
                if(row_s[0].GuideTeacher == row[0].EmployeeNumber) passCer(true)
                else passCer(false)
              })
            })
          }
          else
          {
            db.all('SELECT * FROM account WHERE PassKey = ?', req.cookies.PassKey, function(err, row_s)
            {
              if(err) throw err;
              db.all('SELECT * FROM student WHERE TeamLeader = ?', projectKey, function(err, row_ss)
              {
                if(err) throw err;
                let pass = false
                for(i in row_ss)
                {
                  if(row_ss[i].StudentID == row_s[0].Name) pass = true
                }
                if(pass) passCer(true)
                else passCer(false)
              })
            })
          }
        }
        
      })

      
    }
    // const cer_sql_string = 'SELECT * FROM account WHERE PassKey = ?'
    // db.all(cer_sql_string, req.cookies.PassKey, function(err, row_c)
    // {

    // })


    
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

router.post('/newProject', function(req, res, next)
{
  const s_sql_string = 'SELECT * FROM account WHERE Passkey = ?'
  db.all(s_sql_string, req.cookies.PassKey, function(err, row)
  {
    projectKey = row[0].Name
    const sql_string = 'INSERT INTO GraduationProject(Name, Semester, TeamLeader, GuideTeacher, Grade, Score, Vote, PrizeRank, ProjectText, PosterPath, DataPath, ExePath, PptPath, checkPass) VALUES(?, "109", ?, "", 0, 0, 0, "0", ?, "", "", "", "", "")'
    db.run(sql_string, req.body.title, row[0].Name, req.body.description, function(err)
    {
      if(err) throw err
      res.json({href:'/projectShow'})
    })
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
      console.log('fuck')
      console.log(req.file)
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
