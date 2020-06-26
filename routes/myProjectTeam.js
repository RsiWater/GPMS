var express = require('express');
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

router.post('/', function(req, res, next)
{
  let studentList = JSON.parse(req.body.mate_list)
  let studentLeader = req.body.leader_id

  try{
    studentList.forEach(id =>
      {
        const sql_string = 'UPDATE student SET TeamLeader = ?, GuideTeacher = ? WHERE StudentID = ?'
        db.run(sql_string, studentLeader, userContent['EmployeeNumber'], id, function(err, row)
        {
          if(err) throw err;
        })
      })
      res.json({res: true})
  }catch{
    res.json({res: false})
  }
})

module.exports = router;
