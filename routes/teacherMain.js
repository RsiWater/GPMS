var express = require('express');
const cookieParser = require('cookie-parser');
var router = express.Router();

let sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('db_GPMS.db', function(err)
{
  if(err) throw err;
})

/* GET home page. */
router.get('/', function(req, res, next) {

  console.log(req.cookies.PassKey)
  if(req.cookies.PassKey){
    //console.log(req.cookies.PassKey)

    const sql_string = 'SELECT * FROM account WHERE PassKey=?'
     db.all(sql_string, req.cookies.PassKey, function(err, row)
    {
        if(err) throw err;
        if(row[0]['Permission']==1){
          console.log('yeah')
          const select_string = 'SELECT * FROM inform WHERE Type=? OR Type=?'
          db.all(select_string,0,2, function(err, row)
          {
            if (err) throw err;
            //console.log('yeah fuck')
            res.render('teacherMain',{inform: row})
          })
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
  const sql_string = 'SELECT * FROM account WHERE PassKey = ?'
  db.all(sql_string, req.cookies.PassKey, function(err, row)
  {
    if(err) throw err;
    console.log(row)
    db.all('SELECT * FROM teacher WHERE EmployeeNumber = ?', row[0].EmployeeNumber, function(err, row)
    {
      if(err) throw err;
      res.json({name: row[0].Name})
    })
  })
})

module.exports = router;
