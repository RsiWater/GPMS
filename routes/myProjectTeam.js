// true or false

var express = require('express');
const { InsufficientStorage } = require('http-errors');
var router = express.Router();

let sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('db_GPMS.db', function(err)
{
  if(err) throw err;
})


let userContent = undefined
/* GET home page. */
router.get('/', function(req, res, next) {

  console.log(req.cookies.PassKey)
  if(req.cookies.PassKey){
    //console.log(req.cookies.PassKey)

    const sql_string = 'SELECT * FROM account WHERE PassKey=?'
     db.all(sql_string, req.cookies.PassKey, function(err, row)
    {
        if(err) throw err;
        userContent = row[0]
        if(row[0]['Permission']==1){
          console.log('yeah')
          res.render('myProjectTeam')
        }
        else{
          console.log('no')
          res.redirect('/Login')
        }
    })


  }else{
    console.log('no')
    res.redirect('/Login')

  }
});

router.post('/getData', function(req, res, next)
{
  const teacher_sql_string = "SELECT * FROM account WHERE PassKey = ?"
  db.all(teacher_sql_string, req.cookies.PassKey, function(err, row)
  {
    if(err) throw err;
    let teacherNumber = row[0]['EmployeeNumber']
    const stu_sql_string = 'SELECT * FROM student WHERE GuideTeacher = ?'
    db.all(stu_sql_string, teacherNumber, function(err, row)
    {
      if(err) throw err
      console.log(row)
      res.json({studentList: row})
    })
  })
})

router.post('/', function(req, res, next)
{
  console.log('fy')
  let studentList = JSON.parse(req.body.mate_list)
  console.log(studentList)
  let studentLeader = req.body.leader_id

  let isExist = true

  // function sendFunction()
  // {
  //   if (isExist) {
  //     res.json({res: true})
  //     console.log('send')
  //   }
  //   else res.json({res: false})
  // }

  // function iterFunction(id,cb)
  // {
  //   const query_sql_string = 'SELECT * FROM student WHERE StudentID = ?'
  //   db.all(query_sql_string, id, function(err, row)
  //   {
  //     if (row.length == 0)
  //     {
  //       isExist = false
  //       console.log('.0.')
  //     }
  //     else
  //     {
  //       const sql_string = 'UPDATE student SET TeamLeader = ?, GuideTeacher = ? WHERE StudentID = ?'
  //       db.run(sql_string, studentLeader, userContent['EmployeeNumber'], id, function(err, row)
  //       {
  //         if(err) throw err;
  //       })
  //     }
  //     if(err) throw err
  //   })
  //   cb()
  // }

  const sql_string = 'UPDATE student SET GuideTeacher=0 WHERE GuideTeacher=?'
  db.run(sql_string,  userContent['EmployeeNumber'], function(err, row)
  {
    if(err) throw err;
    //console.log('ffy')
  })

  for(var i=0;i<studentList.length;i++){
    //iterFunction(id, sendFunction)
    const query_sql_string = 'SELECT * FROM student WHERE StudentID = ?'
    let tempStudent = studentList[i]
    db.all(query_sql_string, tempStudent, function(err, row)
    {
      console.log(i)
      if(err) throw err
      if (row.length == 0)
      {
        isExist = false
        console.log('.0.')
      }
      else
      {
        // console.log(userContent)
        const sql_string = 'UPDATE student SET TeamLeader=?,GuideTeacher=? WHERE StudentID=?'
        db.run(sql_string, studentLeader, userContent['EmployeeNumber'], tempStudent, function(err, row)
        {
          if(err) throw err;
          console.log('ffy')
        })
      }
    })
    // if (isExist) {
    //   res.json({res: true})
    //   console.log('send')
    // }
    // else {res.json({res: false})}
  }
})

module.exports = router;
