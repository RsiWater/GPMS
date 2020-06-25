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

  const sql_string = 'INSERT INTO GraduationProject (Name,Password,Permission,EmployeeNumber) VALUES (?,?,?,?)'
  db.run(sql_string, req.body.AccountName,req.body.Password,req.body.Permission,req.body.EmployeeNumber, function(err, row)
  {
    if(err) throw err;
    res.json({href: '/systemManage'})
  })

});

module.exports = router;
