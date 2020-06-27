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
    let teacherNumber = row[0].EmployeeNumber
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
  let studentList = JSON.parse(req.body.mate_list)
  let studentLeader = req.body.leader_id

  db.serialize(function()
  {
    let isExist = true

    let sendFunction = function()
    {
      if (isExist) {
        res.json({res: true})
        console.log('send')
      }
      else res.json({res: false})
    }

    studentList.forEach(function(id, sendFunction)
      {
        const query_sql_string = 'SELECT * FROM student WHERE StudentID = ?'
        db.all(query_sql_string, id, function(err, row)
        {
          if (row.length == 0)
          {
            isExist = false
            console.log('.0.')
          }
          else
          {
            const sql_string = 'UPDATE student SET TeamLeader = ?, GuideTeacher = ? WHERE StudentID = ?'
            db.run(sql_string, studentLeader, userContent['EmployeeNumber'], id, function(err, row)
            {
              if(err) throw err;
            })
          }
          if(err) throw err
        })
        sendFunction()
      })

  })
})

module.exports = router;
