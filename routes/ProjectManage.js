var express = require('express');
var router = express.Router();

let sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('db_GPMS.db', function(err)
{
  if(err) throw err;
})

/* GET home page. */
router.get('/', function(req, res, next) {
  const sql_string = 'SELECT * FROM GraduationProject'
  db.all(sql_string, function(err, row)
  {
    if (err) throw err;
    res.render('projectManage', {project: row})
  })
});

router.post('/getData', function(req, res, next)
{
  const _sql_string = 'SELECT * FROM GraduationProject'
  db.all(_sql_string, function(err, row)
  {
    if(err) throw err;
    let projectNameList = []
    row.forEach(item =>
      {
        projectNameList.push(item.Name)
      })
    console.log(projectNameList)
    res.json({projectNameList: projectNameList})
  })
})

router.post('/', function(req, res, next) {

  const sql_string = 'SELECT * FROM account WHERE PassKey=?'
  db.all(sql_string, req.cookies.PassKey, function(err, row)
  {
    if(row.length==0){
      res.json({permission:3})
    }
    else{
      if(row[0]['Permission']==0){
        res.json({permission:0})
      }
      else if(row[0]['Permission']==1){
        res.json({permission:1})
      }
      else{
        res.json({permission:2})
      }
    }
  });
});

router.post('/addscore', function(req, res, next){

  const sql_string = 'SELECT * FROM GraduationProject WHERE TeamLeader=?'
  db.all(sql_string, req.body.teamLeader, function(err, row)
  {
    if(err) throw err;
    let score=parseInt(row[0]['Grade'])+parseInt(req.body.score)

    const update_string = 'UPDATE GraduationProject SET Grade=? WHERE TeamLeader=?'
    db.run(update_string,score, req.body.teamLeader, function(err, row){
      if(err) throw err;
      res.json({href: '/systemManage'})

    })
  })

});

router.post('/addstudentscore', function(req, res, next){

  const sql_string = 'SELECT * FROM GraduationProject WHERE TeamLeader=?'
  db.all(sql_string, req.body.teamLeader, function(err, row)
  {
    if(err) throw err;
    let score=parseInt(row[0]['Score'])+parseInt(req.body.score)  

    const update_string = 'UPDATE GraduationProject SET Score=? WHERE TeamLeader=?'
    db.run(update_string,score, req.body.teamLeader, function(err, row){
      if(err) throw err;
      res.json({href: '/systemManage'})

    })
  })

});
module.exports = router;
