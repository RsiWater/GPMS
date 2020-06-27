var express = require('express');
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
        if(row[0]['Permission']==2){
          console.log('yeah')
          const select_string = 'SELECT * FROM inform WHERE Type=?'
          db.all(select_string,1, function(err, row_i)
          {
            if (err) throw err;
            db.all('SELECT * FROM student WHERE StudentID = ?', row[0].Name, function(err, row_s)
            {
              if (err) throw err;
              res.render('studentMain',{inform: row_i, teamLeader: row_s[0].TeamLeader})
            })
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
    db.all('SELECT * FROM student WHERE StudentID = ?', row[0].Name, function(err, row)
    {
      if(err) throw err;
      res.json({name: row[0].Name})
    })
  })
})

module.exports = router;
