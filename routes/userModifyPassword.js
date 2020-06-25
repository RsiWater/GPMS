var express = require('express');
var router = express.Router();

let sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('db_GPMS.db', function(err)
{
  if(err) throw err;
})

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('userModifyPassword');

  console.log(req.cookies.PassKey)
  if(req.cookies.PassKey){
    //console.log(req.cookies.PassKey)

    const sql_string = 'SELECT * FROM account WHERE PassKey=?'
     db.all(sql_string, req.cookies.PassKey, function(err, row)
    {
        if(err) throw err;
        if(row.length>0){
          console.log('yeah')
          res.render('userModifyPassword')
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
    if(err) throw err
    res.json({password: row[0].Password})
  })
})

router.post('/', function(req, res, next)
{
  const sql_string = 'UPDATE account SET Password = ? WHERE PassKey = ?'
  db.run(sql_string, req.body.password, req.cookies.PassKey, function(err, row)
  {
    if(err) throw err;
    res.json({href: '/systemManage'})
    console.log("update")
  })
})

module.exports = router;
